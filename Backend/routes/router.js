import {Router} from "express"
import userRouter from "./user.routes.js"
import refresh from "./refresh.routes.js"
// import messageRouter from "./message.routes.js"


const router=Router()

router.use(userRouter)
router.use(refresh)
// router.use(messageRouter)


export default router