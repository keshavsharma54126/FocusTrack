import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { addDays, endOfDay, startOfDay } from "date-fns";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
}
const Reminder = ({ tasks }: { tasks: Task[] }) => {
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [weekTasks, setWeekTasks] = useState<Task[]>([]);

  useEffect(() => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const weekEnd = addDays(todayStart, 7);

    setTodayTasks(
      tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= todayStart && dueDate <= todayEnd;
      })
    );

    setWeekTasks(
      tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate > todayEnd && dueDate <= weekEnd;
      })
    );
  }, [tasks]);

  return (
    <Card className="w-full bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-800">
          Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-red-600">Due Today:</h3>
            <ul className="list-disc list-inside space-y-1">
              {todayTasks.map((task) => (
                <li key={task.id} className="text-gray-800">
                  {task.title}
                </li>
              ))}
            </ul>
            {todayTasks.length === 0 && (
              <p className="text-gray-600 italic">No tasks due today</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-orange-600">
              Due This Week:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {weekTasks.map((task) => (
                <li key={task.id} className="text-gray-800">
                  {task.title}
                </li>
              ))}
            </ul>
            {weekTasks.length === 0 && (
              <p className="text-gray-600 italic">No tasks due this week</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reminder;
