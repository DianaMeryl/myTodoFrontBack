import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { filteredTodosSelector } from '../redux/selectors'

const TodoList = () => {
    const filteredTodos = useSelector(filteredTodosSelector);

    return (
        <ul>
            <li className="my-2 text-xl italic">All Your Notes Here...</li>
            {filteredTodos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} index={index} />
            ))}
        </ul>
    );
};

export default TodoList;