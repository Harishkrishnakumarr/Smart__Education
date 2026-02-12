package se.pro.dto;

import lombok.Data;

@Data
public class SubmitAnswersRequestDto {

    private Long studentId;
    private String answersText;
}
