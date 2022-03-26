// import TodoListItem from 'components/TodoListItem';
import { ReactElement } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import TodoListItem from '../../components/TodoListItem';
// import TodoItem, { Guid } from 'scripts/classes/TodoItem';
import TodoItem, { Guid } from '../../scripts/classes/TodoItem';
// import { onDragEnd } from 'scripts/draggableUtils';
import { onDragEnd } from '../../scripts/draggableUtils';
// import { placeholderMessage } from 'scripts/utils';
import { placeholderMessage } from '../../scripts/utils';
// import { selectTodoCategories, TodosState } from 'store';
import { selectTodoCategories, TodosState } from '../../store';
import './style.scss';

interface Props {
    removeTodo: (removeId: Guid) => void;
    updateAllTodos: (updatedTodos: TodosState['todos']) => void;
}

const TodosScreen = ({ removeTodo, updateAllTodos }: Props): ReactElement => {
    const todoCategories = useSelector(selectTodoCategories);

    const onHeaderClick = (categoryId: string): void => {
        collapseCategory(categoryId);
    };

    const collapseCategory = (categoryId: string): void => {
        const categoryEl = document.querySelector(`#${categoryId}`) as HTMLDivElement;
        if (categoryEl.classList.contains('todos-screen__category--collapsed')) {
            categoryEl.classList.remove('todos-screen__category--collapsed');
        } else {
            categoryEl.classList.add('todos-screen__category--collapsed');
        }
    };

    return (
        <div className="todos-screen">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, todoCategories, updateAllTodos)}>
                {Object.entries(todoCategories).map(([categoryKey, category]) => (
                    <div key={categoryKey} className="todos-screen__category todos-screen__todos" id={categoryKey}>
                        <header className="todos-screen__category-header" onClick={() => onHeaderClick(categoryKey)}>
                            <h2>
                                {category.visibleName}
                                <span>{category.items.length}</span>
                            </h2>
                            <i className="todos-screen__icon-more" />
                        </header>
                        <Droppable droppableId={categoryKey} key={categoryKey}>
                            {(provided) => {
                                return (
                                    <div
                                        className="todos-screen__droppable-area"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {category.items.length === 0 && (
                                            <p className="todos-screen__empty-placeholder">
                                                {placeholderMessage(category.visibleName)}
                                            </p>
                                        )}
                                        {category.items.map((item: TodoItem, index: number) => {
                                            return (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <TodoListItem
                                                            todo={item}
                                                            status={category.visibleName}
                                                            draggableProps={{ provided, snapshot }}
                                                        />
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                );
                            }}
                        </Droppable>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
};

export default TodosScreen;
