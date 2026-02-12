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
public class StudentAnswerSheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AiTest aiTest;

    @ManyToOne
    private Student student;

    @Lob
    private String answersText;

    private Double score;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String aiFeedback;

    private LocalDateTime submittedAt;
}
