"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:5173",
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, imageUrl, email, googleId } = req.body;
        const existingUser = yield db_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(200).json(existingUser);
        }
        const user = yield db_1.prisma.user.create({
            data: {
                name,
                email,
                imageUrl,
                googleId,
            },
        });
        return res.status(200).json(user);
    }
    catch (e) {
        console.error("errow while adding user to the  database", e);
        return res.status(400).json({ message: "failed to add user to  database" });
    }
}));
app.post("/addtask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, userId, container, date } = req.body;
        const task = yield db_1.prisma.tasks.create({
            data: {
                title,
                description,
                userId,
                status: container,
                dueDate: date,
            },
        });
        return res.status(200).json(task);
    }
    catch (e) {
        console.error("errow while addding task");
        return res.status(400).json({ message: "failed  to add task " });
    }
}));
app.get("/gettasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield db_1.prisma.tasks.findMany();
        res.status(200).json(tasks);
    }
    catch (e) {
        console.error("error while getting tasks");
        return res.status(400).json({ message: "failed to get all  the  tasks" });
    }
}));
app.delete("/deletetask/:taskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = parseInt(req.params.taskId);
        console.log("deleted");
        const task = yield db_1.prisma.tasks.delete({
            where: {
                id: taskId,
            },
        });
        return res.status(200).json(task);
    }
    catch (e) {
        return res
            .status(400)
            .json({ message: "error while deleting task on backend" });
    }
}));
app.put("/editTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date, taskId } = req.body;
    try {
        const taskIdParsed = parseInt(taskId, 10);
        const existingTask = yield db_1.prisma.tasks.findUnique({
            where: {
                id: taskIdParsed,
            },
        });
        if (existingTask) {
            const updatedTask = yield db_1.prisma.tasks.update({
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
        }
        else {
            return res.status(404).json({ message: "Task not found" });
        }
    }
    catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ message: "Error while editing task on backend" });
    }
}));
app.post("/changeStatus", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { container, taskId } = req.body;
        const existingTask = yield db_1.prisma.tasks.findUnique({
            where: {
                id: parseInt(taskId),
            },
        });
        if (existingTask) {
            const updatedTask = yield db_1.prisma.tasks.update({
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
    }
    catch (e) {
        return res
            .status(400)
            .json({ message: "Error while changing status of task" });
    }
}));
app.listen(3000, () => {
    "listening to port 3000";
});
