package edu.cmu.sv.repository;

import edu.cmu.sv.model.Department;
import edu.cmu.sv.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends MongoRepository<Department,String>{}
