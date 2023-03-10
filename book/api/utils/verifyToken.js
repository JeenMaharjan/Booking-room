import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) res.status(403).json("token is not valid!")
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("no auth ")
    }
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("not allowed")
        }
    })
}
export const verifyadmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("not allowed")
        }
    })
}