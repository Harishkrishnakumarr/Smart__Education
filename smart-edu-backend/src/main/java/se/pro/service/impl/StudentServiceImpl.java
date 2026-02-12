package se.pro.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.pro.dto.StudentRequestDto;
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
    @Override
    public Student createStudent(StudentRequestDto dto) {

        SchoolClass schoolClass = schoolClassRepository.findById(dto.getSchoolClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));

        Student s = Student.builder()
                .name(dto.getName())
                .schoolClass(schoolClass)
                .section(dto.getSection())
                .parentEmail(dto.getParentEmail())
                .build();

        return studentRepository.save(s);
    }


    @Override
    public Student getStudent(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student updateStudent(Long id, StudentRequestDto dto) {

        Student s = getStudent(id);

        SchoolClass schoolClass = schoolClassRepository.findById(dto.getSchoolClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));

        s.setName(dto.getName());
        s.setSchoolClass(schoolClass);
        s.setSection(dto.getSection());
        s.setParentEmail(dto.getParentEmail());

        return studentRepository.save(s);
    }


    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
