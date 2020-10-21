import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { addToDo } from '../actions/index';
import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

class DateSet extends Component {

    // Sice we are passing the state to this component directly from the "AddToDoComponent" component, we don't have to start from the
    // initial state. We can just update the initial state from the reference of the props.
    handleChange = (date) => {
        this.props.setState({
            ...this.props.state,
            dateSelected: date,
        });
    };

    onFormSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <DatePicker
                        selected={this.props.dateSelected}
                        onChange={(date) => this.props.handleChange(date)}
                        name="startDate"
                        dateFormat="MM/dd/yyyy"
                    />
                </div>
            </form>
        );
    }

}

export default connect(null, { addToDo })(DateSet);
