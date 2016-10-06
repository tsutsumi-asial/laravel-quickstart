import React from 'react';
import Task from './Task.jsx';
import $ from 'jquery';

export default class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMore: true
        }
    }

    _showMore(e) {
        e.preventDefault();
        this.props.getTasks(this.props.currentPage + 1);
    }

    render() {
        const taskNodes = this.props.tasks.map((task) => {
            return (
                <Task key={ task.id } task={ task } deleteTask={ this.props.deleteTask } />
            );
        });
        let showMore = null;
        if(this.props.currentPage < this.props.lastPage) {
            showMore = <button className="btn btn-default" onClick={ this._showMore.bind(this) }>Show More...</button>;
        }
        /*const showMore = this.state.showMore
            ? <button className="btn btn-default" onClick={ this._showMore.bind(this) }>Show More...</button>
            : null;*/
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Current Tasks
                </div>

                <div className="panel-body">
                    <table className="table table-striped task-table">
                        <thead>
                            <th>Task</th>
                            <th>&nbsp;</th>
                        </thead>
                        <tbody>
                            {taskNodes}
                        </tbody>
                    </table>
                    {showMore}
                </div>
            </div>
        );
    }

}