package se.pro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private SchoolClass schoolClass;

    @ManyToOne
    private Subject subject;

    @ManyToOne
    private Chapter chapter;

    private String difficulty;
    private int numberOfQuestions;

    @Lob
    @Column(name = "questions_text", columnDefinition = "LONGTEXT")
    private String questionsText;

    private String createdBy;
    private LocalDateTime createdAt;
}
