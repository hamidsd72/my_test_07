import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { useTaskStore } from '../store/useTaskStore';

jest.mock('../store/useTaskStore');

describe('TaskForm Component', () => {
    it('renders input fields and button', () => {
        (useTaskStore as jest.Mock).mockReturnValue({ addTask: jest.fn() });

        render(<TaskForm />);
        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
        // expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('calls addTask on form submit', () => {
        const mockAddTask = jest.fn();
        (useTaskStore as jest.Mock).mockReturnValue({ addTask: mockAddTask });

        render(<TaskForm />);

        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Task' } });
        fireEvent.submit(screen.getByRole('button', { name: /add/i }));

        expect(mockAddTask).toHaveBeenCalledWith({ title: 'Test Task', description: '' });
    });
});