package se.pro.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class StudentPerformanceSummaryDto {

    private Long studentId;
    private String studentName;

    private Map<String, Double> chapterScoreMap;

    private String aiSummary;
    private String aiNextActions;
}
