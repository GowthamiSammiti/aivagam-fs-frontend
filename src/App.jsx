import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import TodoList from "./components/TodoList/TodoList.jsx";

const App = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/todos" element={isAuthenticated ? <TodoList /> : <Navigate to="/signin" />} />
            <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
    );
};

export default App;