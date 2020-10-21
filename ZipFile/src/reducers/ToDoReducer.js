// Whenever you are starting to code up in "Reducers" file you have to give an initial state as first argument and action as the second argument.
// Reducers is the place where the actual logic of the code is executed taking in the account of the values of "type" keys coming from the action 
// folder which are passed with cases in the switch statements. From her the data will be passed to store.

const INITIAL_STATE = { todos: [], filter: "ALL" };

const ToDoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) { // Below from here we write the logic for the actions functions that we coded in index.js file inside action folder.
        case "ADD_TODO":
            let existingToDo = false; // This boolean is used as reference to the text that are already listed in the todo list.  

            // The below snippet is to check wether both the entered text and the text which is already existing in the todo list are
            // equal or not equal. If equal, pop an alert with message "Exists" else(reference = LINE 22) add the text to the todos array.
            state.todos.forEach(toDo => {
                if (toDo.text === action.text) {
                    existingToDo = true;
                    alert("Exist");
                    return;
                }
            });

            if (existingToDo) return state;


            // Below snippet is to push new todo text into the new by making of a copy of todo array by spreading it. Next we are cosidering 
            // the key values pairs in the object inside "ADD_TODO" function and assigning a unique id to each and every text in the 
            // todo list with help of the "uuid" package and text remains the same i.e. text: text. 
            const newToDos = [
                ...state.todos,
                {
                    id: action.id,
                    text: action.text,
                    dateSelected: action.dateSelected,
                    completed: false,
                },
            ];

            // Storing data in browser storage will take in two arguments 1)key 2)value. That is localStorage("key", value).
            // With the below snippet we are storing the data by using setItem i.e. key value pairs in our new array i.e. newToDos in the browser storage.
            // We are usinh "JSON.stringify()" because we can store the data in browser only in the string format no other datatype is allowed
            // to be stored in the browser storage.
            localStorage.setItem("toDo", JSON.stringify(newToDos));
            return { todos: newToDos, filter: "ALL" };

        // 
        case "REMOVE_TODO":
            const id = action.id;
            // The below statement means that, if the id of the todo text is equal to its prior assigned id. Only if the datatype satisfies the
            // equality strictly only then it returns true and performs the associated operation else it return false and doesn't execute the
            // code behind it. It is because of the strictly equality operator we used in this instance (!==). t=The filter method is used to
            // fetch that one thing that we are searching for.
            const newToDo_1 = state.todos.filter(toDo => toDo.id !== id);
            localStorage.setItem("toDo", JSON.stringify(newToDo_1));
            return { ...state, todos: newToDo_1 };
        case "DELETE_ALL":
            localStorage.removeItem("toDo");
            return INITIAL_STATE;
        case "SEARCH_TODO":
            const allTodos = JSON.parse(localStorage.getItem("toDo"));
            const searchedTodos = allTodos.filter(val =>
                // Whatever is typed in the input field is being compared with the existing texts in the todo list. If any of the text has the 
                // characters of string that has been typed in input field then that text will be shown as a result. 
                val.text.includes(action.value)
            );
            // After you found the text is spotted, it will return or show up the value. 
            return { todos: searchedTodos, filter: "ALL" };
        case "COMPLETE_TODO":
            const updatedTodos = state.todos.map(toDo =>
                // If the id of the corresponding todo is strictly equal to the initially assigned id then we invert the  boolean completed state.
                // We have to note here that the boolean is not strictly set to the opposite value. If done that we can never return back to our 
                // initial state. To avoid that we use (negation i.e. denoted as "!"). This basically means that we are toggeling the state. Which
                // means we are switching the states according the changes that the state undergoes. 
                toDo.id === action.id ? { ...toDo, completed: !toDo.completed } : toDo
            );
            // Once the completed is switched to true state, it is that the todo item is done and we strike it off then update the items in the 
            // todo list using the "updateToDos" constant that we have initiated at LINE 67 and store all of them again in string format.
            localStorage.setItem("toDo", JSON.stringify(updatedTodos));
            return { todos: updatedTodos, filter: "ALL" };
        case "SET_FILTER":
            // This case will enable us to seperate the states of our todos to active, all and completed. which we are going to code in the 
            // "ListComponents" file which is inside the "components folder" and returns the results of the selected state.  
            return { ...state, filter: action.payload };
        default:
            return state;
    }
};

export default ToDoReducer;
