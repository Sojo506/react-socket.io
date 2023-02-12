import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      body: "Hola",
      from: "Sojo",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessages([{ body: message, from: "Me" }, ...messages]);
    setMessage("");
  };

  useEffect(() => {
    console.log(messages);
    const getMessage = (payload) => {
      setMessages([payload, ...messages]);
    };

    socket.on("message", getMessage);

    return () => {
      socket.off("message", getMessage);
    };
  }, [messages]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">Send</button>
      </form>

      <div>
        {messages.map((m, i) => (
          <div key={i}>
            <p>
              {m.from.slice(0, 4).toLocaleLowerCase()}: {m.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
