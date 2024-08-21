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
        res.status(400).json({ message: "failed to add user to  database" });
    }
}));
app.listen(3000, () => {
    "listening to port 3000";
});
