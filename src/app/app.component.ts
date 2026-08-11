import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number;
}

type Filter = 'all' | 'active' | 'completed';

const STORAGE_KEY = 'todo-angular.todos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todos = signal<Todo[]>(this.loadFromStorage());
  filter = signal<Filter>('all');
  newTitle = '';

  editingId = signal<number | null>(null);
  editingTitle = '';

  filteredTodos = computed(() => {
    const list = this.todos();
    const f = this.filter();
    if (f === 'active') return list.filter((t) => !t.completed);
    if (f === 'completed') return list.filter((t) => t.completed);
    return list;
  });

  remainingCount = computed(() => this.todos().filter((t) => !t.completed).length);
  completedCount = computed(() => this.todos().filter((t) => t.completed).length);

  addTodo(): void {
    const title = this.newTitle.trim();
    if (!title) return;

    const todo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: Date.now(),
    };

    this.todos.update((list) => [todo, ...list]);
    this.newTitle = '';
    this.persist();
  }

  toggleTodo(id: number): void {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    this.persist();
  }

  removeTodo(id: number): void {
    this.todos.update((list) => list.filter((t) => t.id !== id));
    this.persist();
  }

  clearCompleted(): void {
    this.todos.update((list) => list.filter((t) => !t.completed));
    this.persist();
  }

  toggleAll(): void {
    const shouldComplete = this.remainingCount() > 0;
    this.todos.update((list) => list.map((t) => ({ ...t, completed: shouldComplete })));
    this.persist();
  }

  setFilter(f: Filter): void {
    this.filter.set(f);
  }

  startEdit(todo: Todo): void {
    this.editingId.set(todo.id);
    this.editingTitle = todo.title;
  }

  saveEdit(id: number): void {
    const title = this.editingTitle.trim();
    if (!title) {
      this.removeTodo(id);
    } else {
      this.todos.update((list) =>
        list.map((t) => (t.id === id ? { ...t, title } : t))
      );
      this.persist();
    }
    this.editingId.set(null);
  }

  cancelEdit(): void {
    this.editingId.set(null);
  }

  trackById(_index: number, todo: Todo): number {
    return todo.id;
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos()));
  }

  private loadFromStorage(): Todo[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Todo[]) : [];
    } catch {
      return [];
    }
  }
}
