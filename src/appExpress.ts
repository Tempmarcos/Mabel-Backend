import express from 'express'
import { Request, Response } from 'express';
import cors from 'cors'
//import { errorHandler } from './modules/shared/middlewares/errorHandling/errorHandler'
import { router } from './modules/shared/interfaces/routes';

export const appExpress = express()

appExpress.use('/test', (request : Request, response: Response) => {
    response.send({message : 'funcionou'})
})

appExpress.use(cors({
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
}))
appExpress.use(express.json())
appExpress.use(router)
//appExpress.use(errorHandler)