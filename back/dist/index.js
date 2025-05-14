"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../generated/prisma");
const user_1 = __importDefault(require("./routes/user"));
const talk_1 = __importDefault(require("./routes/talk"));
const slot_1 = __importDefault(require("./routes/slot"));
const app = (0, express_1.default)();
const prisma = new prisma_1.PrismaClient();
app.use(express_1.default.json());
app.use('/users', (0, user_1.default)(prisma));
app.use('/talks', (0, talk_1.default)(prisma));
app.use('/slots', (0, slot_1.default)(prisma));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
