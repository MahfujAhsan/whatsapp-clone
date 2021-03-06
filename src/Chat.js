import { Avatar, IconButton } from '@mui/material';
import { AttachFile, MoreVert, SearchOutlined, EmojiEmotionsOutlined, Mic } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { useParams } from "react-router-dom"
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import db from './firebase';

const Chat = () => {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const postCollectionRef = collection(db, "rooms");

    useEffect(() => {
        // if (roomId) {
        //    onSnapshot(collection(db, "rooms"), (snapshot) => (
        //    snapshot.docs.map((doc) => (
        //     setRoomName(doc.data().name)
        //    )) 
        //    ))
        // }
        if (roomId) {
            const getDocument = async () => {
                const data = await getDocs(postCollectionRef);
                onSnapshot(data.docs.find(snapshot => roomId === snapshot.id && (
                    setRoomName(snapshot.data().name)
                )))
            }
            return () => {
                getDocument()
            };
        }
    }, [postCollectionRef, roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input)
        setInput("");
    }

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                <p className={`chat__message ${true && 'chat__reciever'}`}>
                    <span className="chat__name">Mahfuj Ahsan</span>
                    HeY Guys
                    <span className="chat__timestamp">3:52pm</span>
                </p>
            </div>
            <div className="chat__footer">
                <EmojiEmotionsOutlined />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Type a message' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    );
};

export default Chat;