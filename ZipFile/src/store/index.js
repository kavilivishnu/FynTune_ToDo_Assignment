import { createStore, combineReducers } from "redux";
import ToDoReducer from "../reducers/ToDoReducer";

// As we want to name the whole component that represents "reducers", we will be needing object to do that since the naming should be 
// done in key value pairs to accomplish this we have to use the hook from redux called "combineReducers". 
const reducers = combineReducers({
    todo: ToDoReducer
});

const store = createStore(
    reducers,
    // The localStorage will store the data in our application store in the browser. This is very useful method because when we rendered 
    // data onto our screen the data actually stays even though the webpage is reloaded. Because the data is already stored in browser which
    // will help in letting the data stay without erasing the present state.

    // So in the below snippet from LINE 24-28, we're telling if there is nothing stored in localStorage i.e. nothing had been rendered onto 
    // the screen yet, return an empty object else display the the data that had been stored in the localStorage that had already been saved 
    // when we enter the data in the input fields.

    // Since the returned data will be received from browser, the data won't actually be in javaScript. It will be in JSON format. So to read
    // that file we convert it back into javaScript by using "JSON.parse()" method. This convertion JSON back to javascript is called
    // "De-serialization". 

    // So it is basically that we are receiving the entire initial state in the Reducer i.e. object and the properties in it (reference: LINE 27).
    JSON.parse(localStorage.getItem("toDo")) === null
        ? {}
        : {
            todo: { todos: JSON.parse(localStorage.getItem("toDo")), filter: "ALL" }
        }
);

export default store;
