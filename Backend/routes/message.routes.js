import { Router } from "express";
import message from "../models/message.model.js";
const router = Router();

router.get("/messages/mine/:other", async (req, res) => {
  try {
    const { other } = req.params;
    const mine = req.cookies.user_id;
    const messages = await message.find(
      $or[
        ({ sender: mine, receiver: other }, { sender: other, receiver: mine })
      ]
    );
    res.status(200).send("messages with other");
  } catch (err) {
    console.log(err);
    res.status(404).send("messages not found");
  }
});


router.post("/messages",async (req,res)=>{
    try {
       const response=new message(req.body)
    const newMessage=await response.save()
    res.status(201).send(newMessage) 
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})
export default router;
