package se.pro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import se.pro.entity.AiTestAssignment;
import se.pro.entity.SchoolClass;
import se.pro.entity.Student;

import java.util.List;

public interface AiTestAssignmentRepository extends JpaRepository<AiTestAssignment, Long> {

    List<AiTestAssignment> findByStudent(Student student);
    List<AiTestAssignment> findBySchoolClass(SchoolClass schoolClass);
}
