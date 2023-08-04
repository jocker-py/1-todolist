import React from "react";
import Header from "../components/Header/Header";
import TodolistList from "../features/TodolistList/TodolistList";
import { Login } from "../features/Login/Login";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAppSelector } from "../state/store";
import Preloader from "../components/Preloader/Preloader";

function App() {
  const { isInitialized } = useAppSelector((state) => state.app);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path={"/"} element={<TodolistList />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
        <Route path={"*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </div>
  );
}

export default App;
