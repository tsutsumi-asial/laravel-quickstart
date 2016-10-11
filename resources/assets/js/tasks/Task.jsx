import React from 'react';
import Label from '../labels/Label.jsx';

export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.deleteTask(this.props.task);
    }

    render() {
        const labelNodes = this.props.task.labels.map((label) => {
            return <Label key={label.id} label={label} />
        });
        return(
            <tr>
                <td className="table-text">
                    <div>{ this.props.task.name }</div>
                </td>
                <td>
                    {labelNodes}
                </td>
                <td>
                    <form>
                        <button type="submit" className="btn btn-danger" onClick={this.onSubmit}>
                            <i className="fa fa-btn fa-trash"></i>Delete
                        </button>
                    </form>
                </td>
            </tr>
        );
    }
}