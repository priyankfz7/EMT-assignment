import React, { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import ACTIONS from "../Socket/actions";

// function debounce(func, timerId) {
//   if (timerId) {
//     clearTimeout(timerId);
//   }
//   timerId = setTimeout(() => {
//     func();
//   }, 1000);
// }

const Editor = ({ socketRef, roomId }) => {
  const [text, setText] = useState("");
  //   const [timerId, setTimerId] = useState(null);
  const onChange = useCallback(
    (value, viewUpdate) => {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        code: value,
      });
      return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      };
    },

    [socketRef.current]
  );
  useEffect(() => {
    console.log(socketRef);
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log(code);
        setText(code);
      });
    }
  });
  useEffect(() => {
    console.log(1);
    fetch(`http://localhost:8080/rooms/single/${roomId}?single=true`)
      .then((res) => res.json())
      .then((res) => setText(res.room.code));
  }, []);
  return (
    <div>
      <CodeMirror
        value={text}
        height="100vh"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={dracula}
      />
    </div>
  );
};

export default Editor;
