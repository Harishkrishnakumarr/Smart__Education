package se.pro.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import se.pro.dto.StudentRequestDto;
import se.pro.dto.StudentResponseDto;
import se.pro.entity.Student;
import se.pro.entity.SchoolClass;
import se.pro.repo.SchoolClassRepository;
import se.pro.repo.StudentRepository;
import se.pro.service.StudentService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final SchoolClassRepository schoolClassRepository;

    @PersistenceContext
    private EntityManager entityManager;

    // ---------------- CREATE ----------------

    @Override
    public StudentResponseDto createStudent(StudentRequestDto dto) {

        SchoolClass schoolClass = entityManager
                .getReference(SchoolClass.class, dto.getSchoolClassId());

        Student student = Student.builder()
                .name(dto.getName())
                .section(dto.getSection())
                .parentEmail(dto.getParentEmail())
                .schoolClass(schoolClass)
                .build();

        Student saved = studentRepository.save(student);

        return mapToDto(saved);   // ✅ method exists below
    }

    // ---------------- GET ONE ----------------

    @Override
    public StudentResponseDto getStudent(Long id) {

        Student s = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return mapToDto(s);
    }

    // ---------------- GET ALL ----------------

    @Override
    public List<StudentResponseDto> getAllStudents() {

        return studentRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // ---------------- UPDATE ----------------

    @Override
    public StudentResponseDto updateStudent(Long id, StudentRequestDto dto) {

        Student s = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        SchoolClass schoolClass = entityManager
                .getReference(SchoolClass.class, dto.getSchoolClassId());

        s.setName(dto.getName());
        s.setSchoolClass(schoolClass);
        s.setSection(dto.getSection());
        s.setParentEmail(dto.getParentEmail());

        Student updated = studentRepository.save(s);

        return mapToDto(updated);
    }

    // ---------------- DELETE ----------------

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // ================== MAPPING METHOD ==================

    private StudentResponseDto mapToDto(Student s) {

        return StudentResponseDto.builder()
                .id(s.getId())
                .name(s.getName())
                .section(s.getSection())
                .parentEmail(s.getParentEmail())
                .schoolClassId(s.getSchoolClass().getId())
                .build();
    }
}
