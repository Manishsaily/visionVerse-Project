import React from "react"
import Home from "./page"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"


ReactDOM.createRoot(document.getElementById("root"))(
    <React.StrictMode>
        <Home />
    </React.StrictMode>
)