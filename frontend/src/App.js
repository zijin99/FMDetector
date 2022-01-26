import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Header from "./Header";
import "./App.css";
import "./vendor/css/lib.min.css";
import Login from "./Login";
import Student from "./components/Student";
import Activity from "./components/Activity";
import AddStudent from "./components/AddStudent";
import axios from "axios";

axios.defaults.baseURL = "https://fmdetector-backend-ab6qarmala-wl.a.run.app/";
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
//axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

function App() {
    const [isLogin, setIsLogin] = useState(false)
    const [isAddStudent, setIsAddStudent] = useState(false)

    const goBack = () => setIsAddStudent(false);
    return (
        <React.Fragment>
            <Header/>
            <body className="sidebar-disabled navbar-fixed ">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="/vendor/js/moment.min.js"></script>

            <div className="main-wrap">
                <nav className="navigation">
                    <div className="navbar-default navbar navbar-fixed-top">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="current navbar-brand" href="/">
                                    <strong>CMU Face Mask Detector Admin Dashboard</strong>
                                </a>
                            </div>

                            <div className="collapse navbar-collapse" id="navbar">
                                <ul className="nav navbar-nav navbar-left clearfix yamm">
                                    <li id="sidebar-switch" className="hidden-xs">
                                        <a
                                            className="action-toggle-sidebar-slim"
                                            data-placement="bottom"
                                            data-toggle="tooltip"
                                            href="#"
                                            title="Slim sidebar on/off"
                                        >
                                            <i className="fa fa-lg fa-bars fa-fw"></i>
                                        </a>
                                    </li>

                                    <li className="spin-search-box clearfix hidden-xs">
                                        <a href="#" className="pull-left">
                                            <i className="fa fa-close  fa-lg icon-active"></i>
                                        </a>
                                        <div className="input-group input-group-sm pull-left p-10">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search for..."
                                            />
                                            <span className="input-group-btn active">
                          <button className="btn btn-primary" type="button">
                            <i className="fa fa-search"></i>
                          </button>
                        </span>
                                        </div>
                                    </li>
                                </ul>

                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a href="/">Activity</a>
                                    </li>
                                    <li>
                                        <a href="/student">Students</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <aside className="navbar-default sidebar">
                        <div className="sidebar-overlay-head">
                            <img src="/images/spin-logo-inverted.png" alt="Logo"/>
                            <a
                                href="javascript:void(0)"
                                className="sidebar-switch action-sidebar-close"
                            >
                                <i className="fa fa-times"></i>
                            </a>
                        </div>
                        <div className="sidebar-logo">
                            <img
                                className="logo-default"
                                src="/images/spin-logo-big-inverse-@2X.png"
                                alt="Logo"
                                width="53"
                            />
                            <img
                                className="logo-slim"
                                src="/images/spin-logo-slim.png"
                                alt="Logo"
                            />
                        </div>

                        <div className="sidebar-content">
                            <ul className="side-menu m-t-2">
                                <li className="active">
                                    <a href="#" title="Page">
                                        <i className="fa fa-lg fa-file-o fa-fw"></i>
                                        <span className="nav-label">Real-time Analyzer</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Apps">
                                        <i className="fa fa-files-o fa-fw fa-lg"></i>
                                        <span className="nav-label">
                        Real-time Geographics
                      </span>{" "}
                                        <i className="fa arrow"></i>
                                    </a>
                                </li>
                            </ul>

                            <div className="sidebar-default-visible">
                                <hr/>
                            </div>
                        </div>
                    </aside>
                </nav>

                <div className="content">

                    <Router basename={process.env.PUBLIC_URL}>
                        <Switch>
                            <Route exact path="/">
                                {
                                    isLogin ? <Activity/> : <Login setIsLogin={setIsLogin}/>}
                            </Route>
                            <Route path="/student">
                                <Student/>
                            </Route>
                            <Route path="/addStudent">
                                <AddStudent/>
                            </Route>
                        </Switch>
                    </Router>
                </div>

            </div>
            </body>
            <link rel="stylesheet" href="/vendor/css/lib.min.css"></link>

            <script src="/javascript/app/helpers.js"></script>
            <script src="/javascript/app/layoutControl.js"></script>
            <script src="/javascript/app/rightSidebar.js"></script>
            <script src="/javascript/app/sidebar.js"></script>
            <script src="/javascript/app/main.js"></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js"></script>
            <script src="https://code.highcharts.com/highcharts.js"></script>
            <script src="https://code.highcharts.com/modules/exporting.js"></script>
            <script src="javascript/peity-settings.js"></script>
            <script src="javascript/highchart-themes/highcharts&amp;highstock-theme.js"></script>

            <script src="https://www.amcharts.com/lib/3/ammap.js"></script>
            <script src="https://www.amcharts.com/lib/3/maps/js/worldLow.js"></script>
            <script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
            <script src="https://www.amcharts.com/lib/3/themes/light.js"></script>
            <script src="http://github.highcharts.com/modules/exporting.src.js"></script>
            <script src="http://code.highcharts.com/modules/exporting.js"></script>
            <script src="http://highcharts.github.io/export-csv/export-csv.js"></script>

            <script src="vendor/js/bootstrap-tagsinput.min.js"></script>
            <script src="vendor/js/moment.min.js"></script>
            <script src="vendor/js/daterangepicker.min.js"></script>
            <script src="javascript/date-range-picker-settings.js"></script>

            <script src="vendor/js/highstock.min.js"></script>
            <script src="javascript/highchart-themes/highcharts&amp;highstock-theme.js"></script>
            <script src="javascript/highchart-themes/highcharts-settings.js"></script>
            <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css"/>

            <script type="text/javascript" charset="utf8"
                    src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>

        </React.Fragment>
    );
}

export default App;
