import React from 'react';

export default class LabelForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({name: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const name = this.state.name;
        this.props.submit({name});
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    New Label
                </div>
                <div className="panel-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="task-name" className="col-sm-3 control-label">
                                Label
                            </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    name="name"
                                    id="task-name"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-6">
                                <button type="submit" className="btn btn-default" onClick={this.onSubmit}>
                                    <i className="fa fa-btn fa-plus" />Add Label
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}