import classes from "./Thread.module.scss";
import { Avatar } from "@material-ui/core";
import { useState, useEffect } from "react";
import db from "../firebase";
import { NavLink } from "react-router-dom";
import { query, orderBy } from "firebase/firestore";
import { collection,  onSnapshot, addDoc  } from "firebase/firestore";
import "../App.css";


const Thread = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [lastmessages, setLastMessages] = useState("");


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(()=>{
    const q = query(
      collection(db, "Channel", `${id}`, "messages"),
      orderBy("timestamp", "desc")
    );

    onSnapshot(q, (snap) =>
        setLastMessages(snap.docs.map((doc) => doc.data()))
      );
    
      
  },[id])

  const createChat = () => {
    const roomName = prompt("Please  enter name for chat");
    if (roomName) {
      addDoc(collection(db, "Channel"), {
        name: roomName,
      });
    }
  };

  // initials

  return !addNewChat ? (
    <NavLink to={`/channels/${id}`} className={classes.link} activeClassName={classes.active}>
      <div className={classes.thread}>

        <Avatar
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
        />
        <div className={classes.text}>
          <h2>{name}</h2>
          <div>{ lastmessages[0]?.message ||  `last message`} </div>
        </div>
      </div>
    </NavLink>
  ) : (
    <div onClick={createChat} className={classes.thread}>
      <h2> Add New Chat</h2>
    </div>
  );
};

export default Thread;
