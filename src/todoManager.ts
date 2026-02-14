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
            const result = this.todos.filter((todo) => !todo.completed);
            return result;
        } else if (filter === "Completed") {
            const result = this.todos.filter((todo) => todo.completed);
            return result;
        } else {
            return this.todos;
        }
    }
    public toggle(id: number): Todo | undefined {
        const result = this.todos.find((todo) => todo.id === id)
        if (result) {
            result.completed = !result.completed;
        }
        return result;
    }
    public removeTodo(id: number): void {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

}

export default TodoManager;