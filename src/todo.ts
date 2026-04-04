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

        const saved = localStorage.getItem("todos");
        if (saved) {
            this.todos = JSON.parse(saved);
            this.render();
        }
    }

    private add(item: Todo) {
        this.todos.push(item);
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.render();
    }

    private toggle(id: string) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.done = !todo.done;
        }
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.render();
    }

    private delete(id: string) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            this.todos = this.todos.filter(elem => elem != todo);
        }
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.render();
    }

    private render() {
        if (!this.list) return;
        this.list.innerHTML = "";
        this.todos.forEach(todo => {
            const li = document.createElement("li");
            li.className =
                "group flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md cursor-pointer select-none";
            li.addEventListener("click", () => this.toggle(todo.id));

            const checkbox = document.createElement("span");
            checkbox.className = todo.done
                ? "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-500 text-white text-xs"
                : "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition group-hover:border-blue-400";
            checkbox.textContent = todo.done ? "✓" : "";

            const label = document.createElement("span");
            label.className = todo.done
                ? "flex-1 text-sm text-gray-400 line-through"
                : "flex-1 text-sm text-gray-700";
            label.textContent = todo.text;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "削除";
            deleteBtn.className =
                "ml-auto rounded px-2 py-1 text-xs text-gray-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 cursor-pointer";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.delete(todo.id);
            });

            li.append(checkbox, label, deleteBtn);
            this.list?.appendChild(li);
        });
    }
}