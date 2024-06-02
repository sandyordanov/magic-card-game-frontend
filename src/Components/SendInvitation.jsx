import React, {useEffect, useState} from "react";
import { Client } from '@stomp/stompjs';
import TokenManager from "../Services/TokenManager.js";
const SendInvitation = ({username}) => {
    const [receiver,setReceiver] = useState('');
    const [stompClient, setStompClient] = useState(null);

    // TODO: Initialize connection
    const initStomp = () => {
        // Create Stomp-object
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });
        // Subscribe to destination
        client.onConnect = () => {
            client.subscribe(`/user/${TokenManager.getClaims().studentId}/queue/message`, receiveMessage);
        }
        // Gogo
        client.activate();
        setStompClient(client);
    }

    useEffect(() => {
        if(!stompClient){
            initStomp();
        }
    });
    const handleSend = () =>{
        const invitation = {sender:username, receiver,status:'Pending'};
        stompClient.publish({destination:'/app/invite',body:JSON.stringify(invitation)});
    };

    return(<div>
        <input
            type="text"
            placeholder="Enter receiver's username"
            value={receiver}
            onChange={(e)=> setReceiver(e.target.value)}
        />
        <button onClick={handleSend}>Send Invitation</button>
    </div>);
};
export  default SendInvitation;