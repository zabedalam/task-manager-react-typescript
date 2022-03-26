import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";

import "./style.scss";

import { createTodoItem, removeTodoItem, TodosState, updateAllTodoItems } from "store";
import TodosScreen from "containers/TodosScreen";
import NewTodoInput from "components/NewTodoInput";
import TodoItem, { Guid } from "scripts/classes/TodoItem";

const MainScreen = (): ReactElement => {
	const dispatch = useDispatch();

	const createTodo = useCallback((newTodo: TodoItem): void => {
		dispatch(createTodoItem(newTodo));
	}, []);

	const removeTodo = useCallback((removeId: Guid): void => {
		dispatch(removeTodoItem(removeId));
	}, []);

	const updateAllTodos = useCallback((updatedTodos: TodosState["todos"]): void => {
		dispatch(updateAllTodoItems(updatedTodos));
	}, []);

	return (
		<div className="main-screen">
			<h2 className="main-screen__header">Todo's Website</h2>
			<NewTodoInput createTodo={createTodo} />
			<TodosScreen removeTodo={removeTodo} updateAllTodos={updateAllTodos} />
		</div>
	);
};

export default MainScreen;
