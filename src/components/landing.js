import React from "react";

export default class Landing extends React.Component {
    render(props) {
        return (
            <div className="landing-wrap" id="landing-page">
                <div className="landing-text">
                    <h1>WELCOME!</h1>
                    <h4>I'm Kunj Patel</h4>
                    <p>Software Developer</p>
                    <a href="#" className="view-project-btn">View Projects</a>
                </div>
            </div>
        );
    }
}