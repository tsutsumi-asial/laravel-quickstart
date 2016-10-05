import React from 'react';

export default class Task extends React.Component {

    constructor(props) {
        super(props);
    }

    _deleteTask(e) {
        e.preventDefault();
        this.props.deleteTask(this.props.task);
    }

    render() {
        return(
            <tr>
                <td className="table-text">
                    <div>{ this.props.task.name }</div>
                </td>
                <td>
                    <form>
                        <button type="submit" className="btn btn-danger" onClick={ this._deleteTask.bind(this) }>
                            <i className="fa fa-btn fa-trash"></i>Delete
                        </button>
                    </form>
                </td>
            </tr>
        );
    }
}