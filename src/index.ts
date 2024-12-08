type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

const generateUUIDv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

const addListItem = (task: Task) => {
  if (!list) {
    console.error("List element not found");
    return;
  }
  const item: HTMLLIElement = document.createElement("li");
  const label: HTMLLabelElement = document.createElement("label");
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  label.append(checkbox, task.title);
  item.append(label);
  list.append(item);
};

const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
};

const loadTasks = (): Task[] => {
  const taskJson = localStorage.getItem("TASKS");
  if (taskJson == null) return [];
  try {
    const parsedTasks = JSON.parse(taskJson);
    return Array.isArray(parsedTasks)
      ? parsedTasks.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }))
      : [];
  } catch {
    return [];
  }
};

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: generateUUIDv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  addListItem(newTask);

  saveTasks();

  input.value = "";
});
