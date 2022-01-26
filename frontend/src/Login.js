import React, {useState} from "react";

const Login = ({setIsLogin}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const doLogin = () => {
        console.log(email, password);
        setIsLogin(true);
    }
    return <div className="content">
        <div className="container-fluid">

            <div className="row" style={{paddingTop: "100px"}}>
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default b-a-0 shadow-box">
                        <div className="panel-heading text-center">
                            <h3>CMU-SV Campus Mask Detector Admin</h3>
                        </div>
                        <div className="panel-body">
                            <form className="m-t-3">
                                <div className="form-group">
                                    <input className="form-control" placeholder="Enter a Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Your Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <a href="#" role="button"
                                   className="btn btn-block m-b-2 btn-primary" onClick={() => doLogin()}>Login</a>
                            </form>
                        </div>
                        <div className="panel-footer b-a-0 b-r-a-0">
                            <a href="../pages/forgot-password.html">Register</a>
                        </div>
                    </div>
                    <p className="text-gray-light text-center"><strong>©CMU SV </strong></p>
                </div>
            </div>
        </div>
    </div>
}

export default Login;