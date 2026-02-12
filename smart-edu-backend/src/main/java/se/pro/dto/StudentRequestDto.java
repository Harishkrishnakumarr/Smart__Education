package se.pro.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudentRequestDto {

    @NotBlank
    private String name;

    @NotBlank
    private Long schoolClassId;


    private String section;

    @Email
    private String parentEmail;
}
