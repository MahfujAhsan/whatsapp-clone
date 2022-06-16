import { Avatar } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import "./SidebarChat.css";
import { Link } from "react-router-dom"

const SidebarChat = ({ id, name, addNewChat }) => {

    const [seed, setSeed] = useState('');
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const createChat = async () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            //do some clever database stuff
            await addDoc(collection(db, "rooms"), {
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>Last message...</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
};

export default SidebarChat;