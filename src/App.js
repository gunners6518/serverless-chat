import { ChatEngine } from "react-chat-engine";
import { ChatFeed } from "./components/chatFeed";
// import LoginForm from './components/LoginForm';
import "./App.css";

const projectID = "de531d3b-d470-407f-a33c-93ab0805cc6f";

export const App = () => {
  //   if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName="akito"
      userSecret="test"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
};

// infinite scroll, logout, more customizations...
