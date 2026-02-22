package se.pro.service;

import se.pro.dto.StudentRequestDto;
import se.pro.dto.StudentResponseDto;

import java.util.List;

public interface StudentService {

    StudentResponseDto createStudent(StudentRequestDto dto);

    StudentResponseDto getStudent(Long id);

    List<StudentResponseDto> getAllStudents();

    StudentResponseDto updateStudent(Long id, StudentRequestDto dto);

    void deleteStudent(Long id);
}