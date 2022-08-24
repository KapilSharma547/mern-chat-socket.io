import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";



function App() {
  const socket = io.connect("http://localhost:3001");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Socket changed in Chat.js", data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  // console.log("main console from app.js");
  // console.log("messageList----->", messageList);
  return (
    <>
      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3> Join A Chat</h3>
            <input
              type="text"
              placeholder="John..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room Id"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} messageList={messageList} />
        )}
      </div>
    </>
  );
}

export default App;
