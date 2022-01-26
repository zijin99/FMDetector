package edu.cmu.sv.controller;

import edu.cmu.sv.model.Admin;
import edu.cmu.sv.repository.AdminRepository;
import edu.cmu.sv.service.RekognitionService;
import edu.cmu.sv.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private S3Service s3Service;
    @Autowired
    private RekognitionService rekognitionService;

    @GetMapping("/")
    public List<Admin> getAll() {
        return adminRepository.findAll();
    }
    @GetMapping("/{id}")
    public Admin getOne(@PathVariable String id) {
        return adminRepository.findById(id).orElse(null);
    }
    @PostMapping("/")
    public Admin insert(@RequestBody Admin user) {
        return adminRepository.save(user);
    }
    @PutMapping("/")
    public Admin modify(@RequestBody Admin newAdmin) {
        Admin oldUser = adminRepository.findById(newAdmin.getId()).orElse(null);
        oldUser.setName(newAdmin.getName());
        oldUser.setEmail(newAdmin.getEmail());
        oldUser.setPassword(newAdmin.getPassword());
        oldUser.setLevel(newAdmin.getLevel());

        adminRepository.save(oldUser);
        return oldUser;
    }
    @DeleteMapping("/{id}")
    public String DeleteUser(@PathVariable String id) {
        adminRepository.deleteById(id);
        return id;
    }

    @RequestMapping(value = "/adminUpload", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public String singleFileUpload(@RequestParam(value = "file",required = false) MultipartFile file,
                                         @RequestParam(value = "andrewId") String andrewId) {
        String faceId = "";
        try {

            byte[] bytes = file.getBytes();
            // Put the file into the bucket
            s3Service.putObject(bytes, "real-face-bucket", andrewId, file);
            faceId = rekognitionService.insertFace(andrewId);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return faceId;
    }
}