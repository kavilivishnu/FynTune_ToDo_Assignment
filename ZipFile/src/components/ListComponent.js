import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAll } from "../actions/index";
import { searchToDo, setFilter } from "../actions/index";
import SingleToDoComponent from "./SingleToDoComponent";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function filterToDos(todos, type) {
    switch (type) {
        case "ALL":
            return todos;
        case "COMPLETED":
            return todos.filter(todo => todo.completed === true);
        case "ACTIVE":
            return todos.filter(todo => todo.completed === false);
        default:
            return todos;
    }
}

class ListComponent extends Component {
    state = {
        search: ""
    };

    // We are using asyn here is because we are trying to fetch the data from server. To be precise, from the local storage of the browser
    // where we are constantly storing the data that we are entering. And we are using await because we can't get the data from server-end
    // as soon as we expect because whenever we make a request to the server, It takes time to get the response from the server. 
    // In our case the local storage, onto our screen.  
    handleChange = async e => {
        await this.setState({
            search: e.target.value
        });

        // As soon as we recieve the data we update the search state of the props of the searchToDo action in the action folder 
        // from empty to the state that we had recieved(response), from local storage. 
        this.props.searchToDo(this.state.search);
    };

    render() {
        return (
            <Container>
                <Row className="searchRow">
                    <Col md={12}>
                        <span>Search: </span>
                        <input
                            type="text"
                            className="searchText"
                            // The results will show up while we are typing itself using the event change handler. 
                            onChange={e => this.handleChange(e)}
                            // The value inside the text box is set and changes instantly according to the change in the word or letter
                            // flow in the input field. As there is nothing set initially for the input field to show up, we show the 
                            // results and set the values instantly when the texts are typed into input fields.
                            value={this.state.search}
                            placeholder="Search your ToDo"
                        />
                        <Button
                            variant="outline-danger"
                            className="buttonDelete"
                            // oniClck, the action function will be contacted and from there with the help of value of "type" attribute,
                            // we will be naviagted to "reducer" component and the case corresponding to the value will be executed.
                            onClick={() => this.props.deleteAll()}
                            style={{ color: "lightblue" }}
                        >
                            Delete All
                        </Button>
                    </Col>
                </Row>

                <Row className="filterRow">
                    <Col md={4}>
                        <Button
                            variant="link"
                            // onClick, the case within the switch statement starting from LINE 13 within the fuction "filterToDos" will be 
                            // executed. It the same for LINE 88 AND LINE 97.
                            onClick={() => this.props.setFilter("ACTIVE")}
                            style={{ textDecoration: "none" }}>
                            Show active
                        </Button>
                    </Col>

                    <Col md={4}>
                        <Button
                            variant="link"
                            onClick={() => this.props.setFilter("COMPLETED")}
                            style={{ textDecoration: "none" }} >
                            Show Completed
                        </Button>
                    </Col>

                    <Col md={4}>
                        <Button
                            variant="link"
                            onClick={() => this.props.setFilter("ALL")}
                            style={{ textDecoration: "none" }} >
                            Show All
                        </Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <ListGroup>
                        {/* In the below context the items within the todo list will be assigned the numbering individually as the
                            number of texts increases and the numbering start from index + 1 i.e. from number one and goes on  */}
                        {this.props.toDoList.map((toDo, index) => {
                            return (
                                <SingleToDoComponent
                                    key={toDo.id}
                                    toDo={toDo}
                                    index={index + 1}
                                />
                            );
                        })}
                    </ListGroup>
                </Row>
            </Container>
        );
    }
}

// The only thing that has to be observed is, we grab a certain something state from our redux store and pass that to our component
// that we are in as props and make use of that state in any part in our component to check the results upon that operation. 
// This can be achieved through mapStateToProps which will help us subscribe the changes that we had done with the state
// that we had received from store back to the store whenever the state is canged. Then we can always use the method 
// store.getState() to know the present state of any parts in our application or the whole preset state of our application.

const mapStateToProps = state => {
    // mapStateToProps is basically mapping the state of store to the props of this component. To do this, we take some data from
    // the store and map to the props in our component and display the resultant output that we want render onto the screen. Here
    // in the below statement we are grabbing the "todos" and "filter" props from the state and and making use of it in switch 
    // statement then implementing the fuctionality of the cases in switch statement with event listeners and finally we are getting
    // to see the desired output 
    return {
        toDoList: filterToDos(state.todo.todos, state.todo.filter)
    };
};


// Connect is a function basically acts as a higher order component. Connect is used to connect the react component to the store 
// because these components make use of action creater functions coded within the action folder, some operations will be performed 
// on that action creaters and that operation should be dispatched to the store to update and make changes on a certain properties in an 
// object
export default connect(
    // As there is first argument that is "mapStatetoProps", everytime the state is changed, the mapStateProps will be called and 
    // the change has to be subscribed(to be told or informed) to the redux store. If there are no updates or no changes that you 
    // want to subscribe to the store just leave the first argument as "null" or "undefined" in the place of mapStateTo Props.
    mapStateToProps,

    // All the action creaters that are  used in the components had to undergo some changes or updates and should be dispatched to
    // the store again to get the information back to us about what all had been updated within the whole component. 
    { deleteAll, searchToDo, setFilter }
)(ListComponent);
