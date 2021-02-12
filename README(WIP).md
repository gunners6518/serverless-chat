# 概要

team のクローンアプリ(チャット部分だだけ)を作ったので、共有。
解説も少しばかり咥えています。

デプロイ：https://teams-clone.netlify.app/
GitHub：https://github.com/gunners6518/teams-clone

## 使用技術

・React
・ChatEngine（チャットのサーバーとして）
・react-chat-engine（チャット機能のライブラリ）

## 実装した機能

・チャットが自分側と相手側で左右に分かれて表示される
・チャットでの既読判定されている
・外部のユーザー情報と連携したログインフォーム（chat engine）
・チャット送信機能（画像送信も可能）

# 機能の解説

## プロジェクトの準備

・react(react-create-app にて)インストール
・react-chat-engine インストールして下さい。
https://github.com/alamorre/react-chat-engine

・App.css をコピー
https://github.com/gunners6518/teams-clone/blob/master/src/App.css
css は本プロジェクトでは扱わない為、参考にしてください。

## チャットが自分側と相手側で左右に分かれて表示される

react-chat-engine を使ってチャットを作ります。

### ChatEngine でデータをつくる

まずは ChatEngine のサイトから自分たちのチャットのデータを作ります。

https://chatengine.io/

sign in して APIKey を取得し、Users、Chats を作成しましょう。

### react-chat-engine を使って基本的なチャット機能を実装する

react-chat-engine を使ってチャット機能を作っていきます。
まず、`yarn add react-chat-engine`します。

react-chat-engine のドキュメントはこちらです。
https://github.com/alamorre/react-chat-engine#readme

EXAMPLE では

```jsx
import React from "react";

import { ChatEngine } from "react-chat-engine";

export function App() {
  return <ChatEngine publicKey={""} userName={""} userSecret={""} />;
}
```

この様に ChatEngine でコンポーネントを使い、オプションで props を入れていく事で、先ほど ChatEngine からチャットデータを表示してくれる様です。　
この時点で最低限のチャットは表示されています。

今回は自分と他人でチャットを左右に振り分けたいので、チャットフィード部分（チャットの表示部分）をカスタマイズします。
ChatEngine の renderChatFeed を使う事で、チャット部分に react コンポーネントをレンダリングしていきましょう。

参考：https://chatengine.io/docs/customize_ui
Render Chat Feed 部分

```jsx
export const App = () => {
  const projectID = "xxxx";

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName="xxx"
      userSecret="xxx"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
};
```

renderChatFeed の中身は ChatFeed コンポーネントにて作成していきます。

### 自分側と相手側に分けてチャット表示用のコンポーネントを作る

components/chatFeed.jsx を作成します。

まずは renderChsatFeed から受け取った props の値を確かめてみましょう。

```jsx
export const ChatFeed = (props) => {
  console.log(prpps);
  return <div className="chat-feed">コンソール</div>;
};
```

するとこのうように表示されるはずです。
![名称未設定のデザイン](https://user-images.githubusercontent.com/49203635/107720943-c797e880-6d1e-11eb-9ab8-82272dcf1ba6.png)

props として様々なチャットに関する情報が取得できていることが分かります。
ChatEngine のドキュメントを参考にすると、様々な機能がある事が分かります。
https://chatengine.io/docs/functions

chatFeed 部分を作って行きます。

```jsx
// propsから必要な構造化データを定義
const { chats, activeChat, userName, messages } = props;
const chat = chats && chats[activeChat];

const renderMessages = () => {
  //messagesのKey取得
  const keys = Object.keys(messages);

  //mapでkeyを1つ１つ回していく
  return keys.map((key, index) => {
    //keyに対応するメッセージを取得
    const message = messages[key];
    const lastMessageKey = index === 0 ? null : keys[index - 1];
    //sender＝送信者　messagesのAPIにあるデータ
    const isMyMessage = userName === message.sender.username;

    return (
      <div key={`msg_${index}`} style={{ width: "100%" }}>
        <div className="message-block">
          {isMyMessage ? (
            <MyMessage message={message} />
          ) : (
            <TheirMessage
              message={message}
              lastMessage={messages[lastMessageKey]}
            />
          )}
        </div>
      </div>
    );
  });
};
```

実際に表示する部分のコンポーネントは自分の物を MyMessage、他人の物を TheirMesaage として作成して行きます。

MyMessage

```jsx
export const MyMessage = ({ message }) => {
  //添付ファイルがある場合
  if (message.attachments && message.attachments.length > 0) {
    return (
      <img
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: "right" }}
      />
    );
  }
  return (
    <div
      className="message"
      style={{
        float: "right",
        marginRight: "18px",
        color: "white",
        backgroundColor: "#3B2A50",
      }}
    >
      {message.text}
    </div>
  );
};
```

添付ファイルがある際は api の attachment で取得できます。
条件分岐して、attachments[].file で取得できます。

TheirMessage

```jsx
export const TheirMessage = ({ lastMessage, message }) => {
  // その人の最初のメッセージ稼働時かを判定
  const isFirstMessageByUser =
    !lastMessage || lastMessage.sender.username !== message.sender.username;

  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
          className="message-avatar"
          style={{
            backgroundImage: message.sender && `url(${message.sender.avatar})`,
          }}
        />
      )}
      {message.attachments && message.attachments.length > 0 ? (
        <img
          src={message.attachments[0].file}
          alt="message-attachment"
          className="message-image"
          style={{ marginLeft: isFirstMessageByUser ? "4px" : "48px" }}
        />
      ) : (
        <div
          className="message"
          style={{
            float: "left",
            backgroundColor: "#CABCDC",
            marginLeft: isFirstMessageByUser ? "4px" : "48px",
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};
```

こちらでは lastMessage を用いて、その人の最初のメッセージ稼働時かを判定する`isFirstMessageByUser`を作っています。

その他は MyMessage 一緒です。
次にメッセージの送信フォームを作って行きます。

## チャット送信機能（画像送信も可能）

送信フォームは基本的な react hook の使い方が分かっていれば大丈夫です。
必要なイベントは input に対応した unChange と、onSubmit です。

まずは handleChange をみて行きましょう。
useState を使って、inout タグで入力値を value としてローカル state に保存します。

```jsx
import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";

export const MessageForm = (props) => {
  const [value, setValue] = useState("");
  const { chatId, creds } = props;

  const handleChange = (e) => {
    setValue(e.target.value);

    isTyping(props, chatId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }

    setValue("");
  };

  const handleUpload = (e) => {
    sendMessage(creds, chatId, { files: e.target.files, text: "" });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};
```

## チャットでの既読判定されている

## 外部のユーザー情報と連携したログインフォーム（chat engine）

## ログアウト機能

## ユーザー追加機能(ブラウザ側で完結する様に)
