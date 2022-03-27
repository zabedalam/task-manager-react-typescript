import { DropResult } from 'react-beautiful-dnd';
import { TodosState } from '../store';

const onDragEnd = (
    result: DropResult,
    columns: TodosState['todos'],
    setColumns: (todosState: TodosState['todos']) => void,
): void => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceId = source.droppableId as keyof TodosState['todos'];
    const destinationId = destination.droppableId as keyof TodosState['todos'];

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[sourceId];
        const destColumn = columns[destinationId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
    } else {
        const column = columns[destinationId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};

export { onDragEnd };
