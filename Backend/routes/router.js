import {Router} from "express"
import userRouter from "./user.routes.js"
// import messageRouter from "./message.routes.js"


const router=Router()

router.use(userRouter)
// router.use(messageRouter)


export default router