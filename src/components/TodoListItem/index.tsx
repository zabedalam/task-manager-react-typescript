import { ReactElement } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import TodoItem from "scripts/classes/TodoItem";
import { formatDate } from "scripts/utils";
import { changeTodoItemCategory, removeTodoItem, TodoCategory } from "store";

import "./style.scss";

interface Props {
	todo: TodoItem;
	status: TodoCategory;
	draggableProps: {
		provided: DraggableProvided;
		snapshot: DraggableStateSnapshot;
	};
}

const TodoListItem = ({ todo, status, draggableProps: { provided } }: Props): ReactElement => {
	const dispatch = useDispatch();

	const classList = [
		"todo-list-item",
		`todo-list-item--type-${status}`,
		`todo-list-item--priority-${todo.priority}`,
	].join(" ");

	const onCheckboxClick = (): void => {
		const sourceCategory = status;
		const destinationCategory = status === "Done" ? "Todo" : "Done";
		dispatch(changeTodoItemCategory({ todo, sourceCategory, destinationCategory }));
	};

	const onRemoveClick = (): void => {
		dispatch(removeTodoItem(todo.id));
	};

	return (
		<div
			className={classList}
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			style={{ ...provided.draggableProps.style }}
		>
			<div className="todo-list-item__row">
				<div className="todo-list-item__group">
					<i className="todo-list-item__checkbox" onClick={onCheckboxClick}>
						<i className="todo-list-item__icon-check" />
					</i>
					<span className="todo-list-item__title">{todo.title}</span>
				</div>
				<i className="todo-list-item__icon-tune" data-tip={todo.id} />
				<i className="todo-list-item__icon-remove" onClick={onRemoveClick} />
			</div>
			{todo.dueDate && (
				<div className="todo-list-item__row">
					<p className="todo-list-item__due-date">{formatDate(todo.dueDate)}</p>
				</div>
			)}
		</div>
	);
};

export default TodoListItem;
