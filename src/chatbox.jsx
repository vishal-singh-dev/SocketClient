import React, { useState, useRef } from 'react';
import MessageList from './Messages';
import CryptoJS from 'crypto-js';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null);
    //const Key=process.env.AES_KEY;
    //const Vector=process.env.AES_IV;
    const WEBSOCKET_URL='ws://localhost:5000/Data'
const Key='1234567890123678'
const Vector='1234567890123456'
    const connectWebSocket = () => {
        console.log(WEBSOCKET_URL);
        ws.current = new WebSocket(WEBSOCKET_URL);

        ws.current.onopen = () => {
            console.log('WebSocket connection opened');
            setIsConnected(true);
        };

        ws.current.onmessage = (event) => {
            const message = event.data;
            console.log(event.data);
            //var decryptedmsg=decrypt(message);
            //console.log(decryptedmsg);
            setMessages(prevMessages => [...prevMessages,{ text: String(message), from: 'server' }]);
            console.log(messages);
        };

        ws.current.onclose = () => {
            console.log('WebSocket connection closed');
            setIsConnected(false);
        };
    };

    const disconnectWebSocket = () => {
        if (ws.current) {
            ws.current.close();
        }
    };

    const encrypt = (text) => {
        return CryptoJS.AES.encrypt(text, Key, { iv: Vector,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7 }).toString();
    };

    //const decrypt = (encrypted) => {
      //  let bytes = CryptoJS.AES.decrypt(encrypted, Key, { iv: Vector,
        //    mode: CryptoJS.mode.CBC,
          //  padding: CryptoJS.pad.Pkcs7
         //});
       // return bytes.toString(CryptoJS.enc.Utf8);
    //};

    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            setMessages(prevMessages => [...prevMessages, { text: input, from: 'user' }]);
            var encryptedmsg=encrypt(input);
            console.log(encryptedmsg);
            ws.current.send(input);
            setInput('');
        }
    };
    return (
        <div className="flex flex-col w-3/4 h-screen">
        {/* Chat Header */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">A</span>
            <h2 className="text-xl font-bold">Nerve Solutions</h2>
          </div>
          <button
            onClick={isConnected?disconnectWebSocket:connectWebSocket}
            className={`p-2 rounded ${isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-400 hover:bg-blue-500'} text-white`}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
        
        {/* Chat Area */}
        <div className="flex-grow overflow-hidden">
          <MessageList messages={messages} />
        </div>
        
        {/* Input Area */}
        <div className="p-4 bg-white">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-grow p-2 border border-gray-300 rounded-l"
              placeholder="Type your message..."
              disabled={!isConnected}
            />
            <button
              onClick={sendMessage}
              className={`p-2 ${isConnected ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white rounded-r`}
              disabled={!isConnected}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
};

export default Chatbox;
