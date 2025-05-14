"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = usersRoutes;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
function usersRoutes(prisma) {
    const router = (0, express_1.Router)();
    router.get('/', async (req, res) => {
        const users = await prisma.user.findMany();
        res.json(users);
    });
    router.post('/', async (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        }).then((user) => {
            res.status(201).json({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }).catch((err) => {
            console.error(err);
            res.status(400).json({ error: 'Impossible de créer l\'utilisateur' });
        });
    });
    return router;
}
