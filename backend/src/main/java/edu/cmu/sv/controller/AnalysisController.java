package edu.cmu.sv.controller;

import edu.cmu.sv.model.Student;
import edu.cmu.sv.service.RekognitionService;
import edu.cmu.sv.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.CreateCollectionResponse;
import software.amazon.awssdk.services.rekognition.model.CreateCollectionRequest;
import software.amazon.awssdk.services.rekognition.model.RekognitionException;

import java.io.IOException;
import java.util.Date;
import java.util.List;

/**
 * Created with IDEA
 * author:yanghaolin
 * Date:6/29/21
 * Time:2:01 PM
 * Description：
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AnalysisController {

    @Autowired
    S3Service s3Client;

    @Autowired
    RekognitionService rekognitionService;

    //first upload to a bucket and use the uploaded photo to anlysis and return result
    @RequestMapping(value = "/analysis", method = RequestMethod.POST)
    @ResponseBody
    public List<Student> searchStudentFace(@RequestParam(value = "file", required = false) MultipartFile file) {

        try {

            byte[] bytes = file.getBytes();
            // Put the file into the bucket
            Date date = new Date();
            s3Client.putObject(bytes, "test-face-bucket", date.toString(), file);

            List<Student> res = rekognitionService.searchFace(date.toString());

            return res;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
