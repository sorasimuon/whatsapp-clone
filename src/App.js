import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
