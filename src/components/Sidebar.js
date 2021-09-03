import classes from "./Sidebar.module.scss";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Thread from "./Thread";
import { useEffect, useState } from "react";
import db from "../firebase";
import {  onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useStateValue } from "../StateProvider";

const Sidebar = () => {
  const [channels, setChannels] = useState([]);
  const [{ user }, dispatch] = useStateValue();


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Channel"), (collection) => {
      setChannels(
        collection.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // console.log(channels);

  return (
    <div className={classes.sidebar}>
      <div className={classes.header}>
        <div className={classes.menu}>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </div>
        <div className={classes.search}>
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className={classes.chats}>
        <Thread addNewChat />
        {channels.map((channel) => (
          <Thread key={channel.id} id={channel.id} name={channel.data.name}  />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
