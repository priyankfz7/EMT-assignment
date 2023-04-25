import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AllRooms from "../Components/AllRooms";
import { toast } from "react-hot-toast";

const getAllRooms = async (token) => {
  let res = await fetch("http://localhost:8080/rooms/all", {
    headers: {
      authentication: token,
    },
  });
  res = await res.json();
  return res.rooms || [];
};
const Home = () => {
  const token = localStorage.getItem("token");
  const [load, setLoad] = useState(false);
  const [addload, setAddLoad] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomname, setName] = useState("");
  const [joinId, setJoinId] = useState("");
  const navigate = useNavigate();
  const createRoom = async (e) => {
    setAddLoad(true);
    e.preventDefault();
    let res = await fetch("http://localhost:8080/rooms/create/", {
      method: "POST",
      body: JSON.stringify({ roomname }),
      headers: {
        "Content-Type": "application/json",
        authentication: token,
      },
    });
    res = await res.json();
    setAddLoad(false);
    setName("");
    let rooms = await getAllRooms(token);
    setRooms(rooms);
  };
  //delete a room func
  const handleDelete = async (roomId) => {
    let res = await fetch(`http://localhost:8080/rooms/delete/${roomId}`, {
      method: "DELETE",
      headers: {
        authentication: token,
      },
    });
    res = await res.json();
    console.log(res);
    let rooms = await getAllRooms(token);
    setRooms(rooms);
  };

  const joinRoom = () => {
    if (!joinId) {
      toast.error("provide a room id");
    } else {
      navigate(`/editor/${joinId}`);
    }
  };

  useEffect(() => {
    setLoad(true);
    getAllRooms(token).then((res) => {
      setRooms(res);
      setLoad(false);
    });
  }, []);
  if (load) {
    return <h1>....loading</h1>;
  }

  return (
    <div>
      {token ? (
        <div>
          <AllRooms rooms={rooms} handleDelete={handleDelete} />
          <div className="create-join-room-wrap">
            <h2>Create a new room</h2>
            <form onSubmit={createRoom}>
              <input
                type="text"
                placeholder="write room name"
                value={roomname}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" disabled={addload} className="primary-btn">
                {addload ? "create ..." : "create"}
              </button>
            </form>
          </div>
          <div className="create-join-room-wrap">
            <h2>Join a room </h2>
            <form onSubmit={joinRoom}>
              <input
                type="text"
                placeholder="write room id here ..."
                value={joinId}
                onChange={(e) => setJoinId(e.target.value)}
              />
              <button type="submit" className="primary-btn">
                Join
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Home;
