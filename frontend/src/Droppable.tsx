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
    border: isOver ? "2px solid #4caf50" : "2px solid #ccc", // Change border style and color
    backgroundColor: isOver ? "#e8f5e9" : "#fafafa", // Light green background when over
    color: isOver ? "#388e3c" : "#212121", // Darker green text when over
    boxShadow: isOver
      ? "0 4px 8px rgba(0, 0, 0, 0.2)"
      : "0 2px 4px rgba(0, 0, 0, 0.1)", // Shadow change on hover
    transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s", // Smooth transition
    borderRadius: "8px", // Rounded corners
    padding: "16px", // Consistent padding
    minHeight: "100px", // Minimum height for better visual consistency
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div ref={setNodeRef} style={style} className={`relative ${className}`}>
      {children}
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            borderRadius: "8px",
            background: "rgba(76, 175, 80, 0.1)", // Light green overlay for visual feedback
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
}
