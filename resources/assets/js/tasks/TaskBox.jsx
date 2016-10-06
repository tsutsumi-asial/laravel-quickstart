import React from 'react';
import $ from 'jquery';
import TaskForm from './TaskForm.jsx';
import TaskList from './TaskList.jsx';

export default class TaskBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            perPage: 10,
            currentPage: 1,
            lastPage: null
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
            let tasks = this.state.tasks;
            tasks.unshift(addedTask);
            this.setState({tasks});
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

    _getTasks(page) {
        $.get(`/api/tasks?page=${page}`, (response) => {
            this.setState({
                tasks: this.state.tasks.concat(response.data),
                currentPage: response['current_page'],
                lastPage: response['last_page']
            });
        });
    }

    componentWillMount() {
        this._getTasks(this.state.currentPage);
    }

    render() {
        return (
            <div className="container">
                <div className="col-sm-offset-2 col-sm-8">

                    <TaskForm submit={ this._addTask.bind(this) }/>

                    <TaskList tasks={ this.state.tasks } currentPage={ this.state.currentPage } lastPage={ this.state.lastPage } deleteTask={ this._deleteTask.bind(this) } getTasks={ this._getTasks.bind(this) } />

                </div>
            </div>
        );
    }
}