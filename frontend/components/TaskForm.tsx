import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export default function TaskForm() {
    const { addTask } = useTaskStore();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTask({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="my-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">Task title</label>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                />
            </div>

            <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">Task description</label>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>

            <div className="sm:col-span-3">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add new task</button>
            </div>
        </form>
    );
}