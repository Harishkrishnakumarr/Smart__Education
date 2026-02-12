package se.pro.service;

import se.pro.dto.StudentRequestDto;
import se.pro.entity.Student;

import java.util.List;

public interface StudentService {

    Student createStudent(StudentRequestDto dto);
    Student getStudent(Long id);
    List<Student> getAllStudents();
    Student updateStudent(Long id, StudentRequestDto dto);
    void deleteStudent(Long id);
    
}
