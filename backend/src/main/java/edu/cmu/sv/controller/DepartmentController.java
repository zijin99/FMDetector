package edu.cmu.sv.controller;

import edu.cmu.sv.model.Department;
import edu.cmu.sv.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/department")
@CrossOrigin
public class DepartmentController {
    @Autowired
    private DepartmentRepository departmentRepository;

    @GetMapping("/")
    public List<Department> getAll() {
        return departmentRepository.findAll();
    }
    @GetMapping("/{id}")
    public Department getOne(@PathVariable String id) {
        return departmentRepository.findById(id).orElse(null);
    }
    @PostMapping("/")
    public Department insert(@RequestBody Department user) {

        return departmentRepository.save(user);

    }
    @PutMapping("/")
    public Department modify(@RequestBody Department newDepartment) {
        Department oldUser = departmentRepository.findById(newDepartment.getId()).orElse(null);
        oldUser.setName(newDepartment.getName());
        oldUser.setLocation(newDepartment.getLocation());

        departmentRepository.save(oldUser);
        return oldUser;
    }
    @DeleteMapping("/{id}")
    public String DeleteUser(@PathVariable String id) {
        departmentRepository.deleteById(id);
        return id;
    }
}