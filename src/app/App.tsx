import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import TodolistList from "../features/TodolistList/TodolistList";
import { Login } from "../features/Login/Login";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/store";
import { initializeApp } from "./appReducer";
import Preloader from "../components/Preloader/Preloader";

function App() {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

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
