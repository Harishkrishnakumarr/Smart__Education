package se.pro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import se.pro.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
