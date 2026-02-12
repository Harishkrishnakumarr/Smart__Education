package se.pro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import se.pro.entity.Student;
import se.pro.entity.StudentAnswerSheet;

import java.util.List;

public interface StudentAnswerSheetRepository extends JpaRepository<StudentAnswerSheet, Long> {

    List<StudentAnswerSheet> findByStudent(Student student);
}
