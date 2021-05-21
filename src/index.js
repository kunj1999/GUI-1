import About from "./components/about";
import Experience from "./components/experience";
import Landing from "./components/landing";
import Navbar from "./components/navbar";
import React from "react";
import ReactDOM from 'react-dom';
import Projects from "./components/project";
import Contact from "./components/contact";

ReactDOM.render(
    <>
        <Navbar />
        <Landing />
        <About />
        <Experience />
        <Projects />
        <Contact />
    </>, 
    document.getElementById("App"));