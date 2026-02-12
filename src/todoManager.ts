import type { Todo, Priority, FilterType } from "./types.js";

class TodoManager {
    private todos: Todo[];
    private nextId: number;

    constructor() {
        this.todos = [];
        this.nextId = 1;
    }

    public add(title: string, priority: Priority): Todo {
        const newTodo: Todo = {
            id: this.nextId++,
            title,
            completed: false,
            priority,
            createdAt: new Date(),
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    public list(filter: FilterType): Todo[] {
        if (filter === "Active") {
            const result = this.todos.filter((todos) => todos.completed === false);
            return result;
        } else if (filter === "Completed") {
            const result = this.todos.filter((todos) => todos.completed === true);
            return result;
        } else {
            return this.todos;
        }
    }
    public toggle(id: number): Todo | undefined {
        
    }
    public removeTodo(id: number): void {

    }

}

export default TodoManager;