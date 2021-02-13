import { MessageForm } from "./MessageForm";
import { MyMessage } from "./MyMessage";
import { TheirMessage } from "./TheirMessage";

export const ChatFeed = (props) => {
  // chatEngineによるAPIから必要なデータを定義
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      //keyはメッセージ固有の値、indexは配列に前から数字を振ったもの
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      //sender＝送信者　messagesのAPIにあるデータ
      const isMyMessage = userName === message?.sender.username;

      // 既読判定
      const renderReadReceipts = (message, isMyMessage) =>
        // mapで読んだ人を回して、avaterを表示
        chat.people.map(
          (person, index) =>
            person.last_read === message?.id && (
              <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                  float: isMyMessage ? "right" : "left",
                  backgroundImage:
                    person.person.avatar && `url(${person.person.avatar})`,
                }}
              />
            )
        );

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage {...props} chatId={activeChat} message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return "Loding...";

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        {chat.people.map((person) => `${person.person.username}`)}
      </div>
      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};
