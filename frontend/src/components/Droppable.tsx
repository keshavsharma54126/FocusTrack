import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function Droppable({ id, children, className }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    border: isOver ? "2px solid #4caf50" : "2px dashed #ccc", // Highlight border when item is over
    backgroundColor: isOver ? "#e8f5e9" : "#fafafa", // Change background color when item is over
    color: isOver ? "#4caf50" : "#000", // Change text color when item is over
    transition: "border-color 0.3s ease, background-color 0.3s ease", // Smooth transitions
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-lg shadow-md flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
