import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import "./Sidebar.css"
import SidebarChat from './SidebarChat';

const Sidebar = ({children}) => {

    const [rooms, setRooms] = useState([]);
    const postCollectionRef = collection(db, "rooms");

    useEffect(() => {
        const getDocument = async () => {
            const data = await getDocs(postCollectionRef);
            setRooms(data.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        }
        return () => {
            getDocument()
        };
    }, [postCollectionRef])

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder='Search or start new chat' />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;