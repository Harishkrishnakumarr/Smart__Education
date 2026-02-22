package se.pro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponseDto {

    private Long id;
    private String name;
    private String section;
    private String parentEmail;

    // Instead of returning full SchoolClass entity
    private Long schoolClassId;
    
}