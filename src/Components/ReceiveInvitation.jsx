import React,{useState,useEffect} from "react";

const ReceiveInvitation = ({username}) =>{
    const [invitations,setInvitations] = useState([]);

    useEffect(() => {
        stompClient.onConnect = () =>{
            stompClient.subscribe('/topic/invitations',(message) =>{
                const invitation = JSON.parse((message.body))
                if (invitation.receiver === username){
                    setInvitations((prev) =>[...prev,invitation])
                }
            });
        };
    }, [username]);

    const handleResponse = (invitation, response) => {
        // Handle accept or deny response
        invitation.status = response;
        // Optionally send the response back to the sender or update the backend
    };
    return (
        <div>
            {invitations.map((invitation, index) => (
                <div key={index} className="invitation-popup">
                    <p>{invitation.sender} has invited you to play!</p>
                    <button onClick={() => handleResponse(invitation, 'Accepted')}>Accept</button>
                    <button onClick={() => handleResponse(invitation, 'Denied')}>Deny</button>
                </div>
            ))}
        </div>
    );

}
export default ReceiveInvitation;