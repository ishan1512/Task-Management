import React, { useEffect, useState, useRef } from 'react';

const ChatPage = () => {
  const socket = true;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chatMessage', input);
      setInput('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-xl mx-auto mt-24 p-4">
      <h2 className="text-xl font-bold mb-4">Team Chatroom</h2>
      <div className="bg-white rounded-xl shadow p-4 h-96 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="border-b pb-2">
            <span className="font-semibold text-sm text-blue-600">{msg.user}</span>{' '}
            <span className="text-xs text-gray-400">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
            <p className="text-gray-800">{msg.text}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-2"
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;