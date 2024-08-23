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
import { useState } from "react";
import axios from "axios";
import { DatePicker } from "./ui/datepicker";
import React from "react";

export function EditTask({
  container,
  title,
  description,
  taskId,
}: {
  container: string;
  title: string;
  description: string;
  taskId: any;
}) {
  const [newtitle, setNewTitle] = useState(title);
  const [newdescription, setNewDescription] = useState(description);
  const [date, setDate] = React.useState<Date>();

  const handleEdit = async (container: string) => {
    try {
      if (title === "" || description == "") {
        window.alert("title  and description can not be empty");
        return;
      }
      const res = await axios.put(
        `https://kanban-board-nu-olive.vercel.app/editTask`,
        {
          title: newtitle,
          description: newdescription,
          container,
          taskId,
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
          className="bg-white hover:bg-slate-400"
          size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-blue-700 hover:mt-1 hover:ml-1">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task and add to {container}</DialogTitle>
          <DialogDescription>
            Provide the new title ,description and date for your task and the
            eddited task will be replaced with the current task
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={newtitle}
              placeholder="Todo Title"
              className="col-span-3"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea
              id="username"
              value={newdescription}
              placeholder="Todo Description"
              className="col-span-3 w-full  px-4 py-2 "
              onChange={(e) => {
                setNewDescription(e.target.value);
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
              handleEdit(container);
            }}>
            Edit Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
