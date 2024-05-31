import { createSelector } from 'reselect';

const selectUsers = (state) => state.users;

export const selectUsersMemoized = createSelector(
    [selectUsers],
    (users) => users
);



const selectTodos = (state) => state.todos;
const selectFilter = (state) => state.filter;
const selectSearchTerm = (state) => state.searchTerm;

export const filteredTodosSelector = createSelector(
    [selectTodos, selectFilter, selectSearchTerm],
    (todos, filter, searchTerm) => {
        const lowercasedSearchTerm = searchTerm ? searchTerm.toLowerCase() : '';

        return todos.filter((todo) => {
            const matchesFilter =
                (filter === 'COMPLETED' && todo.completed) ||
                (filter === 'INCOMPLETE' && !todo.completed) ||
                filter === 'ALL';
                
            const matchesSearch = lowercasedSearchTerm
                ? (todo.todoText && todo.todoText.toLowerCase().includes(lowercasedSearchTerm))
                : true;

            return matchesFilter && matchesSearch;
        });
    }
);