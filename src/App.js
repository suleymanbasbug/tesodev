import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Landing from "./Pages/Landing";
import Search from "./Pages/Search";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </Router>
  );
}
