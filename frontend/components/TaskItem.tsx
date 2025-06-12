import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export default function TaskItem({ task }: { task: any }) {
    const { updateTask, deleteTask } = useTaskStore();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [completed, setCompleted] = useState(task.completed);
    const [description, setDescription] = useState(task.description);

    const handleUpdate = async () => {
        await updateTask(task.id, { title, completed, description });
        setIsEditing(false);
    };

    return (
        <div className="border rounded-md border-gray-900/10 p-4 mb-2 mt-6">

            {isEditing ? (
                <div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-4">
                        <div className="sm:col-span-3">
                            <input value={title} onChange={(e) => setTitle(e.target.value)} 
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                        <div className="sm:col-span-3">
                            <input value={description ? description  : ''} onChange={(e) => setDescription(e.target.value)} 
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                        <div className="sm:col-span-3">
                            <div className="flex gap-3">
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input type="checkbox" onChange={() => setCompleted(!completed)} checked={completed ? 'checked' : ''}
                                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                                    </div>
                                </div>
                                <div className="text-sm/6">
                                    <label className="font-medium text-gray-900">completed</label>
                                    <p className="text-gray-500">Indicates the status of the item.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <button onClick={handleUpdate} className="bg-green-500 rounded-md text-white px-2 py-1 mr-1">Save</button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-500 rounded-md text-white px-2 py-1">Cancel</button>
                </div>
            ) : (
                <div>
                    <div className="pr-6 pb-2 flex-initial">{task.title}</div>
                    <div className="pr-6 pb-2 flex-initial">{task.description}</div>

                    <div className="mt-1">
                        <button onClick={() => setIsEditing(true)} className="bg-yellow-500 rounded-md text-white px-2 py-1 mr-2">Edit</button>
                        <button onClick={() => deleteTask(task.id)} className="bg-red-500 rounded-md text-white px-2 py-1">Delete</button>
                    </div>
                </div>
            )}  
        </div>
    );
}