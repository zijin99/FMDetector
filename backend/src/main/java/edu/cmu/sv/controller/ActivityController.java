package edu.cmu.sv.controller;

import com.sendgrid.*;
import edu.cmu.sv.model.Activity;
import edu.cmu.sv.model.Student;
import edu.cmu.sv.repository.ActivityRepository;
import edu.cmu.sv.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sendgrid.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/activity")
@CrossOrigin
public class ActivityController {
    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/")
    public List<Activity> getAll() {
        return activityRepository.findAll();
    }
    @GetMapping("/{id}")
    public Activity getOne(@PathVariable String id) {
        return activityRepository.findById(id).orElse(null);
    }
    @PostMapping("/")
    public Activity insert(@RequestBody Activity activity) throws IOException {
        if(activity.getIsViolated()){
            System.out.println("Violated!!");
            Optional<Student> student = studentRepository.findById(activity.getStudentId());
            System.out.println("Student: "+student.get().getName());
            Email from = new Email("ikwhan.chang@west.cmu.edu");
            String subject = "[ALERT] "+student.get().getName()+" VIOLATE MASK RULE @ Building 23";
            Email to = new Email("ikwhan.chang@west.cmu.edu");
            Content content = new Content("text/plain", student.get().getName()+" violated mask required.\n Location: Building 23. \nTime: "+activity.getStartDate());
            Mail mail = new Mail(from, subject, to, content);

            SendGrid sg = new SendGrid("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");
            Request request = new Request();
            try {
                request.setMethod(Method.POST);
                request.setEndpoint("mail/send");
                request.setBody(mail.build());
                Response response = sg.api(request);
                System.out.println(response.getStatusCode());
                System.out.println(response.getBody());
                System.out.println(response.getHeaders());
            } catch (IOException ex) {
                throw ex;
            }
        }
        return activityRepository.save(activity);
    }
    @PutMapping("/")
    public Activity modify(@RequestBody Activity newActivity) {
        Activity oldUser = activityRepository.findById(newActivity.getId()).orElse(null);
        oldUser.setIsViolated(newActivity.getIsViolated());
        oldUser.setDetail(newActivity.getDetail());

        activityRepository.save(oldUser);
        return oldUser;
    }
    @DeleteMapping("/{id}")
    public String DeleteUser(@PathVariable String id) {
        activityRepository.deleteById(id);
        return id;
    }
}