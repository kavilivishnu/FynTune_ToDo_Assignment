import React, { Component } from "react";
import { connect } from "react-redux";
import { addToDo } from "../actions/index";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DateSet from "./DateSet";

class AddToDoComponent extends Component {
    state = {
        text: "",
        dateSelected: new Date(),
    };

    handleChange = e => {
        // The below method is used to allow only the letters including spaces but no other characters. The "^" indicated the beiginning of the string and 
        // the "$" symbol is the indication to the end of the string. The match method method is used to match the text we enter and the condition that we 
        // entered i.e. [A-Z+a-z]. Thia format means that include all the upercase and lowercase alphabets and the (" ") is to include space. The expression
        // between the forward slash is the pattern expression.
        let letters = /^[A-Z+" "+a-z]+$/;
        if (e.target.value.match(letters)) {
            this.setState({
                text: e.target.value,
            });
        }
        else {
            this.setState({
                text: ""
            })
        }
    };

    handleCancelButton = () => {
        this.setState({
            text: "",
            dateSelected: new Date(),
        });
    };

    handleAddButton = (text, date) => {
        this.props.addToDo(text, date);
        this.setState({
            text: "",
            dateSelected: new Date(),
        });

        // The below statement a key that is "toDoList" in the local storage with the value that we enter in the input field which will
        // change the state and represent only as an "object" in the console but won't give the exact properties in the object. To avoid
        // that we use JSON.stringify() method to convert that meaningless representation into the actual reacdable properties that are 
        // existing in a certain object.       
        localStorage.setItem("toDoList", JSON.stringify(this.state.text));
        console.log(JSON.stringify(this.state.text));
    };

    render() {
        return (
            <Container>
                <Row className="headerRow">
                    <Col md={{ span: 8, offset: 2 }}>
                        <p className="title">
                            {" "}
                            To Do App{" "}
                        </p>
                    </Col>
                </Row>

                <Row className="addRow">
                    <Col md={12}>
                        <span>Add To Do: </span>
                        <input
                            type="text"
                            onChange={this.handleChange}
                            className="toDoText"
                            value={this.state.text}
                            placeholder="Enter your ToDo"
                        />
                        <DateSet
                            // From the below snippet we can say that we are passing the props from this component to "DateSet" component
                            // Directly within the onChange handler we set the state of the props of the action creater "addToDo" i.e. 
                            // (dateSelector) from the action folder and pass it directly to the "DateSet" component and set the 
                            // selected date in that component to the "dateSelector" prop inside the "addToDo" action creater. 
                            dateSelected={this.state.dateSelected}
                            handleChange={(date) =>
                                this.setState({
                                    ...this.state,
                                    dateSelected: date
                                })} />
                        <Button
                            variant="secondary"
                            className="buttonAdd"
                            // onClick of the button the text that had been entered in input field wil contact the action fuction in the action 
                            // folder and change the props state inside that object and display it on the screen and teh updated state will 
                            // get stored in the local storage as well. Right after the process of updating, the text state is again set back to 
                            // an empty string so that we can enter the text again.
                            onClick={() => this.handleAddButton(this.state.text, this.state.dateSelected)}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outline-danger"
                            className="buttonCancel"
                            // onClick teh data inside the input field will get erased as we set the state text back to an empty string.
                            onClick={this.handleCancelButton}
                            style={{ color: "lightblue" }}
                        >
                            Cancel
                        </Button>
                        <br />
                        <br />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    null,
    { addToDo }
)(AddToDoComponent);
