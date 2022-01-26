package edu.cmu.sv.controller;

/**
 * Created with IDEA
 * author:yanghaolin
 * Date:6/15/21
 * Time:11:22 PM
 * Description：
 */
import edu.cmu.sv.repository.StudentRepository;
import edu.cmu.sv.service.S3Service;
import edu.cmu.sv.util.SendMessages;
import edu.cmu.sv.util.WriteExcel;
import edu.cmu.sv.util.AnalyzePhotos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Controller
public class PhotoController {

    @Autowired
    S3Service s3Client;

    @Autowired
    AnalyzePhotos photos;


    @Autowired
    SendMessages sendMessage;


    // Upload an image to send to an S3 bucket
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView singleFileUpload(@RequestParam(value = "file",required = false) MultipartFile file,
                                         @RequestParam(value = "studentName") String studentName) {

        try {

            byte[] bytes = file.getBytes();
            // Put the file into the bucket
            s3Client.putObject(bytes, "real-face-bucket", studentName, file);



        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ModelAndView(new RedirectView("photo"));
    }
}
