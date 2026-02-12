package se.pro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import se.pro.entity.AiTest;

public interface AiTestRepository extends JpaRepository<AiTest, Long> {
}
