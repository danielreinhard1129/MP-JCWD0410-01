// components/ToDoList.tsx

import { FC } from 'react';

interface Task {
  event: string;
  members: string[];
  budget: string;
  completion: number;
}

const tasks: Task[] = [
  { event: 'Create Voucher Discounts', members: ['John Doe', 'Jane Smith'], budget: '$500', completion: 60 },
  { event: 'Edit Summer Event', members: ['Alice', 'Bob'], budget: '$3,000', completion: 40 },
  { event: 'Launch New Event', members: ['Tom', 'Jerry'], budget: 'Not set', completion: 100 },
  { event: 'Transaction Overview', members: ['Kate', 'Leo'], budget: '$5,000', completion: 90 },
  { event: 'View Basic Statistics', members: ['Mike', 'Rachel'], budget: '$1,000', completion: 70 },
];

const ToDoList: FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dashboard Access: To-Do List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">Event/Task</th>
            <th className="py-2 px-4 text-left">Members</th>
            <th className="py-2 px-4 text-left">Budget</th>
            <th className="py-2 px-4 text-left">Completion</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{task.event}</td>
              <td className="py-2 px-4">
                <div className="flex">
                  {task.members.map((member, idx) => (
                    <img
                      key={idx}
                      src={`https://ui-avatars.com/api/?name=${member}`}
                      alt={member}
                      className="w-6 h-6 rounded-full border-2 border-white -ml-2"
                    />
                  ))}
                </div>
              </td>
              <td className="py-2 px-4">{task.budget}</td>
              <td className="py-2 px-4">
                <div className="flex items-center">
                  <span className="mr-2">{task.completion}%</span>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-blue-500 h-2 rounded-full`}
                      style={{ width: `${task.completion}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
