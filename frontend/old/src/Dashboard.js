import logo from "./logo.svg";
import "./App.css";

function Dashboard() {
  return (
    <div className="App">
      <div class="login-form">
        <center class="divbackground">
          <h1 class="header1">CMU Face Mask Detection</h1>
          <p class="emphasis">
            <b>Admin Login</b>
          </p>
        </center>
        <form action="FMD-upload.html">
          <table class="table table-hover" style={{textAlign: "center"}}>
            <tr>
              <td>
                <div class="form-group">
                  <label>
                    <b>User Name:</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="uninput"
                    placeholder="Email Address"
                    autocomplete="off"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-group">
                  <label>
                    <b>Password:</b>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="pwdinput"
                    placeholder="Password"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="c3-2">
                  <center>
                    <input
                      type="submit"
                      id="realsub"
                      onclick=" return checkuser()"
                      style={{display: "none;"}}
                    />
                    <div class="btn btn-primary" onclick="realclick()">
                      Sign In
                    </div>
                  </center>
                  <br />
                </div>
              </td>
            </tr>
          </table>
        </form>
      </div>
      <link
        rel="stylesheet"
        href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
      ></link>
      <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
      <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </div>
  );
}

export default Dashboard;
