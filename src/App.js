import { ChatEngine } from "react-chat-engine";
import { ChatFeed } from "./components/chatFeed";
import { LoginForm } from "./components/LoginForm";
import "./App.css";

export const App = () => {
  if (!localStorage.getItem("username")) return <LoginForm />;

  const projectID = "de531d3b-d470-407f-a33c-93ab0805cc6f";

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() =>
        new Audio(
          "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
        ).play()
      }
    />
  );
};
