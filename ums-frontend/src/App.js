import React from "react";
import { Routes, Route } from "react-router-dom";
// import Header from './components/header';
// import Register from './pages/registerPage';
import Home from "./pages/homePage";
import CreateUser from "./components/createUser";
import UpdateUser from "./components/updateUser";
import ViewUser from "./components/viewUser";
import UserList from "./components/listUser";
function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-dark ">
        <p className="text-light mx-auto display-6">User Management App</p>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" exact element={<UserList />} />
        <Route path="view-user/:id" element={<ViewUser />} />
        <Route path="edit-user/:id" element={<UpdateUser />} />
        <Route path="create-user" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
