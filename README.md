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
[]({"A?":"B","a":5,"d":"B","h":"www.canva.com","c":"DAEV4UnFN3s","i":"P72YIyGuxRVlahtgKGPmgw","b":1613093137124,"A":[{"A?":"J","A":290,"B":1054.746319557711,"D":295.25368044228844,"C":28.611048740706224,"a":{"D":150.7,"C":150.7},"b":[{"A":"M0 0h150.7v150.7H0z","B":{"C":"#919191"}}],"c":{"A":{"A":6,"B":6,"D":138.7,"C":138.7},"B":884.8713778901556,"C":74.90977422709992,"D":"A","E":"A"}}],"B":1920,"C":1080})

## チャット送信機能（画像送信も可能）

## チャットでの既読判定されている

## 外部のユーザー情報と連携したログインフォーム（chat engine）
