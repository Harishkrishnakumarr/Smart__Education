package se.pro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import se.pro.entity.Chapter;
import se.pro.entity.Subject;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    List<Chapter> findBySubject(Subject subject);
}
