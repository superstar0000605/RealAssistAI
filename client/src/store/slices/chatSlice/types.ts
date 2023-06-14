import { ChatType } from "../../../global.types";

export type chatSliceState = {
  chats: ChatType[];
  chat: ChatType;
  isNewChat: Boolean;
};
