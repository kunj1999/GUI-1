import React from "react";

export class SkillsProgress extends React.Component {
    render() {
        return (
            <div className="Individual-skill">
                <p>{this.props.skill}</p>
                <progress value={this.props.skillLevel} max="100"></progress>
            </div>
        )
    }
}

export class SectionHeading extends React.Component {
    render() {
        return (<>
            <h2>{this.props.heading}</h2>
            <hr width="15%"/>
            <hr width="10%"/>
        </>)
    }
}