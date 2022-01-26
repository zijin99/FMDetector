package edu.cmu.sv.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    @Id
    private String id;
    private String studentId;
    private String startDate;
    private String endDate;
    private Boolean isViolated;
    private String detail;

}
