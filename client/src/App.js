import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";
import Footer from "./components/footers/Footer";
import PageAdmin from "./components/admin/PageAdmin";

import "antd/dist/antd.css";

console.log("DataProvider",DataProvider)

function App() {
  return (
    <DataProvider>
        <div className="App">
          <MainPages />
        </div>
    </DataProvider>
  );
}

export default App;
