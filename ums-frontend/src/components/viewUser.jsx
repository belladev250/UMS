import React from "react";
import { useParams } from "react-router";
import userServices from "../services/userServices";

const ViewUser = () => {
  const params = useParams();
  const [state, setState] = React.useState({
    user: null,
  });

  React.useEffect(() => {
    userServices.getUserById(params.id).then((res) => {
      setState((prevState) => ({ ...prevState, user: res.data.user }));
    });
  });

  return (
    <>
      {state.user && (
        <div className="card mx-auto ">
          <h3 className="text-center mt-4">User Details</h3>

          <div className="card-body">
            <div className="d-flex">
              <label className="fw-bold">User firstname:</label>
              <div>{state.user.firstname}</div>
            </div>

            <div className="d-flex">
              <label className="fw-bold">User lastname:</label>
              <div className="">{state.user.lastname}</div>
            </div>

            <div className="d-flex">
              <label className="fw-bold">User email:</label>
              <div>{state.user.email}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUser;
