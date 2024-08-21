import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import { Button } from "./ui/button";

export default function MainComponent() {
  const containers = ["Todo", "In Progress", "Completed"];
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragEnd = (event: any) => {
    const { over } = event;
    setDraggedId(over ? over.id : null);
  };

  const draggableMarkup = (
    <Draggable
      id="draggable"
      className="bg-blue-500 text-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600">
      Drag me
    </Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex  items-center mt-8 space-y-6  ">
        <div className="flex sm:flex-wrap lg:flex-row gap-6 justify-center">
          {containers.map((container) => (
            <div
              key={container}
              className="w-full sm:w-80 md:w-96 p-4 border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg shadow-md transition-colors duration-300 hover:bg-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {container}
                </h2>
                <Button
                  onClick={() => console.log(`Add task to ${container}`)}
                  className="bg-green-500 text-white hover:bg-green-600">
                  Add Task
                </Button>
              </div>
              <Droppable
                id={container}
                className="flex flex-col gap-2 min-h-[200px] p-2">
                {draggedId === container ? draggableMarkup : "Drop here"}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DndContext>
  );
}
