import { Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/auth.controller.ts";

const router = Router();

router.post("/register", RegisterUser);

router.post("/login", LoginUser);

export default router;
