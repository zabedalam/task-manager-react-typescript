import { v4 as uuidv4 } from 'uuid';
export type Guid = string;
export type Priority = 'No' | 'Low' | 'Medium' | 'High';

class TodoItem {
    public id: Guid;
    public title: string;
    public priority: Priority;
    public dueDate: Date | null;

    constructor(title: string, priority?: Priority, dueDate?: Date | null) {
        this.id = uuidv4();
        this.title = title;
        this.priority = priority || 'No';
        this.dueDate = dueDate || null;
    }
}

export default TodoItem;
