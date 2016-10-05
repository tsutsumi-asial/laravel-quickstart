import React from 'react';
import $ from 'jquery';
import TaskForm from './TaskForm.jsx';
import TaskList from './TaskList.jsx';

export default class TaskBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
        this._getTasks = this._getTasks.bind(this);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }

    _addTask(newTask) {
        $.post('/api/tasks', newTask, (addedTask) => {
            this.setState({tasks: this.state.tasks.concat(addedTask)});
        });
    }

    _deleteTask(task) {
        $.ajax({
            url: `/api/tasks/${task.id}`,
            type: 'DELETE',
            success: () => {
                const tasks = this.state.tasks.splice(this.state.tasks.indexOf(task), 1);
                this.setState(tasks);
            }
        });
    }

    _getTasks() {
        $.get('/api/tasks', (tasks) => {
            this.setState({tasks});
        });
    }

    componentWillMount() {
        this._getTasks();
    }

    render() {
        return (
            <div className="container">
                <div className="col-sm-offset-2 col-sm-8">

                    <TaskForm submit={ this._addTask.bind(this) }/>

                    <TaskList tasks={ this.state.tasks } deleteTask={ this._deleteTask.bind(this) } />

                </div>
            </div>
        );
    }
}