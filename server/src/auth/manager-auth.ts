import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {UsersModel} from "../schemas/users";
import {Roles} from "../enums/roles";

export async function authManager(req: Request, res: Response, next: NextFunction){

    try {

        if (!req.headers.authorization) return res.status(401).send({message: 'Unauthorized request'})

        const token = req.headers.authorization
        if (token === 'null') return res.status(401).send({message: 'Unauthorized request'})

        let payload: any = jwt.verify(token, 'secretKey')
        if (!payload) return res.status(401).send({message: 'Unauthorized request'})

        const user = await UsersModel.findOne({_id: payload.subject})
        if (!user) return res.status(401).send({message: 'Unauthorized request'})
        if (user.role !== Roles.manager) return res.status(403).send({message: 'Forbidden request'})

        next()

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

}