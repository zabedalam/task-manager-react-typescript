// import NewTodoInput from 'components/NewTodoInput';
import { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import NewTodoInput from '../../components/NewTodoInput';
// import TodosScreen from 'containers/TodosScreen';
import TodosScreen from '../../containers/TodosScreen';
// import TodoItem, { Guid } from 'scripts/classes/TodoItem';
import TodoItem, { Guid } from '../../scripts/classes/TodoItem';
// import { createTodoItem, removeTodoItem, TodosState, updateAllTodoItems } from 'store';
import { createTodoItem, removeTodoItem, TodosState, updateAllTodoItems } from '../../store';
import './style.scss';

const MainScreen = (): ReactElement => {
    const dispatch = useDispatch();

    const createTodo = useCallback((newTodo: TodoItem): void => {
        dispatch(createTodoItem(newTodo));
    }, []);

    const removeTodo = useCallback((removeId: Guid): void => {
        dispatch(removeTodoItem(removeId));
    }, []);

    const updateAllTodos = useCallback((updatedTodos: TodosState['todos']): void => {
        dispatch(updateAllTodoItems(updatedTodos));
    }, []);

    return (
        <div className="main-screen">
            <h2 className="main-screen__header">Task Manager</h2>
            <div className="main-screen__head">
                <NewTodoInput createTodo={createTodo} />
            </div>

            <TodosScreen removeTodo={removeTodo} updateAllTodos={updateAllTodos} />
        </div>
    );
};

export default MainScreen;
