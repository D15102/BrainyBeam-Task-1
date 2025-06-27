import jwt from 'jsonwebtoken'
import userModal from '../models/users.js'
export const verifyToken =async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({
            message: "Token Not Found !",
            success: false
        })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModal.findOne({
            email : decode.email
        })
        return res.json({
            message : "User Found !",
            success : true,
            user
        })
    } catch (error) {
        return res.json({
            message: error,
            success: false
        })
    }

}