import {
    TOGGLE_TODO,
    REMOVE_TODO,
    MARK_COMPLETED,
    MARK_INCOMPLETE,
    FILTER_TODOS,
    MARK_ALL_COMPLETED,
    UPDATE_SEARCH_TERM,
    SET_CURRENT_USER,
    LOGOUT_USER, 
    REGISTER_USER_SUCCESS,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    FETCH_TODOS
} from './actionTypes';

const initialState = { 
    todos: [], 
    filter: 'ALL', 
    searchTerm: '',
    currentUser: {},
    activeUserId: '',
    isLoggedIn: false, 
    users: [],
    error: null
};

const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_TODOS:
            return { 
                ...state, 
                todos: action.payload 
        };
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                todos: [...state.todos, { text: action.payload.text, completed: false }],
                filter: state.filter,
                searchTerm: state.searchTerm,
        };
        case ADD_TODO_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case TOGGLE_TODO:
        return {
            ...state,
            todos: state.todos.map((todo) =>
                todo.id === action.payload.id? { ...todo, completed : !todo.completed } : todo
            ),
            filter: state.filter,
            searchTerm: state.searchTerm,
        };

        case REMOVE_TODO:
        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload.id),
            filter: state.filter,
            searchTerm: state.searchTerm,
        };

        case MARK_COMPLETED:
        return {
            ...state,
            todos: state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, completed: true } : todo
            ),
            filter: state.filter,
            searchTerm: state.searchTerm,
        };

        case MARK_INCOMPLETE:
        return {
            ...state,
            todos: state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, completed: false } : todo
            ),
            filter: state.filter,
            searchTerm: state.searchTerm,
        };

        case FILTER_TODOS:
        return {
            ...state,
            todos: state.todos,
            filter: action.payload.filter,
            searchTerm: state.searchTerm,
        };

        case UPDATE_SEARCH_TERM:
        return {
            ...state,
            todos: state.todos,
            filter: state.filter,
            searchTerm: action.payload.searchTerm,
        };

        case MARK_ALL_COMPLETED:
        return {
            ...state,
            todos: state.todos.map((todo) => ({ ...todo, completed: true })),
            filter: state.filter,
            searchTerm: state.searchTerm,
        };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                activeUserId: action.payload.id,
                currentUser: action.payload,
                users: [...state.users, action.payload]
            };
        case SET_CURRENT_USER:
                return {
                    ...state,
                    isLoggedIn: true,
                    activeUserId: action.payload.id,
                    currentUser: action.payload,
        };
        case LOGOUT_USER:
                return {
                    ...state,
                    currentUser: null,
                    isLoggedIn: false,
                };

        default:
        return state;
    }
};

export default todoReducer;