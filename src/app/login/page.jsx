"use client"

import React from "react";
import NavBar from "../components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StylePage from "../style/page";
import SettingsPage from "../setting/page";
import EditorPage from "../template/page";
import Home from '../page';
import Removenavbar from "../components/removeNavbar/RemoveNavbar";

export default function Loginpage() {

  return (
    <>
      <Router>
        <Removenavbar>
          <NavBar />
        </Removenavbar>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<loginPage />} />
          <Route path="/template" element={<EditorPage />} />
          <Route path="/style" element={<StylePage />} />
          <Route path="/setting" element={<SettingsPage />} />
        </Routes>

      </Router>
      
    </>
  );
}

