import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function Draggable({ id, children, className }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 1000 : "auto", // Ensure the draggable is on top while dragging
        transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transitions
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl active:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}>
      {children}
    </div>
  );
}
