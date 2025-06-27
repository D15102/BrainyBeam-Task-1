import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModal from '../models/users.js'


export const registerAuth = async (req, res) => {
    if (!req.body) return
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.json({
            message: "Something Went Wrong !",
            success: false,
        })
    }
    //if user already exxists or not
    const existingUser = await userModal.findOne({
        email
    })
    if (existingUser) {
        return res.json({
            message: "User already Exists",
            success: false
        })
    }
    let profilePictureText = ''
    username.split(' ').map(char => (
        profilePictureText += char[0]
    ))
    let bgColor = '#'
    const hex = "0123456789ABCDEF"
    for (let i = 0; i < 6; i++) {
        bgColor += hex[Math.floor(Math.random() * hex.length)]
    }
    console.log(bgColor)
    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const userData = await userModal.create({
                username,
                email,
                password: hash,
                profilePictureText: profilePictureText.toUpperCase(),
                profilePictureBgColor: bgColor

            })
            const token = jwt.sign({ email }, process.env.JWT_SECRET)
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "None", // Very important!
            })
            res.status(200).json({
                message: "User Created Successfully !",
                success: true,
                user: userData
            })
        })
    })

}
export const loginAuth = async (req, res) => {
    if (!req.body) return
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({
            message: "Something Went Wrong !",
            success: false,
        })
    }
    //if user already exxists or not
    const existingUser = await userModal.findOne({
        email
    })
    if (!existingUser) {
        return res.json({
            message: "User Not Exists",
            success: false
        })
    }
    bcrypt.compare(password, existingUser.password, async (err, result) => {
        if (!result) {
            return res.json({
                message: "Password Not Matched",
                success: false
            })
        }
        const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET)
        res.cookie("token", token, {
            secure: true,
            sameSite: "None", // Very important!
        })
        res.status(200).json({
            message: "Logged In Successfully !",
            success: true,
            user: existingUser
        })
    })
}

export const logoutAuth = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({
            message: "Not Logged In",
            success: false
        })
    }
    res.clearCookie("token")
    res.json({
        message: "Logged Out",
        success: true
    })
}

export const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({
            message: "Taking To Login Page",
            success: false
        })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
        // return res.status(200).json({
        //     message: "Redirecting to Next Page",
        //     success: true
        // })
    } catch (error) {
        console.log(error)
    }

}

