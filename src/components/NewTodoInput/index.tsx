import { FormEvent, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";

import { selectNewTodo, updateNewTodoItem } from "store";
import TodoItem from "scripts/classes/TodoItem";

interface Props {
	createTodo: (newTodo: TodoItem) => void;
}

const NewTodoInput = ({ createTodo }: Props): ReactElement => {
	const newTodo = useSelector(selectNewTodo);
	const dispatch = useDispatch();

	const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (newTodo.title) {
			createTodo(newTodo);
			resetNewTodo();
		}
	};

	const setNewTodo = (newTodo: TodoItem): void => {
		dispatch(updateNewTodoItem(newTodo));
	};

	const resetNewTodo = (): void => {
		setNewTodo(new TodoItem(""));
	};

	return (
		<form className="new-todo__form" onSubmit={onFormSubmit}>
			<input
				type="text"
				name="newTodo"
				className="new-todo__input"
				value={newTodo.title}
				onChange={({ currentTarget: { value } }) => setNewTodo({ ...newTodo, title: value })}
				placeholder="Add a task..."
			/>
			<button data-tip="New Todo" type="button" className="new-todo__icon new-todo__icon-tune" />
			<button type="submit" className="new-todo__icon new-todo__icon-send" />
		</form>
	);
};

export default NewTodoInput;
