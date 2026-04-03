import type { Todo } from "./types";

export class TodoApp {
    private todos: Todo[] = [];
    private input: HTMLInputElement | null;
    private list: HTMLElement | null;

    constructor() {
        this.input = document.querySelector("input");
        this.list = document.getElementById("todo-list");
        const form = document.getElementById("todo-form");

        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = this.input?.value.trim() ?? "";
            if (!text) return;
            this.add({ id: crypto.randomUUID(), text, done: false });
            if (this.input) this.input.value = "";
        });
    }

    private add(item: Todo) {
        this.todos.push(item);
        this.render();
    }

    private render() {
        if (!this.list) return;
        this.list.innerHTML = '';
        this.todos.forEach(todo => {
            const li = document.createElement("li");
            li.textContent = todo.text;
            this.list?.appendChild(li);
        })
    }
}