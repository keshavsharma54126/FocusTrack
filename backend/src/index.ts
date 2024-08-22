import express from "express";
import { prisma } from "./db";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.post("/signup", async (req, res) => {
  try {
    const { name, imageUrl, email, googleId } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        imageUrl,
        googleId,
      },
    });
    return res.status(200).json(user);
  } catch (e) {
    console.error("errow while adding user to the  database", e);
    return res.status(400).json({ message: "failed to add user to  database" });
  }
});

app.post("/addtask", async (req, res) => {
  try {
    const { title, description, userId, container, date } = req.body;
    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        userId,
        status: container,
        dueDate: date,
      },
    });
    return res.status(200).json(task);
  } catch (e) {
    console.error("errow while addding task");
    return res.status(400).json({ message: "failed  to add task " });
  }
});

app.get("/gettasks/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const tasks = await prisma.tasks.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json(tasks);
  } catch (e) {
    console.error("error while getting tasks");
    return res.status(400).json({ message: "failed to get all  the  tasks" });
  }
});

app.delete("/deletetask/:taskId", async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    console.log("deleted");
    const task = await prisma.tasks.delete({
      where: {
        id: taskId,
      },
    });
    return res.status(200).json(task);
  } catch (e) {
    return res
      .status(400)
      .json({ message: "error while deleting task on backend" });
  }
});

app.put("/editTask", async (req, res) => {
  const { title, description, date, taskId } = req.body;
  try {
    const taskIdParsed = parseInt(taskId, 10);

    const existingTask = await prisma.tasks.findUnique({
      where: {
        id: taskIdParsed,
      },
    });

    if (existingTask) {
      const updatedTask = await prisma.tasks.update({
        where: {
          id: taskIdParsed,
        },
        data: {
          title,
          description,
          dueDate: new Date(date),
        },
      });

      return res.status(200).json(updatedTask);
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Error while editing task on backend" });
  }
});

app.post("/changeStatus", async (req, res) => {
  try {
    const { container, taskId } = req.body;
    const existingTask = await prisma.tasks.findUnique({
      where: {
        id: parseInt(taskId),
      },
    });
    if (existingTask) {
      const updatedTask = await prisma.tasks.update({
        where: {
          id: parseInt(taskId),
        },
        data: {
          status: container,
        },
      });
      return res.status(200).json(updatedTask);
    }
    return res.status(400).json({ messae: "no task with the given id found" });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Error while changing status of task" });
  }
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
