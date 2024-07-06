import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className="h-96 overflow-y-scroll p-2 border border-gray-200 rounded mb-4">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`p-2 my-1 rounded ${msg.from === 'user' ? 'ml-auto bg-blue-200 text-right' : 'mr-auto bg-gray-200 text-left'}`}
                    style={{ maxWidth: '70%' }}
                >
                    {msg.text}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
