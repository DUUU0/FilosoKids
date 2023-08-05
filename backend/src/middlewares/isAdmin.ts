import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {

    const { user_id } = req

    if (user_id) {

        const userAdmin = await prismaClient.user.findFirst({
            where: {
                id: user_id,
                is_admin: true
            }
        })

        if (userAdmin) {
            return next()
        }
    }

    return res.status(401).end()
}