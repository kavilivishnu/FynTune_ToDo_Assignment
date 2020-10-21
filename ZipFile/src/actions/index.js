// We mention all the required fuctions that we will be using in this file which is actually called as "Action Creaters".
// Actiions are just to describe a particular operation. There won't be any logic seen it in. 
// As represented below, action is an oject taht return an object. In this object we see a keyname called "type". 
// This key "type" is the representaton or a name of a certain action that it is put under, when used in "reducer" component as (action.type).
// From here we can import the required functions and use it anywhere in other files. 

import { v4 as uuidv4 } from "uuid";
// As we will be having multiple changes that will be made to each and every text on an individual level
// (Ex: striking out the text when clicked on text or the completed button which indicated that we are done with that particular task),
// to access all of such elements on an individual level, we need individual keys. uuid package will provide individual keys for
// individual elements.

export const addToDo = (text, dateSelected) => {
    return {
        type: "ADD_TODO",
        id: uuidv4(),
        text,
        // Since the date will be in object format format, we use JSON.strigify() method to convert that object into string format and then
        // we can access. Also the whole data comes with a random key right after the dd/MM/YYYY series. To avoid that we use the subString()
        // method to cut down that string only upto index value 1 TO 10 by specifying the start and end time in it.  
        dateSelected: JSON.stringify(dateSelected).substr(1, 10),
        completed: false
    };
};

export const removeToDo = id => {
    return {
        type: "REMOVE_TODO",
        id
    };
};

export const deleteAll = () => {
    return {
        type: "DELETE_ALL"
    };
};

export const searchToDo = value => {
    return {
        type: "SEARCH_TODO",
        value
    };
};

export const completeToDo = id => {
    return {
        type: "COMPLETE_TODO",
        id
    };
};

export const setFilter = filter => {
    return {
        type: "SET_FILTER",
        // payload is the additional information which is also an action that we can provide to store through reducer.
        payload: filter
    };
};
