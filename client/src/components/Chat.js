import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import '../styles/chat.css';

const Chat = (props) => {
  const [socket] = useState(() => io(':8000'));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    console.log("Running");
    socket.on("welcome", (data) => console.log(data));
    socket.on("messages_to_chat", (data) => setMessages(data));
  }, [socket]);

  useEffect(() => {
    socket.emit("new_user", props.name);
  }, [props.name, socket]);

  useEffect(() => {
    bottomRef.current && bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message_from_client", { msg: message, name: props.name });
    setMessage("");
  };

  return (
    <div className="flashy-chat-container">
      <h1 className="flashy-chat-header">Welcome, {props.name}</h1>
      <div className="flashy-chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flashy-chat-message ${msg.name === props.name ? 'user' : ''}`}
          >
            {msg.name && <span className="flashy-chat-name">{msg.name}:</span>} {msg.msg}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="flashy-chat-input"
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="flashy-send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;