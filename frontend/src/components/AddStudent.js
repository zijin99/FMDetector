import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'

import axios from "axios";
import "../header.css";

const AddStudent = ({goBack}) => {
    const [file, setFile] = useState();

    const [departments, setDepartments] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [andrewId, setAndrewId] = useState("");
    const [graduateYear, setGraduateYear] = useState(2021);
    const [department, setDepartment] = useState("60dbae8b04ce81aba6aaa20c");

    const onFileChange = event => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
    };

    const history = useHistory();

    const handleBack = () => {
        history.push(`/student/`);
    };

    const getDepartments = () => {
        axios.get("/department/").then(response => {
            setDepartments(response.data);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }


        axios.post(`/admin/adminUpload/?andrewId=${andrewId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const faceId = response.data;
            const student = {
                name,
                email,
                andrewId,
                deptId: department,
                graduateYear,
                faceId,
            };


            axios.post("/student/", student).then(() => {
                //history.push(`/student/list`);
            })
        })

    }

    const handleChange = (e) => {
        setDepartment(e.target.value);
    }

    useEffect(() => {
        getDepartments();
    }, []);


    return (
        <React.Fragment>
            <br/>
            <br/>
            <div className="panel panel-default shadow-box b-a-0">
                <div className="panel-body">
                    <div className="panel-title"><h4 className="m-t-3">Add Student</h4></div>
                    <div className="row">
                        <div className="col-sm-12">

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Name</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                           placeholder="Student Name" onChange={(e) => setName(e.target.value)} value={name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Andrew ID</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                           placeholder="Andrew ID" onChange={e => setAndrewId(e.target.value)} value={andrewId}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail3" className="col-sm-3 control-label">Department</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" onChange={e => handleChange(e)}>
                                            {departments.map((dept, key) => <option value={dept.id}
                                                                                    key={key}>{dept.name} - {dept.location}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Graduate Year</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                           placeholder="ex: 2021" onChange={e => setGraduateYear(e.target.value)} value={graduateYear}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">Photo</label>
                                    <input type="file" id="file" onChange={e => onFileChange(e)}/>
                                    <p className="help-block">Please upload student's photo</p>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                {" "}
                                <button type="button" className="btn btn-danger" onClick={() => handleBack()}>Back
                                </button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>

        </React.Fragment>
    );
}

export default AddStudent;
