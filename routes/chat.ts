import { Router } from "express";
import { check } from "express-validator";

import createChat from "../controllers/chats/createChat";
import getAllChats from "../controllers/chats/getAllChats";
import addContent from "../controllers/chats/addContent";
import getChat from "../controllers/chats/getChat"
import deleteChat from "../controllers/chats/deleteChat"
const router = Router();

// @route    POST api/chat/create
// @access   Private
// @desc     create chat
router.post(
  "/create",
  [check("content", "chat is empty").notEmpty({ ignore_whitespace: true })],
  createChat
);

// @route    GET api/chat/all
// @access   Private
// @desc     get all chats
router.get("/all",  getAllChats);

//@route POST api/chat/content/add
// @access Private
//@desc add content 
router.post("/content/add", addContent)
// @route    GET api/chat/:id
// @access   Private
// @desc     get all chats
router.get("/:id",  getChat);

// @route    DELETE api/chat/delete/:id
// @access   Private
// @desc     delete a chat
router.delete("/delete/:id", deleteChat);
export default router;
