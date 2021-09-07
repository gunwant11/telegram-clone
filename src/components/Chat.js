import { Avatar, IconButton } from "@material-ui/core";
import classes from "./Chat.module.scss";
import { useState, useEffect, Fragment } from "react";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { MoreVert } from "@material-ui/icons";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import MicNoneIcon from "@material-ui/icons/MicNone";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";
import Send from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import { collection, doc, onSnapshot, addDoc } from "firebase/firestore";
import db from "../firebase";
import { query, orderBy } from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import { Timestamp } from "firebase/firestore";

console.log(Timestamp.now().toDate());

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { channelId } = useParams();
  const [channelName, setChannelName] = useState("");
  const [messages, setMessages] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [channelId]);

  useEffect(() => {
    if (channelId) {
      onSnapshot(doc(db, "Channel", `${channelId}`), (doc) => {
        setChannelName(doc.data().name);
      });

      const q = query(
        collection(db, "Channel", `${channelId}`, "messages"),
        orderBy("timestamp", "asc")
      );

      onSnapshot(q, (snap) => setMessages(snap.docs.map((doc) => doc.data())));
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if(!input){
      return
    }

    if(input.trim.length === 0){
      setInput("");
      return;
    }
    
    addDoc(collection(db, "Channel", `${channelId}`, "messages"), {
      name: user.displayName,
      message: input,
      timestamp: Timestamp.now().toDate(),
    });
    setInput("");
  };

  console.log(messages);

  // open-peeps
  return (
    <div className={classes.chat}>
      <div className={classes.header}>
        <Avatar
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
        />
        <div className={classes.header_info}>
          <h3>{channelName}</h3>
          <p>
            Last seen at{" "}
            {messages[messages.length - 1]?.timestamp
              ?.toDate()
              .toString()
              .slice(0, 24)}
          </p>
        </div>
        <div className={classes.header_right}>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <InsertLinkIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className={classes.body}>
        {messages.map((message) => (
          <div
            key={
              message.name + message.message + Math.floor(Math.random() * 5000)
            }
            className={`${classes.message} ${
              message.name === user.displayName && classes.reciever
            }`}
          >
            <span className={classes.name}>
              {message.id}
              {message.name}
            </span>
            <p>
              {message.message}
              <span className={classes.time}>
                {message.timestamp.toDate().toString().slice(0, 24)}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className={classes.footer}>
        <form>
          <IconButton>
            <SentimentSatisfiedOutlinedIcon />
          </IconButton>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Write a message.."
          />
          <IconButton>
            <AttachmentOutlinedIcon />
          </IconButton>

          <div>
            <button type="submit" onClick={sendMessage}  >
              {!input ? <MicNoneIcon /> : <Send />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
