"use client"

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StylePage from "./style/page";
import EditorPage from "./template/page";
import SettingsPage from "./setting/page";
import Loginpage from "./login/page";
import Landingpage from "./home/page";

export default function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/template" element={<EditorPage />} />
          <Route path="/style" element={<StylePage />} />
          <Route path="/setting" element={<SettingsPage />} />
        </Routes>
      </Router>
      
    </>
  );
}
