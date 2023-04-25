import React from "react";
import { Link } from "react-router-dom";

const AllRooms = ({ rooms, handleDelete }) => {
  return (
    <div className="all-rooms-wrapper">
      {rooms.map((r) => (
        <div key={r._id}>
          <div>
            <Link to={`/editor/${r._id}`}>
              <span className="room-name">{r.roomname}</span>
            </Link>
          </div>
          <div>
            <button
              className="secondary-btn"
              onClick={() => handleDelete(r._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRooms;
