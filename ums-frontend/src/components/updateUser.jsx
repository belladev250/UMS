import React, { Component } from "react";
import { withRouter } from "../utils/router";
import userServices from "../services/userServices";

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.router.params.id,
      firstName: "",
      lastName: "",
      email: "",
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
  }

  componentDidMount() {
    userServices.getUserById(this.state.id).then((res) => {
      let user = res.data.user;
      this.setState((prevState) => ({
        ...prevState,
        firstName: user?.firstname,
        lastName: user?.lastname,
        email: user?.email,
      }));
    });
  }

  UpdateUser = (e) => {
    e.preventDefault();
    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    };
    console.log("user => " + JSON.stringify(user));
    console.log("id => " + JSON.stringify(this.state.id));
    userServices.updateUser(user, this.state.id).then((res) => {
      this.props.router.navigate("/users");
    });
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Update User</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> First Name: </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Last Name: </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email: </label>
                    <input
                      placeholder="Email Address"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button className="btn btn-success" onClick={this.UpdateUser}>
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateUser);
