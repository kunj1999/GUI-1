import React from "react";
import { SectionHeading } from "./common";
import {Chrono} from "react-chrono";

const projects=[
    {
        title: "May 2021",
        cardTitle: "Portfolio Website",
        cardSubtitle: "May 2021 - Current",
        cardDetailedText: "Portfolio website to showcase my skills and achievements. Utilized ReactJS framework for frontend development. Additionally styled using bootstrap and css."
    },
    {
        title: "Apr 2021",
        cardTitle: "E-Tutor",
        cardSubtitle: "Feb 2021 - Apr 2021",
        cardDetailedText: "Website that would allows students to interact with tutors around the globe. The website utilized bootstrap for dynamic design and JQuery for interactivity. It was developed using HTML, CSS, JavaScript and PHP."
    },
    {
        title: "Dec 2020",
        cardTitle: "Secure Drop",
        cardSubtitle: "Oct 2020 - Dec 2020",
        cardDetailedText: "Python application to securely transfer files over network. Utilized SHA-256 and PGP encryption scheme to ensure confidentiality and data integrity."
    }
]

export default class Projects extends React.Component {
    render(){
        return (
            <div className="project-wrap" id="project-page">
                <SectionHeading heading="Projects"/>
                <Chrono items={projects} mode="VERTICAL" scrollable={false} hideControls="0"/>
            </div>
        )
    }
}