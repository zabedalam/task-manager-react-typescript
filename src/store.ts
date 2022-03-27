import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InternalData } from './components/TooltipContent';
import TodoItem, { Guid } from './scripts/classes/TodoItem';

export type TodoCategory = 'Todo' | 'Doing' | 'Done';

//TODO: Change data structure to array of all todos + map for Drag and Drop
export interface TodosState {
    todos: {
        todo: {
            visibleName: 'Todo';
            items: TodoItem[];
        };
        doing: {
            visibleName: 'Doing';
            items: TodoItem[];
        };
        done: {
            visibleName: 'Done';
            items: TodoItem[];
        };
    };
    newTodo: TodoItem;
}

export const OneDayInMs = 24 * 60 * 60 * 1000;

const DateToday = new Date();
const DateTomorrow = new Date(DateToday.getTime() + OneDayInMs);
const DateYesterday = new Date(DateToday.getTime() - OneDayInMs);
const DateInWeek = new Date(DateToday.getTime() + 7 * OneDayInMs);

const initialState: TodosState = {
    todos: {
        todo: {
            visibleName: 'Todo',
            items: [
                new TodoItem('Write email series', 'Medium'),
                new TodoItem('Wireframe landing page', 'High', DateTomorrow),
            ],
        },
        doing: {
            visibleName: 'Doing',
            items: [
                new TodoItem('Write blog post', 'No', DateInWeek),
                new TodoItem('Sketch for demo', 'No', DateYesterday),
            ],
        },
        done: {
            visibleName: 'Done',
            items: [new TodoItem('Design email campaigns')],
        },
    },
    newTodo: new TodoItem(''),
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        createTodoItem: (state, action: PayloadAction<TodoItem>) => {
            state.todos.todo.items = [action.payload, ...state.todos.todo.items];
        },
        removeTodoItem: (state, action: PayloadAction<string>) => {
            state.todos.todo.items = state.todos.todo.items.filter(({ id }) => id !== action.payload);
            state.todos.doing.items = state.todos.doing.items.filter(({ id }) => id !== action.payload);
            state.todos.done.items = state.todos.done.items.filter(({ id }) => id !== action.payload);
        },
        updateTodoItem: (state, action: PayloadAction<{ todoId: Guid; internalData: InternalData }>) => {
            const {
                payload: { todoId, internalData },
            } = action;

            let todoCategoryKey: keyof TodosState['todos'] | null = null;
            let todoIndex: number | null = null;

            for (const key in state.todos) {
                const keyTyped = key as keyof TodosState['todos'];
                const category = state.todos[keyTyped];

                const foundTodo = category.items.find(({ id }) => id === todoId);
                if (foundTodo) {
                    todoCategoryKey = keyTyped;
                    todoIndex = category.items.indexOf(foundTodo);
                    break;
                }
            }

            if (todoCategoryKey !== null && todoIndex !== null) {
                const todoItem = state.todos[todoCategoryKey].items[todoIndex];
                state.todos[todoCategoryKey].items[todoIndex] = {
                    ...todoItem,
                    priority: internalData.priority,
                    dueDate: internalData.dueDate,
                };
            }
        },
        changeTodoItemCategory: (
            state,
            action: PayloadAction<{ todo: TodoItem; sourceCategory: TodoCategory; destinationCategory: TodoCategory }>,
        ) => {
            const { todo, sourceCategory, destinationCategory } = action.payload;
            const source = sourceCategory.toLowerCase() as keyof TodosState['todos'];
            const destination = destinationCategory.toLowerCase() as keyof TodosState['todos'];

            state.todos[source].items = state.todos[source].items.filter(({ id }) => id !== todo.id);
            state.todos[destination].items = [todo, ...state.todos[destination].items];
        },
        updateAllTodoItems: (state, action: PayloadAction<TodosState['todos']>) => {
            state.todos = action.payload;
        },
        updateNewTodoItem: (state, action: PayloadAction<TodoItem>) => {
            state.newTodo = action.payload;
        },
    },
});

//TODO: Bind data to localStorage
const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const {
    createTodoItem,
    removeTodoItem,
    updateTodoItem,
    changeTodoItemCategory,
    updateAllTodoItems,
    updateNewTodoItem,
} = todosSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export const selectTodoCategories = (state: RootState): TodosState['todos'] => state.todos.todos;
export const selectNewTodo = (state: RootState): TodosState['newTodo'] => state.todos.newTodo;

export default store;
