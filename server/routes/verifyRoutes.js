import express from 'express'
import { verifyToken } from '../auth/verifyAuth.js'

const router = express.Router()

router.post("/verify",verifyToken)


export default router