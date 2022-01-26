package edu.cmu.sv.service;

import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.AmazonRekognitionClientBuilder;
import com.amazonaws.services.rekognition.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.cmu.sv.model.Student;
import edu.cmu.sv.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.AmazonRekognitionClientBuilder;
import com.amazonaws.services.rekognition.model.ImageQuality;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.CreateCollectionResponse;
import software.amazon.awssdk.services.rekognition.model.QualityFilter;
import software.amazon.awssdk.services.rekognition.model.RekognitionException;
import software.amazon.awssdk.services.rekognition.model.UnindexedFace;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.CreateCollectionResponse;
import software.amazon.awssdk.services.rekognition.model.RekognitionException;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IDEA
 * author:yanghaolin
 * Date:6/29/21
 * Time:2:04 PM
 * Description：
 */

@Component
public class RekognitionService {

    public static final String collectionId = "CMUSV";
    public static final String real_face_bucket = "real-face-bucket";
    public static final String test_face_bucket = "test-face-bucket";

    @Autowired
    private StudentRepository studentRepository;


    public String insertFace(String photoName) {

        AmazonRekognition rekognitionClient = AmazonRekognitionClientBuilder.defaultClient();

        Image image = new Image()
                .withS3Object(new S3Object()
                        .withBucket(real_face_bucket)
                        .withName(photoName));

        IndexFacesRequest indexFacesRequest = new IndexFacesRequest()
                .withImage(image)
                .withCollectionId(collectionId)
                .withExternalImageId(photoName)
                .withDetectionAttributes("DEFAULT");

        IndexFacesResult indexFacesResult = rekognitionClient.indexFaces(indexFacesRequest);

        System.out.println("Results for " + photoName);
        System.out.println("Faces indexed:");
        List<FaceRecord> faceRecords = indexFacesResult.getFaceRecords();
        for (FaceRecord faceRecord : faceRecords) {
            System.out.println("  Face ID: " + faceRecord.getFace().getFaceId());
            System.out.println("  Location:" + faceRecord.getFaceDetail().getBoundingBox().toString());

            //student.setFaceId(faceRecord.getFace().getFaceId());

            return faceRecord.getFace().getFaceId();
        }


        return "";
    }

    public static List<Face> getAllFaces(String collectionId) {
        AmazonRekognition rekognitionClient = AmazonRekognitionClientBuilder.defaultClient();

        ObjectMapper objectMapper = new ObjectMapper();

        ListFacesResult listFacesResult = null;
        System.out.println("Faces in collection " + collectionId);

        String paginationToken = null;
        do {
            if (listFacesResult != null) {
                paginationToken = listFacesResult.getNextToken();
            }

            ListFacesRequest listFacesRequest = new ListFacesRequest()
                    .withCollectionId(collectionId)
                    .withMaxResults(1)
                    .withNextToken(paginationToken);

            listFacesResult = rekognitionClient.listFaces(listFacesRequest);
            List<Face> faces = listFacesResult.getFaces();
            for (Face face : faces) {
                System.out.println(face.getFaceId());
            }
            return faces;
        } while (listFacesResult != null && listFacesResult.getNextToken() !=
                null);
    }

    public  List<Student> searchFace(String photoName) {

        AmazonRekognition rekClient = AmazonRekognitionClientBuilder.defaultClient();

        Image image=new Image()
                .withS3Object(new S3Object()
                        .withBucket(test_face_bucket)
                        .withName(photoName));

        SearchFacesByImageRequest searchFacesByImageRequest = new SearchFacesByImageRequest()
                .withCollectionId(collectionId)
                .withImage(image)
                .withFaceMatchThreshold(70F)
                .withMaxFaces(2);

        SearchFacesByImageResult searchFacesByImageResult =
                rekClient.searchFacesByImage(searchFacesByImageRequest);

        System.out.println("Faces matching largest face in image from" + photoName);
        List < FaceMatch > faceImageMatches = searchFacesByImageResult.getFaceMatches();

        List<Student> res = new ArrayList<>();
        for (FaceMatch face: faceImageMatches) {

            System.out.println(face.getFace().getFaceId());
            Student student = studentRepository.findByFaceId(face.getFace().getFaceId());
            res.add(student);
        }

        return res;
    }

    public static void main(String[] args) throws Exception {

        AmazonRekognition rekognitionClient = AmazonRekognitionClientBuilder.defaultClient();

    }

}
