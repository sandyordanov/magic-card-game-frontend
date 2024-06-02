import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Client} from '@stomp/stompjs';
import TokenManager from "../Services/TokenManager.js";
import PlayerService from "../Services/PlayerService.js";
import {useNavigate} from 'react-router-dom';

const Invite = () => {
    const [invitations, setInvitations] = useState([]);
    const [client, setClient] = useState(null);
    const userId = TokenManager.getUserId();
    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (userId){
            PlayerService.getAllPlayers().then((response) => {
                console.log(response.data)
                setPlayers(response.data)
            })
        }
    }, []);
    useEffect(() => {
        if (userId){
            PlayerService.getPlayer(userId).then((response) => {
                setPlayer(response.data)
            })
        }
    }, [userId]);
    useEffect(() => {
        if (userId) {
            const stompClient = new Client({
                brokerURL: 'ws://localhost:8080/ws', // Replace with your WebSocket URL
                reconnectDelay: 5000,
                onConnect: () => {
                    console.log('Connected');
                    // Subscribe to the channel with the user's name
                    stompClient.subscribe(`/topic/invitations/${userId}`, (message) => {
                        if (message.body) {
                            setInvitations((prevInvitations) => [...prevInvitations, JSON.parse(message.body)]);
                        }
                    });
                },
                onDisconnect: () => {
                    console.log('Disconnected');
                },
            });
            console.log("UserId" + userId);
            stompClient.activate();
            setClient(stompClient);

            // Cleanup on component unmount
            return () => {
                stompClient.deactivate();
            };
        }

    }, [userId]);
    const sendInvitation = (receiver) => {
        if (client && client.connected) {
            const invitation = {
                sender: userId,
                receiver: receiver,
                senderName: player.name,
                status: 'Pending'
            };
            client.publish({
                destination: `/app/invite/${receiver}`,
                body: JSON.stringify(invitation),
            });
        }
    };
    const acceptInvite = (receiver) => {
        if (client && client.connected) {
            const invitation = {
                sender: userId,
                receiver: receiver,
                senderName: player.name,
                status: 'Accepted'
            };
            client.publish({
                destination: `/app/invite/${receiver}`,
                body: JSON.stringify(invitation),
            });
            updateInvitationStatus(receiver, 'Accepted');
            navigate('/lobby');
        }
    };
    const declineInvite = (receiver) => {
        if (client && client.connected) {
            const invitation = {
                sender: userId,
                receiver: receiver,
                senderName: player.name,
                status: 'Declined'
            };
            client.publish({
                destination: `/app/invite/${receiver}`,
                body: JSON.stringify(invitation),
            });
            updateInvitationStatus(receiver, 'Declined');
        }
    };
    const updateInvitationStatus = (sender, newStatus) => {
        setInvitations((prevInvitations) =>
            prevInvitations
                .map((invitation) =>
                    invitation.sender === sender ? {...invitation, status: newStatus} : invitation
                )
                .filter((invitation) => invitation.status !== 'Declined')
        );
    };
    const deleteInvitation = (sender) => {
        setInvitations((prevInvitations) => prevInvitations.filter((invitation) => invitation.sender !== sender));
    };
    return (
        <div className="">
            <h2 className="text-white">Invite to play {userId}</h2>
            <ul>
                {invitations.map((invitation, index) => (
                    <li key={index}>
                        <strong>From:</strong> {invitation.senderName} <br/>
                        <strong>Status:</strong> {invitation.status}
                        {invitation.status === 'Pending' && (
                            <>
                                <button onClick={() => acceptInvite(invitation.sender)}>
                                    Accept
                                </button>
                                <button onClick={() => declineInvite(invitation.sender)}>
                                    Decline
                                </button>
                            </>
                        )}
                        {invitation.status === 'Accepted' && (
                            <button onClick={() => navigate('/lobby')}>
                                Join Lobby
                            </button>
                        )}
                        {invitation.status === 'Declined' && (
                            <button onClick={() => deleteInvitation(invitation.sender)}>
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Invite</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player, index) => (
                    <tr key={index}>
                        <td>{player.name}</td>
                        <td>
                            <button onClick={() => sendInvitation(player.userId)}>
                                Send Invitation
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Invite;
