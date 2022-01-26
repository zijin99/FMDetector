package edu.cmu.sv.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import edu.cmu.sv.model.Student;
import edu.cmu.sv.repository.StudentRepository;
import edu.cmu.sv.service.RekognitionService;
import edu.cmu.sv.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    RekognitionService rekognitionService;

    @Autowired
    S3Service s3Client;


    @GetMapping("/")
    public List<Student> getAll() {
        return studentRepository.findAll();
    }
    @GetMapping("/{id}")
    public Student getOne(@PathVariable String id) {
        return studentRepository.findById(id).orElse(null);
    }
    @PostMapping("/")
    public Student insert(@RequestBody Student student, @RequestParam(value = "file", required = false) MultipartFile file)  {


        return studentRepository.save(student);
    }
    @PutMapping("/")
    public Student modify(@RequestBody Student newStudent) {
        Student oldUser = studentRepository.findById(newStudent.getId()).orElse(null);
        oldUser.setName(newStudent.getName());
        oldUser.setEmail(newStudent.getEmail());

        studentRepository.save(oldUser);
        return oldUser;
    }
    @DeleteMapping("/{id}")
    public String DeleteUser(@PathVariable String id) {
        studentRepository.deleteById(id);
        return id;
    }

}