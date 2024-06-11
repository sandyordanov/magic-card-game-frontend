import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Client } from '@stomp/stompjs';
import TokenManager from "../Services/TokenManager.js";
import { useNavigate } from 'react-router-dom';
import PlayerService from "../Services/PlayerService.js";

const Invite = () => {
    const [invitations, setInvitations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [client, setClient] = useState(null);
    const [player ,setPlayer] = useState([])
    const [userId ,setUserId] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        const userId = TokenManager.getUserId();
        setUserId(userId)
        PlayerService.getPlayer(userId).then((response) =>{
            setPlayer(response.data)
        });
    }, []);

    useEffect(() => {
        if (userId) {
            const stompClient = new Client({
                brokerURL: 'ws://localhost:8080/ws',
                reconnectDelay: 5000,
                onConnect: () => {
                    console.log('Connected');
                    stompClient.subscribe(`/topic/invitations/${player.name}`, (message) => {
                        if (message.body) {
                            setInvitations((prevInvitations) => [...prevInvitations, JSON.parse(message.body)]);
                            console.log(invitations)
                        }
                    });

                    stompClient.subscribe('/topic/online', (message) => {
                        if (message.body) {
                            const onlineUsers = JSON.parse(message.body);
                            const filteredUsers = onlineUsers.filter(user => user !== player.name);
                            setOnlineUsers(filteredUsers);
                        }
                    });

                    stompClient.publish({
                        destination: '/app/status',
                        body: JSON.stringify({ username: player.name, online: true }),
                    });
                },
                onDisconnect: () => {
                    console.log('Disconnected');
                    stompClient.publish({
                        destination: '/app/status',
                        body: JSON.stringify({ username: player.name, online: false }),
                    });
                },
            });

            stompClient.activate();
            setClient(stompClient);

            return () => {
                stompClient.deactivate();
            };
        }
    }, [userId,player.name,invitations]);

    const sendInvitation = (receiver) => {
        console.log(player)
        if (client && client.connected) {
            const invitation = {
                sender: player.name,
                receiver: receiver,
                status: 'Pending',
            };
            client.publish({
                destination: `/app/invite/${userId}`,
                body: JSON.stringify(invitation),
            });
        }
    };

    const acceptInvite = (sender) => {
        if (client && client.connected) {
            const invitation = {
                sender: player.name,
                receiver: sender,
                status: 'Accepted',
            };
            client.publish({
                destination: `/app/invite/${userId}`,
                body: JSON.stringify(invitation),
            });
            updateInvitationStatus(sender, 'Accepted');
            navigate('/lobby');
        }
    };

    const declineInvite = (sender) => {
        if (client && client.connected) {
            const invitation = {
                sender: player.name,
                receiver: sender,
                status: 'Declined',
            };
            client.publish({
                destination: `/app/invite/${sender}`,
                body: JSON.stringify(invitation),
            });
            updateInvitationStatus(sender, 'Declined');
        }
    };

    const updateInvitationStatus = (sender, newStatus) => {
        setInvitations((prevInvitations) =>
            prevInvitations
                .map((invitation) =>
                    invitation.sender === sender ? { ...invitation, status: newStatus } : invitation
                )
                .filter((invitation) => invitation.status !== 'Declined')
        );
    };

    const deleteInvitation = (sender) => {
        setInvitations((prevInvitations) => prevInvitations.filter((invitation) => invitation.sender !== sender));
    };

    return (
        <div className="bg-dark">
            <h3 className="text-white text-center">Invite to play {userId}</h3>
            <ul>
                {invitations.map((invitation, index) => (
                    <li key={index}>
                        <strong>From:</strong> {invitation.sender} <br />
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
                {onlineUsers.map((user, index) => (
                    <tr key={index}>
                        <td>{user}</td>
                        <td>
                            <button className="" onClick={() => sendInvitation(user)}>
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
