package se.pro.service.impl;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

import se.pro.dto.StudentPerformanceSummaryDto;
import se.pro.entity.AiTest;
import se.pro.entity.Student;
import se.pro.entity.StudentAnswerSheet;
import se.pro.repo.AiTestRepository;
import se.pro.repo.StudentAnswerSheetRepository;
import se.pro.repo.StudentRepository;
import se.pro.service.AnalyticsService;

import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final StudentRepository studentRepository;
    private final StudentAnswerSheetRepository answerSheetRepository;
    private final AiTestRepository aiTestRepository;
    private final Client geminiClient;

    @Override
    public StudentPerformanceSummaryDto getStudentSummary(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<StudentAnswerSheet> sheets = answerSheetRepository.findByStudent(student);

        Map<String, Double> chapterToAvgScore = sheets.stream()
                .collect(Collectors.groupingBy(
                        sheet -> {
                            AiTest test = sheet.getAiTest();
                            if (test.getChapter() != null) {
                                return test.getChapter().getName();
                            }
                            if (test.getSubject() != null) {
                                return test.getSubject().getName();
                            }
                            return "General";
                        },
                        Collectors.averagingDouble(s -> s.getScore() != null ? s.getScore() : 0.0)
                ));

        DoubleSummaryStatistics stats = sheets.stream()
                .map(StudentAnswerSheet::getScore)
                .filter(s -> s != null)
                .mapToDouble(Double::doubleValue)
                .summaryStatistics();

        double avgScore = stats.getCount() == 0 ? 0.0 : stats.getAverage();

        String prompt = String.format(
                "You are an education performance analyst.\n" +
                "A student has multiple AI-graded tests with chapter-wise average scores:\n%s\n\n" +
                "Overall average score: %.2f\n\n" +
                "1) Summarize the student's overall performance in simple English.\n" +
                "2) List weak chapters and why they are weak.\n" +
                "3) Suggest next actions (study plan, extra practice, video types).\n\n" +
                "Keep it within 6-8 bullet points.",
                chapterToAvgScore.toString(),
                avgScore
        );
        GenerateContentResponse summaryResp =
                geminiClient.models.generateContent(
                        "gemini-2.5-flash",
                        prompt,
                        null
                );

        String aiSummary = summaryResp.text();

        String nextActionsPrompt = String.format(
                "Based on this performance summary:\n%s\n\n" +
                "Give a short, step-by-step 1-month improvement plan for the student.",
                aiSummary
        );

        GenerateContentResponse planResp =
                geminiClient.models.generateContent(
                        "gemini-2.5-flash",
                 nextActionsPrompt,
                        null
                );

        String aiNextActions = planResp.text();

        return StudentPerformanceSummaryDto.builder()
                .studentId(student.getId())
                .studentName(student.getName())
                .chapterScoreMap(chapterToAvgScore)
                .aiSummary(aiSummary)
                .aiNextActions(aiNextActions)
                .build();
    }
}
