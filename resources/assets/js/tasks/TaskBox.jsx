import React from 'react';
import $ from 'jquery';
import TaskForm from './TaskForm.jsx';
import TaskList from './TaskList.jsx';

export default class TaskBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            tasks: [],
            perPage: 10,
            currentPage: 1,
            lastPage: null
        };
        this.addLabel = this.addLabel.bind(this);
        this.getLabels = this.getLabels.bind(this);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.getTasks = this.getTasks.bind(this);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }

    addLabel(newLabel) {
        $.post('api/labels', newLabel, (addedLabel) => {
            let labels = this.state.labels;
            labels.push(addedLabel);
            this.setState({
                labels,
            });
        });
    }

    getLabels() {
        $.get('/api/labels', (labels) => {
            this.setState({
                labels,
            });
        });
    }

    addTask(newTask) {
        $.post('/api/tasks', newTask, (addedTask) => {
            console.log(JSON.stringify(addedTask));
            let tasks = this.state.tasks;
            tasks.unshift(addedTask);
            this.setState({
                tasks,
            });
        });
    }

    deleteTask(task) {
        $.ajax({
            url: `/api/tasks/${task.id}`,
            type: 'DELETE',
            success: () => {
                const tasks = this.state.tasks;
                tasks.splice(this.state.tasks.indexOf(task), 1);
                this.setState({
                    tasks,
                });
            }
        });
    }

    getTasks(page) {
        $.get(`/api/tasks?page=${page}`, (response) => {
            this.setState({
                tasks: this.state.tasks.concat(response.data),
                currentPage: response['current_page'],
                lastPage: response['last_page']
            });
        });
    }

    componentWillMount() {
        this.getTasks(this.state.currentPage);
        this.getLabels();
    }

    render() {
        return (
            <div className="container">
                <div className="col-sm-offset-2 col-sm-8">
                    <TaskForm
                        labels={this.state.labels}
                        submitLabel={this.addLabel}
                        submitTask={this.addTask}
                    />
                    <TaskList
                        tasks={this.state.tasks}
                        currentPage={this.state.currentPage}
                        lastPage={this.state.lastPage}
                        deleteTask={this.deleteTask}
                        getTasks={this.getTasks}
                    />
                </div>
            </div>
        );
    }
}