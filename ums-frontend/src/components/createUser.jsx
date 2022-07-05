import React, { Component } from "react";
import userServices from "../services/userServices";
import { withRouter } from "../utils/router";

class createUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
    };
  }

  firstnameHandler = (event) => {
    this.setState({ firstname: event.target.value });
  };

  lastnameHandler = (event) => {
    this.setState({ lastname: event.target.value });
  };

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  saveUser = (e) => {
    e.preventDefault();

    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
    };
    console.log("user=>" + JSON.stringify(user));

    userServices.createUser(user).then((res) => {
      return this.props.router.navigate("/users");
    });
  };

  render() {
    return (
      <div className="card mx-auto bg-light mt-5 " style={{ width: "34em" }}>
        <h3 className="text-center mt-4">Add a new user</h3>
        <div className="card-body ">
          <form className="flex-column p-4 d-flex row gy-3">
            <div className="form-group">
              <input
                type="text"
                className="form-control p-2"
                onChange={this.firstnameHandler}
                style={{ width: "30em" }}
                placeholder="Firstname"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control p-2"
                onChange={this.lastnameHandler}
                style={{ width: "30em" }}
                placeholder="Lastname"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control p-2"
                onChange={this.emailHandler}
                style={{ width: "30em" }}
                placeholder="email"
              />
            </div>

            <button
              className="btn btn-primary "
              onClick={this.saveUser}
              style={{ marginLeft: 6 }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(createUser);
