package se.pro.service;

import se.pro.dto.StudentPerformanceSummaryDto;

public interface AnalyticsService {

    StudentPerformanceSummaryDto getStudentSummary(Long studentId);
}
