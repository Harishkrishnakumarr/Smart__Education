package se.pro.service.impl;

import lombok.RequiredArgsConstructor;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

import org.springframework.stereotype.Service;
import se.pro.dto.AiTestGenerationRequestDto;
import se.pro.dto.SubmitAnswersRequestDto;
import se.pro.entity.*;
import se.pro.repo.*;
import se.pro.service.AiTestService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AiTestServiceImpl implements AiTestService {

    private final SchoolClassRepository schoolClassRepository;
    private final SubjectRepository subjectRepository;
    private final ChapterRepository chapterRepository;
    private final AiTestRepository aiTestRepository;
    private final AiTestAssignmentRepository assignmentRepository;
    private final StudentAnswerSheetRepository answerSheetRepository;
    private final StudentRepository studentRepository;
    private final Client geminiClient;

    @Override
    public AiTest generateAiTest(AiTestGenerationRequestDto dto) {

        SchoolClass schoolClass = schoolClassRepository.findById(dto.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));

        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        Chapter chapter = chapterRepository.findById(dto.getChapterId())
                .orElseThrow(() -> new RuntimeException("Chapter not found"));

        String promptText = String.format(
                "You are an expert school exam paper setter.\n" +
                "Create %d questions for:\n" +
                "Class: %s\n" +
                "Subject: %s\n" +
                "Chapter: %s\n" +
                "Difficulty: %s\n\n" +
                "Format the questions in a clear numbered list.\n" +
                "Include options (A/B/C/D) and also mention the CORRECT ANSWER after each question.",
                dto.getNumberOfQuestions(),
                schoolClass.getClassname(),
                subject.getName(),
                chapter.getName(),
                dto.getDifficulty()
        );
        GenerateContentResponse genResponse =
                geminiClient.models.generateContent(
                        "gemini-2.5-flash",
                        promptText,
                        null
                );

        String aiText = genResponse.text();

        AiTest test = AiTest.builder()
                .schoolClass(schoolClass)
                .subject(subject)
                .chapter(chapter)
                .difficulty(dto.getDifficulty())
                .numberOfQuestions(dto.getNumberOfQuestions())
                .questionsText(aiText)
                .createdBy("SYSTEM_AI")
                .createdAt(LocalDateTime.now())
                .build();

        AiTest saved = aiTestRepository.save(test);

        Student student = null;

        if (dto.getStudentId() != null) {
            student = studentRepository.findById(dto.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));
        }

        AiTestAssignment assignment = AiTestAssignment.builder()
                .aiTest(saved)
                .schoolClass(saved.getSchoolClass())
                .student(student)
                .assignedAt(LocalDateTime.now())
                .status("NOT_STARTED")
                .build();

        assignmentRepository.save(assignment);

        return saved;
    }

    @Override
    public AiTest getAiTest(Long id) {
        return aiTestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AI Test not found"));
    }

    @Override
    public List<AiTest> getAllAiTests() {
        return aiTestRepository.findAll();
    }

    @Override
    public List<AiTest> getTestsForStudent(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        SchoolClass schoolClass = student.getSchoolClass(); 

        return assignmentRepository.findBySchoolClass(schoolClass)
                .stream()
                .map(AiTestAssignment::getAiTest)
                .toList();
    }


    @Override
    public StudentAnswerSheet submitAnswers(Long testId, SubmitAnswersRequestDto dto) {
        AiTest test = getAiTest(testId);
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        String scorePrompt = String.format(
                "You are an exam evaluator.\n" +
                "Below is the question paper and a student's answers.\n" +
                "1) Give a score in percentage (0-100) based on correctness.\n" +
                "2) Briefly list 2-3 weak areas and 2-3 suggestions.\n\n" +
                "QUESTION PAPER:\n%s\n\nSTUDENT ANSWERS:\n%s",
                test.getQuestionsText(), dto.getAnswersText()
        );

        GenerateContentResponse evalResponse =
                geminiClient.models.generateContent(
                        "gemini-2.5-flash",
                        scorePrompt,
                        null
                );

        String aiEval = evalResponse.text();

      

        double score = 0.0;
        try {
            String numberOnly = aiEval.replaceAll("[^0-9.]", " ");
            String[] parts = numberOnly.trim().split("\s+");
            if (parts.length > 0) {
                score = Double.parseDouble(parts[0]);
            }
        } catch (Exception ignored) {}

        StudentAnswerSheet sheet = StudentAnswerSheet.builder()
                .aiTest(test)
                .student(student)
                .answersText(dto.getAnswersText())
                .score(score)
                .aiFeedback(aiEval)
                .submittedAt(LocalDateTime.now())
                .build();

        return answerSheetRepository.save(sheet);
    }
}
