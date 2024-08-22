import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker } from "./ui/datepicker";
import React from "react";

export function AddTask({
  container,
  userId,
}: {
  container: string;
  userId: any;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = React.useState<Date>();

  const handleSubmit = async (container: string) => {
    try {
      if (title === "" || description == "") {
        window.alert("title  and description can not be empty");
        return;
      }
      const res = await axios.post(
        `https://kanban-board-nu-olive.vercel.app/addtask`,
        {
          title,
          description,
          container,
          userId,
          date,
        }
      );
      console.log(res.data);
      window.location.reload();
    } catch (e) {
      console.log("failed to submit task to database");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-green-500 hover:bg-green-300"
          size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task to {container}</DialogTitle>
          <DialogDescription>
            This task will be added to your {container} box, you can manage it
            by dragging across containers
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              placeholder="Todo Title"
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea
              id="username"
              value={description}
              placeholder="Todo Description"
              className="col-span-3 w-full  px-4 py-2 "
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row gap-4 items-center justify-center">
            <Label>Due Date</Label>
            <DatePicker date={date} setDate={setDate} />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              handleSubmit(container);
            }}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
