import React from 'react';
import Task from './Task.jsx';

export default class TaskList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const taskNodes = this.props.tasks.map((task) => {
            return (
                <Task key={ task.id } task={ task } deleteTask={ this.props.deleteTask } />
            );
        });
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
                </div>
            </div>
        );
    }

}