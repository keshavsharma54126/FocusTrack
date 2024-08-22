import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import { AddTask } from "./AddTask";
import axios from "axios";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface MainComponentProps {
  userId: number;
}

export default function MainComponent({ userId }: MainComponentProps) {
  const containers: string[] = ["Todo", "In Progress", "Completed"];
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const res = await axios.get<Task[]>("http://localhost:3000/gettasks");
      setTasks(res.data);
    } catch (e) {
      console.log("could not retrieve tasks", e);
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    setActiveTask(tasks.find((task) => task.id === active.id) || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = tasks.find((task) => task.id === active.id)?.status;
    const overContainer = over.data?.current?.sortable?.containerId || over.id;

    if (activeContainer !== overContainer) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === over.id);

        return arrayMove(tasks, activeIndex, overIndex).map((task) =>
          task.id === active.id
            ? { ...task, status: overContainer as string }
            : task
        );
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = tasks.find((task) => task.id === active.id)?.status;
    const overContainer = over.data?.current?.sortable?.containerId || over.id;

    if (activeContainer !== overContainer) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === over.id);

        return arrayMove(tasks, activeIndex, overIndex).map((task) =>
          task.id === active.id
            ? { ...task, status: overContainer as string }
            : task
        );
      });
    } else {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);

      if (oldIndex !== newIndex) {
        setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
      }
    }

    setActiveId(null);
    setActiveTask(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}>
      <div className="flex items-center mt-8 space-y-6 ">
        <div className="flex flex-col lg:flex-row gap-6">
          {containers.map((container) => (
            <div
              key={container}
              className="flex justify-center items-center sm:w-screen lg:w-full overflow-hidden relative">
              <div className="w-full sm:w-80 md:w-96 p-4 border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg shadow-md transition-colors duration-300 hover:bg-gray-200">
                <div className="flex items-center justify-between mb-4 ">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {container}
                  </h2>
                  <AddTask container={container} userId={userId} />
                </div>
                <Droppable
                  id={container}
                  className="flex flex-col gap-2 min-h-[200px] p-2 overflow-hidden">
                  <SortableContext
                    items={tasks
                      .filter((t) => t.status === container)
                      .map((t) => t.id)}
                    strategy={verticalListSortingStrategy}>
                    {tasks
                      .filter((t) => t.status === container)
                      .map((t) => (
                        <Draggable
                          key={t.id}
                          id={t.id}
                          className="bg-blue-500 text-black p-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 w-full">
                          <div className="">
                            <div className="text-xl font-bold">
                              {t.title.toUpperCase()}
                            </div>
                            <div>{t.description}</div>
                          </div>
                        </Draggable>
                      ))}
                  </SortableContext>
                </Droppable>
              </div>
            </div>
          ))}
          <DragOverlay className="fixed z-9999 transform">
            {activeTask ? (
              <div className="bg-blue-500 text-black p-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600">
                <div className="text-xl font-bold">
                  {activeTask.title.toUpperCase()}
                </div>
                <div>{activeTask.description}</div>
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  );
}
