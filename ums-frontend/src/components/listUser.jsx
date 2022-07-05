import React, { Component } from "react";
import userServices from "../services/userServices";
import { Link } from "react-router-dom";
import { withRouter } from "../utils/router";

class listUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.editUser = this.editUser.bind(this);
    this.viewUser = this.viewUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    userServices.getUsers().then((res) => {
      this.setState({ users: res.data.allUsers });
      console.log(res.data.allUsers);
    });
  }

  deleteUser(id) {
    userServices.deleteUser(id).then((res) => {
      this.setState((prevState) => ({
        ...prevState,
        users: prevState.users.filter((user) => user._id !== id),
      }));
      console.log(this.state.users);
    });
  }

  viewUser(id) {
    this.props.router.navigate(`/view-user/${id}`);
  }

  editUser(id) {
    this.props.router.navigate(`/edit-user/${id}`);
  }

  render() {
    return (
      <div>
        <h2 className="text-center mt-4">Users List</h2>

        <div className="row w-75 p-3 mx-auto ">
          <Link to="/create-user">
            <button className="btn btn-primary">Add user</button>
          </Link>
          <table className="table table-bordered table-striped  mt-2 ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => this.editUser(user._id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.deleteUser(user._id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Delete
                      </button>

                      <button
                        className="btn btn-info"
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.viewUser(user._id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(listUser);
