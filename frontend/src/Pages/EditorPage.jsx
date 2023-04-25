import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initSocket } from "../Socket/socket";
import ACTIONS from "../Socket/actions";
import { toast } from "react-hot-toast";
import Editor from "../Components/Editor";
import userIn from "../assets/user-come.mp3";
import userLeft from "../assets/user-left.mp3";
var userInAudio = new Audio(userIn);
var userLeftAudio = new Audio(userLeft);

const EditorPage = () => {
  const [clients, setClients] = useState([]);
  console.log(clients);
  const socketRef = useRef();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const userinLS = JSON.parse(localStorage.getItem("userdata")).username;

  //for copying room id
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("room id copied");
    } catch (e) {}
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: userinLS,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== userinLS) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
            userInAudio.play();
          }
          setClients([...clients]);
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
        userLeftAudio.play();
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  return (
    <div className="editor-wrapper">
      <div className="aside">
        <h3>members</h3>
        <div>
          {clients.length == 0 ? (
            <h3 className="nav-link">wait a sec...</h3>
          ) : (
            clients.map((c, i) => <p key={i}>{`#${c.username}`}</p>)
          )}
        </div>
        <button onClick={copyRoomId} className="secondary-btn copy-btn">
          Copy room id
        </button>
        <br />
        <button onClick={() => navigate("/")} className="primary-btn">
          Leave
        </button>
      </div>
      <div className="code-editor">
        <Editor socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
};

export default EditorPage;
