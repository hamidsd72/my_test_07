"use client";
import { useEffect } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import TaskForm from '../../components/TaskForm';
import TaskItem from '../../components/TaskItem';

export default function Home() {
    const { tasks, fetchTasks, isLoading, error } = useTaskStore();
    const { setFilters } = useTaskStore();
    const { page, totalPages, setPage } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="bg-white">
            <div className="p-8 m-12 border rounded-md border-gray-900/10">
                <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
                <h4 className="font-bold my-4">Tasks Search</h4>
                <div className="mb-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <input
                            placeholder="Search in title..."
                            onChange={(e) => setFilters({ search: e.target.value })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"

                        />
                    </div>

                    <div className="sm:col-span-2">
                        <select onChange={(e) => setFilters({ sort: e.target.value as 'asc' | 'desc' })} 
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="asc">Ascending sort</option>
                            <option value="desc">Descending sort</option>
                        </select>
                    </div>
                </div>

                <hr className="border-gray-900/10 my-6"/>
                <TaskForm />
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-red-600">Error: {error}</p>}
                <hr className="border-gray-900/10 mt-6" />
                <h4 className="font-bold mt-4">Tasks list</h4>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}

                <div className="mt-4 flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 border rounded-md ${page === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
