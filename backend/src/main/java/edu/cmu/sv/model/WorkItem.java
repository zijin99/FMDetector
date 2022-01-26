package edu.cmu.sv.model;

/**
 * Created with IDEA
 * author:yanghaolin
 * Date:6/15/21
 * Time:11:23 PM
 * Description：
 */
public class WorkItem {

    private String key;
    private String name;
    private String confidence ;

    public void setKey (String key) {
        this.key = key;
    }

    public String getKey() {
        return this.key;
    }

    public void setName (String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setConfidence (String confidence) {
        this.confidence = confidence;
    }

    public String getConfidence() {
        return this.confidence;
    }
}
