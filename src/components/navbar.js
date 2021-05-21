import React from "react";

export default class Navbar extends React.Component {
    render(props) {
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-nav">
                <div className="container">
                    <a className="navbar-brand text-light name" href="#">Kunj Patel</a>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span><i className="fas fa-bars fa-2x"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                        <li className="nav-item text-center">
                            <a className="nav-link active text-light" aria-current="page" href="#landing-page">Home</a>
                        </li>
                            <li className="nav-item text-center">
                                <a className="nav-link text-light" aria-current="page" href="#about-page">About</a>
                            </li>
                            <li className="nav-item text-center">
                                <a className="nav-link text-light" href="#experience-page">Experience</a>
                            </li>
                            <li className="nav-item text-center">
                                <a className="nav-link text-light" href="#project-page">Projects</a>
                            </li>
                            <li className="nav-item text-center">
                                <a className="nav-link text-light" href="#contact-page">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
} 