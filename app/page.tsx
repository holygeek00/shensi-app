'use client'

import React, { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { Markdown } from '@lobehub/ui';
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const endOfMessagesRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat whenever messages update
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full md:max-w-md  lg:max-w-lg xl:max-w-xl mx-auto h-screen from-blue-500 to-pink-500">
      <div className="flex-grow overflow-auto">
        {messages.map(m => (
          <div className={`chat flex flex-col ${m.role === 'user' ? 'items-start' : 'items-end'}`} key={m.id}>
            <div className="flex items-center mt-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img alt="Avatar" src={'/灯泡.PNG'} />
                </div>
              </div>
              <div className="chat-header ml-2">
                <strong>{m.role === 'user' ? 'User' : 'AI'}</strong>
            
              </div>
            </div>
            <div className={`chat-bubble rounded px-4 py-2 shadow my-1 max-w-xs  md:max-w-md lg:max-w-lg ${m.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              <Markdown className='text-black'>
                
                {m.content}
                
                </Markdown>
            </div>
            <div className="chat-footer text-xs opacity-50 my-1">
              {/* Status like 'Delivered' or 'Seen at ...' */}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={handleSubmit} className="sticky bottom-0 bg-white py-2">
        <input
          className="w-full p-2 border border-gray-300 rounded shadow"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
