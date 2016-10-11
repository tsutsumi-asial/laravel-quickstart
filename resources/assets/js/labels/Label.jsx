import React from 'react';

export default class Label extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-info">
                {this.props.label.name}
            </button>
        );
    }

}