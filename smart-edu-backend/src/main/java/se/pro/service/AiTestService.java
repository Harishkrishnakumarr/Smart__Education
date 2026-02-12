package se.pro.service;

import se.pro.dto.AiTestGenerationRequestDto;
import se.pro.dto.SubmitAnswersRequestDto;
import se.pro.entity.AiTest;
import se.pro.entity.StudentAnswerSheet;

import java.util.List;

public interface AiTestService {

    AiTest generateAiTest(AiTestGenerationRequestDto dto);

    AiTest getAiTest(Long id);

    List<AiTest> getAllAiTests();

    List<AiTest> getTestsForStudent(Long studentId);

    StudentAnswerSheet submitAnswers(Long testId, SubmitAnswersRequestDto dto);
}
