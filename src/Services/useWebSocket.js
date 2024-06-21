import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = (url) => {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: url,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected');
                setIsConnected(true);
            },
            onDisconnect: () => {
                console.log('Disconnected');
                setIsConnected(false);
            },
            onWebSocketError: (error) => {
                console.error('WebSocket Error', error);
            }
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, [url]);

    return { client, isConnected };
};

export default useWebSocket;
