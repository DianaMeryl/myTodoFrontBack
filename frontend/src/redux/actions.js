import {
    ADD_TODO_SUCCESS,
    UPDATE_TODOS,
    ADD_TODO_FAILURE,
    REMOVE_TODO,
    MARK_COMPLETED,
    MARK_INCOMPLETE,
    FILTER_TODOS,
    MARK_ALL_COMPLETED,
    UPDATE_SEARCH_TERM,
    SET_CURRENT_USER, 
    LOGOUT_USER, 
    REGISTER_USER_SUCCESS,
    FETCH_TODOS
} from './actionTypes';

export const fetchTodos = (todos) => ({
    type: FETCH_TODOS,
    payload: todos
});

export const updateTodos = (todos) => {
    return {
        type: UPDATE_TODOS,
        payload: todos
    }
}

export const addTodoSuccess = (todo) => {
    return {
        type: ADD_TODO_SUCCESS,
        payload: todo,
    };
};

export const addTodoFailure = (error) => ({
    type: ADD_TODO_FAILURE,
    payload: error
});

export const removeTodo = (id) => ({
type: REMOVE_TODO,
payload:  { id },
});

export const markCompleted = (id) => ({
type: MARK_COMPLETED,
payload:   { id } ,
});

export const markIncomplete = (id) => ({
type: MARK_INCOMPLETE,
payload: { id },
});

export const filterTodos = (filter) => ({
type: FILTER_TODOS,
payload: { filter },
});

export const markAllCompleted = () => ({
type: MARK_ALL_COMPLETED,
});

export const updateSearchTerm = (searchTerm) => ({
type: UPDATE_SEARCH_TERM,
payload: { searchTerm },
});

export const setCurrentUser = (user) => { 
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    };
};

export const registerUserSuccess = (userData) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: userData
    }
};