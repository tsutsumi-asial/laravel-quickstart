import React from 'react';

import LabelForm from './../labels/LabelForm.jsx';
import LabelList from './../labels/LabelList.jsx';

export default class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedLabels: [],
            showLabelForm: false,
        };
        this.labelSelected = this.labelSelected.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleLabelForm = this.toggleLabelForm.bind(this);
    }

    labelSelected(selectedLabels) {
        this.setState({
            selectedLabels,
        });
    }

    onChange(e) {
        this.setState({ name: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const name = this.state.name;
        const labels = this.state.selectedLabels;
        const data = {
            name,
            labels,
        }
        this.props.submitTask(data);
    }

    toggleLabelForm(e) {
        e.preventDefault();
        const showLabelForm = !this.state.showLabelForm;
        this.setState({
            showLabelForm,
        });
    }

    render() {
        const labelForm = this.state.showLabelForm
            ? <LabelForm submit={this.props.submitLabel} />
            : null;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    New Task
                </div>
                <div className="panel-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="task-name" className="col-sm-3 control-label">
                                Task
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
                        <LabelList
                            labels={this.props.labels}
                            labelSelected={this.labelSelected}
                        />
                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-6 text-right">
                                <button
                                    type="submit"
                                    className="btn btn-default text-center"
                                    onClick={this.toggleLabelForm}
                                >
                                    <i className="fa fa-btn fa-plus" />
                                </button>
                            </div>
                        </div>
                        {labelForm}
                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-6 text-center">
                                <button
                                    type="submit"
                                    className="btn btn-block btn-primary"
                                    onClick={this.onSubmit}
                                >
                                    <i className="fa fa-btn fa-plus" />Add Task
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}