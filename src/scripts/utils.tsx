import { ReactElement } from 'react';
// import { OneDayInMs, TodoCategory, TodosState } from 'store';
import { OneDayInMs, TodoCategory, TodosState } from '../store';
// import TodoItem, { Guid } from './classes/TodoItem';
import TodoItem, { Guid } from './classes/TodoItem';

const prettyDate = (date: Date): string => {
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    return day + ' ' + month;
};

const formatDate = (date: Date): ReactElement => {
    const now = new Date();

    const dateWithoutHours = date.setHours(0, 0, 0, 0);
    const nowWithoutHours = now.setHours(0, 0, 0, 0);

    if (dateWithoutHours < nowWithoutHours) {
        return <span className="todo-list-item--overdue">{prettyDate(date)}</span>;
    } else if (dateWithoutHours > nowWithoutHours) {
        const difference = dateWithoutHours - nowWithoutHours;
        if (difference === OneDayInMs) {
            return <>Tomorrow</>;
        } else {
            return <>{prettyDate(date)}</>;
        }
    } else {
        return <>Today</>;
    }
};

const placeholderMessage = (category: TodoCategory): string => {
    if (category === 'Todo') {
        return 'Nothing here!';
    } else if (category === 'Doing') {
        return 'Empty list!';
    } else if (category === 'Done') {
        return 'Nothing!';
    } else {
        throw new Error('Not implemented');
    }
};

const getTodoFromCategories = (todoCategories: TodosState['todos'], todoId: Guid): TodoItem | null => {
    let foundTodo: TodoItem | null = null;
    for (const key in todoCategories) {
        const keyTyped = key as keyof TodosState['todos'];
        const category = todoCategories[keyTyped];

        foundTodo = category.items.find(({ id }) => id === todoId) || null;
        if (foundTodo) break;
    }
    return foundTodo;
};
export { formatDate, placeholderMessage, getTodoFromCategories };
