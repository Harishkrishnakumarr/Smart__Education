package se.pro.dto;

import lombok.Data;

@Data
public class AiTestGenerationRequestDto {

    private Long classId;
    private Long subjectId;
    private Long chapterId;

    private String difficulty = "MEDIUM";
    private int numberOfQuestions = 10;

    private Long studentId;
}
