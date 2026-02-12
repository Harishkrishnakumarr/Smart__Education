package se.pro.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.pro.dto.AiTestGenerationRequestDto;
import se.pro.dto.SubmitAnswersRequestDto;
import se.pro.entity.AiTest;
import se.pro.entity.StudentAnswerSheet;
import se.pro.service.AiTestService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AiTestController {

    private final AiTestService aiTestService;

    @PostMapping("/ai-test/generate")
    public ResponseEntity<AiTest> generateTest(@RequestBody AiTestGenerationRequestDto dto) {
        return ResponseEntity.ok(aiTestService.generateAiTest(dto));
    }

    @GetMapping("/ai-tests/{testId}")
    public AiTest getAiTest(@PathVariable Long testId) {
        return aiTestService.getAiTest(testId);
    }


    @GetMapping("/ai-test")
    public ResponseEntity<List<AiTest>> getAllAiTests() {
        return ResponseEntity.ok(aiTestService.getAllAiTests());
    }

    @GetMapping("/tests/student/{studentId}")
    public ResponseEntity<List<AiTest>> getTestsForStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(aiTestService.getTestsForStudent(studentId));
    }

    @PostMapping("/tests/{testId}/submit")
    public ResponseEntity<StudentAnswerSheet> submitAnswers(@PathVariable Long testId,
                                                            @RequestBody SubmitAnswersRequestDto dto) {
        return ResponseEntity.ok(aiTestService.submitAnswers(testId, dto));
    }
}
