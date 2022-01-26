import React, {useEffect, useState} from "react";
import axios from "axios";
import "../header.css";
import {useHistory} from "react-router-dom";

const Student = () => {
    const [students, setStudents]  = useState([]);
    const [departments, setDepartments] = useState([]);
    const history = useHistory();

    const handleAddStudent = () => {
        history.push(`/addStudent`);
    }
    let no = 0;
    const getStudentList = () => {
        axios.get("/student/").then(response => {
            setStudents(response.data);
            no = response.data.length;
        })
    }

    const getDepartments = () => {
        axios.get("/department/").then(response => {
            setDepartments(response.data);
        })
    }

    useEffect(() => {
        getStudentList();
        getDepartments();
    }, []);

    return (
        <React.Fragment>
            <br/><br/>
            <div className="panel panel-default shadow-box b-a-0">
                <div className="panel-body">
                    <div className="panel-title"><h4 className="m-t-3">Student List</h4></div>
                    <div className="row">
                        <div className="col-sm-12">

                            <table className="table table-responsive">
                                <thead>
                                <tr>
                                    <th className="small text-muted text-uppercase"><strong>Name</strong>
                                    </th>
                                    <th className="small text-muted text-uppercase"><strong>Name</strong>
                                    </th>
                                    <th className="small text-muted text-uppercase"><strong>Andrew ID</strong>
                                    </th>
                                    <th className="small text-muted text-uppercase"><strong>Department</strong>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {students.map((student, key) => {
                                    const dept = departments.find(d => d.id === student.deptId);
                                    return <tr className="v-a-m" key={key}>
                                        <td>
                                            <span className="text-gray-darker">{student.name}</span>
                                        </td>
                                        <td>
                                            <span className="text-gray-darker">{student.email}</span>
                                        </td>
                                        <td>
                                            <span className="text-gray">{student.andrewId}</span>
                                        </td>
                                        <td>
                                            <span className="text-gray-darker">{dept ? dept.name : ""}</span>
                                        </td>

                                    </tr>
                                })}


                                </tbody>
                            </table>
                            <button type="button" className="btn btn-primary pull-right"
                                    onClick={() => handleAddStudent()}>Add Student
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </React.Fragment>
    );
}

export default Student;
