import { Avatar, IconButton } from "@material-ui/core";
import classes from "./Chat.module.scss";
import { useState, useEffect } from "react";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { MoreVert } from "@material-ui/icons";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import MicNoneIcon from "@material-ui/icons/MicNone";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";
import Send from "@material-ui/icons/Send";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  // open-peeps
  return (
    <div className={classes.chat}>
      <div className={classes.header}>
        <Avatar
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
        />
        <div className={classes.header_info}>
          <h3>Chat room name</h3>
          <p>Last seen at...</p>
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
        <p className={`${classes.message} ${true && classes.reciever}`}>
          <span className={classes.name}>Isha</span>
          <p>
            Hey Guys<span className={classes.time}>3:52pm</span>
          </p>
        </p>
        <p className={classes.message}>Hey Guys</p>
      </div>
      <div className={classes.footer}>
        <form>
          <SentimentSatisfiedOutlinedIcon />
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            placeholder="Write a message.."
          />
          <AttachmentOutlinedIcon />
        </form>
        <div>
          <button type="submit">{!input ? <MicNoneIcon /> : <Send />}</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
