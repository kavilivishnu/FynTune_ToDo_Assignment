import React from "react";
import "./App.css";
import AddToDoComponent from "./components/AddToDoComponent";
import ListComponent from "./components/ListComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
    return (
        <>
            <div className="App">
                <Col md={{ span: 6, offset: 3 }}>
                    <Container className="mainContainer">
                        <Row>
                            <AddToDoComponent />
                            <ListComponent />
                        </Row>
                    </Container>
                </Col>
            </div>
            <div className="pagextend">
                <h1>What turns people into Legends? The ToDo's.</h1>
                <h1>You will be one too. Start your planning now!</h1>
            </div>
        </>
    );
}

export default App;
