import React from "react";
import { SectionHeading } from "./common";

export default class Contact extends React.Component{
    render() {
        return (
            <div className="contact-wrap" id="contact-page">
                    <footer>
                        <div className="container">
                            <SectionHeading heading="Contact"/>
                            <a href="mailto:1999kunj@gmail.com?subject=Mail from personal Website">
                                <i className="fas fa-envelope fa-3x"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/kunj-patel-umass/">
                                <i className="fab fa-linkedin fa-3x"></i>
                            </a>
                            <a href="https://github.com/kunj1999">
                                <i className="fab fa-github fa-3x"></i>
                            </a>

                            
                            <p>Copyright &copy; 2021 by Kunj Patel. All rights reserved.</p>
                            <p>Powered by <u>Bootstrap</u> and <u>ReactJS</u></p>
                            
                        </div>
                    </footer>
            </div>
        )
    }
}