import classes from "./Thread.module.scss"
import { Avatar } from "@material-ui/core"
import { useState, useEffect } from "react"
const Thread = ({id, addNewChat}) => {

    const[seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () =>{
        const roomName = prompt("Please  enter name for chat")
        if(roomName){
            /// do some stuff
        }
    };

// initials

    return !addNewChat ? (
        <div className={classes.thread}>
            <Avatar src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`} />
            <div className={classes.text}>
                <h2> Chat One</h2>
                <div>hello from chat one</div>
            </div>
        </div>
    ):(
        <div onClick={createChat} className={classes.thread}>
            <h2> Add New Chat</h2>
        </div>

    )
}

export default Thread
