import React from 'react';

export default class TaskFrom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    _handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    _postNewTask(e) {
        e.preventDefault();
        const name = this.state.name;
        this.props.submit({ name });
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    New Task
                </div>
                <div className="panel-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="task-name" className="col-sm-3 control-label">Task</label>

                            <div className="col-sm-6">
                                <input type="text" name="name" id="task-name" className="form-control"
                                       value={ this.state.name }
                                       onChange={ this._handleNameChange.bind(this) }
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-6">
                                <button type="submit" className="btn btn-default" onClick={ this._postNewTask.bind(this) }>
                                    <i className="fa fa-btn fa-plus"></i>Add Task
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}