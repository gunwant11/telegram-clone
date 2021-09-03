import { Button } from "@material-ui/core"
import classes from "./Login.module.scss"
import { auth, provider } from '../firebase'
import {  signInWithPopup } from "firebase/auth"
import { useStateValue } from "../StateProvider"
import { actionTypes } from "../reducer"


const Login = () => {

    const [{ user }, dispatch] = useStateValue();

    const signIn = () =>{
        signInWithPopup(auth, provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    };

    return (
        <div className={classes.login}>
            <div className={classes.container}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="telegram" />
                <div className={classes.text}>
                    <h1>Sign in to Telegram</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>

            </div>
            
        </div>
    )
}

export default Login
