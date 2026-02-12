package se.pro.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.pro.dto.StudentPerformanceSummaryDto;
import se.pro.service.AnalyticsService;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<StudentPerformanceSummaryDto> getStudentSummary(@PathVariable Long studentId) {
        return ResponseEntity.ok(analyticsService.getStudentSummary(studentId));
    }
}
