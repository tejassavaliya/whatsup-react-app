import React from "react";
import { Button} from "@material-ui/core";
import './Login.css'
import {auth, provider} from "../firebase";
import {useStateValue} from "../redux/StateProvider";
import {actionTypes} from "../redux/reducer";

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            console.log(result)
        }).catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
                     alt="" />
                <div className="login__text">
                    <h2>Sign in to whatsApp</h2>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}
export default Login;