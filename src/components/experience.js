import { SectionHeading } from "./common";
import React from "react";
import {Chrono} from "react-chrono";


export default class Experience extends React.Component {
    render(){
        return (
            <div className="experience-wrap pt-4 pt-sm-4" id="experience-page">
                <div className="container">
                    <SectionHeading heading={"Experience"}/>

                    <div className="job-cards row">
                        <div className="col-10 col-md-4 bg-light">
                            <i className="fas fa-briefcase fa-5x"></i>
                            <h3>Rockwell Automation</h3>
                            <h5>Firmware Engineer Co-Op</h5>
                            <p>Jan 2020 - Aug 2020</p>
                        </div>
                        <div className="col-10 col-md-4 bg-light">
                            <i className="fas fa-briefcase fa-5x"></i>
                            <h3>NormaTec</h3>
                            <h5>Product Technician</h5>
                            <p>Feb 2019 - Oct 2020</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 