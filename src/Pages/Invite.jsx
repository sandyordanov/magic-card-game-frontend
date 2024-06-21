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
    const [player, setPlayer] = useState([]);
    const [userId, setUserId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userId = TokenManager.getUserId();
        setUserId(userId);
        PlayerService.getPlayer(userId).then((response) => {
            setPlayer(response.data);
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
                            const data = JSON.parse(message.body);
                            if (data.gameId) {
                                navigate(`/game/${data.gameId}`);
                            } else {
                                setInvitations((prevInvitations) => [...prevInvitations, data]);
                            }
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
    }, [userId, player.name, navigate]);

    const sendInvitation = (receiver) => {
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

    const acceptInvite = (inv) => {
        if (client && client.connected) {
            const invitation = {
                sender: player.name,
                receiver: inv.sender,
                status: 'Accepted',
            };
            client.publish({
                destination: `/app/invite/accept`,
                body: JSON.stringify(invitation),
            });
            updateInvitationStatus(inv.sender, 'Accepted');
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
            <h3 className="text-white text-center">Game invitations</h3>
            <ul className="text-center text-white list-group">
                {invitations.map((invitation, index) => (
                    <li className="mb-1 invite rounded-2" key={index}>
                        <strong>{invitation.sender}</strong> <br />
                        <strong>Status:</strong> {invitation.status}

                        {invitation.status === 'Pending' && (
                            <>
                                <button
                                    className="btn btn-dark ms-3 mb-1 rounded-5 border-2 border-primary-subtle"
                                    onClick={() => acceptInvite(invitation)}
                                >
                                    <span>&#10003;</span>
                                </button>
                                <button
                                    className="btn btn-dark mb-1 ms-1 rounded-5 border-2 border-danger-subtle"
                                    onClick={() => declineInvite(invitation.sender)}
                                >
                                    <span>&#10007;</span>
                                </button>
                            </>
                        )}
                        {invitation.status === 'Accepted' && (
                            <button
                                className="btn btn-dark mb-1 rounded-5 border-2 border-primary-subtle ms-1"
                                onClick={() => navigate(`/game/${invitation.gameId}`)}
                            >
                                Join Lobby
                            </button>
                        )}
                        {invitation.status === 'Declined' && (
                            <button
                                className="btn btn-secondary mb-1 ms-1 rounded-5"
                                onClick={() => deleteInvitation(invitation.sender)}
                            >
                                <span>&#10007;</span>
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
                        <td>
                            <span className="logged-in">●</span> {user}
                        </td>
                        <td>
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => sendInvitation(user)}>
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
