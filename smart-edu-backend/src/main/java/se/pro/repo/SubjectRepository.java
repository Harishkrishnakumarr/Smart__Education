package se.pro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import se.pro.entity.Subject;
import se.pro.entity.SchoolClass;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    List<Subject> findBySchoolClass(SchoolClass schoolClass);
}
