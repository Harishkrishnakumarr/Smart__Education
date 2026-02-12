package se.pro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import se.pro.entity.SchoolClass;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
}
