import React from "react";
import { format } from "date-fns";

interface CardProps {
  title: string;
  description: string;
  dueDate: Date;
  taskId: string;
  container: string;
}

const TaskCard: React.FC<CardProps> = ({
  title,
  description,
  dueDate,
  taskId,
  container,
}: {
  title: string;
  description: string;
  dueDate: Date;
  taskId: string;
  container: string;
}) => {
  const containerColors: { [key: string]: string } = {
    Todo: "bg-red-100 border-red-200",
    "In Progress": "bg-yellow-100 border-yellow-200",
    Completed: "bg-green-100 border-green-200",
  };
  const containerClass = containerColors[container];

  return (
    <div
      className={`rounded-lg border shadow-md ${containerClass} p-4 hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex justify-between items-start mb-4 ">
        <div className="text-xl font-semibold text-gray-800">
          {title.toUpperCase()}
        </div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="text-gray-600 text-sm">
        Due Date: {format(new Date(dueDate), "d MMMM, yyyy")}
      </div>
    </div>
  );
};

export default TaskCard;
