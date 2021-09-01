import classes from "./Sidebar.module.scss";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Thread from "./Thread";



const Sidebar = () => {
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
          <Thread />
          <Thread />
          <Thread />
          <Thread />
          <Thread />
          <Thread />
      </div>
    </div>
  );
};

export default Sidebar;
