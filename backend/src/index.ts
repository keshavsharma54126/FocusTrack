import express from "express";
import { prisma } from "./db";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
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
    res.status(400).json({ message: "failed to add user to  database" });
  }
});

app.post("/addtask", async (req, res) => {
  try {
    const { title, description, userId, container } = req.body;
    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        userId,
        status: container,
      },
    });
    return res.status(200).json(task);
  } catch (e) {
    console.error("errow while addding task");
    res.status(400).json({ message: "failed  to add task " });
  }
});

app.listen(3000, () => {
  "listening to port 3000";
});
