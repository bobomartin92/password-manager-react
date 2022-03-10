import express from 'express'
import { createUser, getUser, updateUser } from "../controllers/passwords.js";

const router = express.Router()

router.route('/:username')
    .get(getUser)
    .patch(updateUser)

router.route('/')
    .post(createUser)


export default router;