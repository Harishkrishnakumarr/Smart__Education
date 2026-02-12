package se.pro.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.pro.entity.Chapter;
import se.pro.entity.SchoolClass;
import se.pro.entity.Subject;
import se.pro.repo.ChapterRepository;
import se.pro.repo.SchoolClassRepository;
import se.pro.repo.SubjectRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class LookupController {

    private final SchoolClassRepository schoolClassRepository;
    private final SubjectRepository subjectRepository;
    private final ChapterRepository chapterRepository;

    @GetMapping("/classes")
    public ResponseEntity<List<SchoolClass>> getClasses() {
        return ResponseEntity.ok(schoolClassRepository.findAll());
    }

    @GetMapping("/subjects/class/{classId}")
    public ResponseEntity<List<Subject>> getSubjectsByClass(@PathVariable Long classId) {
        SchoolClass schoolClass = schoolClassRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        return ResponseEntity.ok(subjectRepository.findBySchoolClass(schoolClass));
    }

    @GetMapping("/chapters/subject/{subjectId}")
    public ResponseEntity<List<Chapter>> getChaptersBySubject(@PathVariable Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        return ResponseEntity.ok(chapterRepository.findBySubject(subject));
    }
}
