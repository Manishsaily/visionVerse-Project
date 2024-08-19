"use client"

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StylePage from "./style/page";
import EditorPage from "./template/page";
import SettingsPage from "./setting/page";
import Removenavbar from "./components/removeNavbar/removeNavbar";
import Loginpage from "./login/page";

export default function Home() {

  return (
    <>
      <Router>
        <Removenavbar />
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/template" element={<EditorPage />} />
          <Route path="/style" element={<StylePage />} />
          <Route path="/setting" element={<SettingsPage />} />
        </Routes>
      </Router>
      
    </>
  );
}
