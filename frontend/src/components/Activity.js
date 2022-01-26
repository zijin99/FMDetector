import React, {useEffect, useState} from "react";
import axios from "axios";
import "../header.css";


function Activity() {
    const [activities, setActivities] = useState([]);
    const [students, setStudents] = useState([]);
    const getActivities = () => {
        axios.get("/activity/").then((response) => {
            setActivities(response.data.reverse());
        })
    }


    const getStudents = () => {
        axios.get("/student/").then((response) => {
            setStudents(response.data);
        })
    }
    useEffect(() => {
        getActivities();
        getStudents();
    }, []);
  return (
    <React.Fragment>

      <div className="container" id="daterangepicker-container">
        <div className="row">
          <div className="col-lg-12">
          <h4 className="m-t-3">Student Activities</h4>
            
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th className="small text-muted text-uppercase"><strong>Name</strong>
                        </th>
                        <th className="small text-muted text-uppercase"><strong>Start Time</strong>
                        </th>
                        <th className="small text-muted text-uppercase"><strong>End Time</strong>
                        </th>
                        <th className="small text-muted text-uppercase"><strong>Violated</strong>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {activities.map((activity, key) => {
                    const student = students.find(s => s.id === activity.studentId);
                    return student && <tr className="v-a-m">
                        <td>
                            <span className="text-gray-darker">{student.name}</span>
                        </td>
                        <td>
                            <span className="text-gray">{activity.startDate}</span>
                        </td>
                        <td>
                            <span className="text-gray">{activity.endDate}</span>
                        </td>
                        <td className="text-right v-a-m">
                            {activity.isViolated ? <span className="badge badge-outline badge-danger text-uppercase"><span>No Mask</span></span> : <span className="badge badge-outline badge-success text-uppercase"><span>Clear</span></span>}
                        </td>

                    </tr>
                })}



                </tbody>
            </table>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}

export default Activity;
