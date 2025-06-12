import { create } from 'zustand';
import { toast } from 'sonner';
const { BASEURL, BASEAPI } = require('../config.js');

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  filters: {
    search: string;
    sort: 'asc' | 'desc';
  };
  setFilters: (filters: Partial<TaskStore['filters']>) => void;
  fetchTasks: () => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (id: number, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  page: 1,
  totalPages: 1,

  setPage: (page) => {
    set({ page });
    get().fetchTasks();
  },

  tasks: [],
  isLoading: false,
  error: null,
  
  filters: {
    search: '',
    sort: 'asc',
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
    get().fetchTasks();
  },

  fetchTasks: async () => {
    const { search, sort } = get().filters;
    const page = get().page;
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${BASEAPI}/tasks?page=${page}&search=${search}&sort=${sort}`);
      if (!res.ok) toast.error('Failed to fetch tasks');
      const json = await res.json();
      set({
        tasks: json.data,
        totalPages: json.last_page,
      });
    } catch (err: any) {
      toast.error(err.message)
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (task) => {
    try {
      if (task.title?.length) {
        const res = await fetch(`${BASEAPI}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
        if (!res.ok) throw new Error('Failed to add task');
        await get().fetchTasks();
      } else {
        toast.error('title is required')
      }  
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  updateTask: async (id, task) => {
    try {
      if (task.title?.length) {
        const res = await fetch(`${BASEAPI}/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
        if (!res.ok) throw new Error('Failed to update task');
        await get().fetchTasks();
      } else {
        toast.error('title is required')
      }        
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteTask: async (id) => {
    try {
      const res = await fetch(`${BASEAPI}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) 
        toast.error('Failed to delete task');
      await get().fetchTasks();
    } catch (err: any) {
      toast.error(err.message);
      set({ error: err.message });
    }
  },
}));