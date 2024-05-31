import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { filteredTodosSelector } from '../redux/selectors'

const TodoList = () => {
    const filteredTodos = useSelector(filteredTodosSelector);

    const currentPage = useSelector(state => state.currentPage);
    const limit = useSelector(state => state.limitTodos);

    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    
    const todosToDisplay = filteredTodos.slice(startIndex, endIndex); 


return (
        <ul>
            <li className="my-2 text-xl italic">All Your Notes Here...</li>
            {todosToDisplay.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} index={index} />
            ))}
        </ul>
    );
};

export default TodoList;