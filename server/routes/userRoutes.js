import express from 'express'
import { registerAuth, loginAuth, logoutAuth, isLoggedIn } from '../auth/userAuth.js'
const router = express.Router()

router.post("/signup", registerAuth)

router.post("/login", loginAuth)

router.post("/logout", logoutAuth)

router.post("/profile", isLoggedIn, (req, res) => {
    res.send("Profile Page")
})



export default router