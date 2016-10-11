import React from 'react';

export default class LabelList extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let labels = [];
        const options = e.target.options;
        for(let option of options) {
            if(option.selected) {
                labels.push(option.value);
            }
        }
        this.props.labelSelected(labels);
    }

    render() {
        const options = this.props.labels.map((label) => {
            return <option value={label.id}>{label.name}</option>
        });
        return (
            <div className="form-group">
                <label htmlFor="labels" className="col-sm-3 control-label">
                    Labels
                </label>
                <div className="col-sm-6">
                <select multiple={true} id="labels" className="form-control" onChange={this.onChange}>
                    {options}
                </select>
                </div>
            </div>
        );
    }

}