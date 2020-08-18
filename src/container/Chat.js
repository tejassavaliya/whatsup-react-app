import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import './Chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import db from '../firebase';
import {useStateValue} from "../redux/StateProvider";
import * as firebase from "firebase";

function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName ] = useState("");
    const [messages, setMessages ] = useState([]);
    const [ { user } ] = useStateValue();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000 ));
    }, []);

    useEffect(() => {
        if(roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => (
                    setRoomName(snapshot.data().name)
                ))

            db.collection("rooms").doc(roomId)
                .collection("messages").orderBy('timestamp', "asc")
                .onSnapshot((snapshot =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
        }
    }, [roomId])
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typpe ", input)
        db.collection("rooms").doc(roomId)
            .collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen {new Date(messages[messages.length - 1] ?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message, i) => (
                    <p
                        key={`message${i}`}
                        className={`chat_message chat__receiver ${
                            message.name === user.displayName 
                            && "chat__receiver"}`}
                    >
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}

            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input placeholder="Type a message"
                           value={input}
                           onChange={(event) => setInput(event.target.value)}
                           type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>

        </div>
    )
}

export default Chat;