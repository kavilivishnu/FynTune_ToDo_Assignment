import React from "react";
import { connect } from "react-redux";
import { removeToDo, completeToDo } from "../actions/index";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

class SingleToDoComponent extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <ListGroup.Item>
                            <Row>
                                <Col md={{ md: 7, offset: 1 }} className="listItemColToDo">
                                    <Button
                                        className="itemCompleteButton"
                                        // onClick, the value of id in the object inside "completeToDo" 
                                        // function inside action folder, will be given a unique id
                                        // which will be later on required to perform operation with
                                        // that unique id.
                                        onClick={() => this.props.completeToDo(this.props.toDo.id)}
                                    >
                                        <div style={{ fontSize: "7px" }}>
                                            <i className="fa fa-check fa-xs" />
                                        </div>
                                    </Button>

                                    <span
                                        style={{
                                            textDecoration: this.props.toDo.completed
                                                ? "line-through red"
                                                : "none"
                                        }}
                                    >
                                        {" "} { /* This is the representation of space between successive elements */}
                                        {this.props.index}.{" "}{this.props.toDo.text}{' - '}
                                            (<b>{this.props.toDo.dateSelected}</b>)
                                        {/* The above context is the description of how the text in todo list should be visible.
                                            The first part of the context comes from "ListComponent.js" file from which the index 
                                            props are passed to this component for the numbering purpose of the texts in todo list. */}
                                        {this.props.toDo.completed === true ? "(completed)" : ""}{" "}
                                        {/* From the above conditonal rendering, if completed if true then the list item inside
                                            todo will be striked through or nothing happens which come from LINE 35 and 36
                                            which was implemented with the help of inline styling */}
                                    </span>
                                </Col>
                                <Col md={4} className="listItemColDelete">
                                    <Button
                                        variant="btn btn-outline-danger"
                                        className="itemDeleteButton"
                                        // onClick of the button, the id associated with that particular text will be removed with the 
                                        // help of the code that is executed from reducer related to the "type" of action "removeToDo"
                                        // function
                                        onClick={() => this.props.removeToDo(this.props.toDo.id)}
                                    >
                                        <div style={{ color: "black" }} >
                                            <i className="fa fa-trash" />
                                        </div>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    null,
    { removeToDo, completeToDo }
)(SingleToDoComponent);
