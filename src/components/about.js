import {SectionHeading, SkillsProgress} from "./common"
import React from "react";

export default class About extends React.Component {
    render() {
        return (
            <div className="about-wrap" id="about-page">
                <div className="container about-text">
                    <div className="row">
                        <div className = "col-sm-12 col-md-4">
                            <img src="KunjCropped.png" alt="Personal Image"/>
                        </div>
                        <div className="col-sm-12 col-md-8 text-center">
                            <SectionHeading heading={"About"}/>
                            <p>
                                Hello! My name is Kunj Patel. I have bachelor's in Computer Science from Univeristy of Massachusetts Lowell. I am passionate about web development, Robotics and Cloud technology. Check out my github repository for current and past projects.
                            </p>

                            <SectionHeading heading={"Skills"}/>
                            <SkillsProgress skill={"C/C++"} skillLevel={"95"}/>
                            <SkillsProgress skill={"Python"} skillLevel={"85"}/>
                            <SkillsProgress skill={"PHP"} skillLevel={"80"}/>
                            <SkillsProgress skill={"HTML/CSS"} skillLevel={"75"}/>
                            <SkillsProgress skill={"JavaScript"} skillLevel={"75"}/>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}