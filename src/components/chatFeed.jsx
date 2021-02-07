import { MessageForm } from "./MessageForm";
import { MyMessage } from "./MyMessage";
import { ThereMessage } from "./ThereMessage";

export const ChatFeed = (props) => {
  const { chats, activeChat, userName, messsages } = props;
  const chat = chats&&chats[activeChat];

  console.log(chat,userName,messsages)

  return <div>ChatFeed</div>;
};
Ï