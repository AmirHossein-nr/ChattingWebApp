import React, { useEffect, useMemo, useState } from 'react';
import { useChat } from 'context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail, ChatToolbar, ChatInput, MessageList } from 'components';

export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
  } = useChat();
  const [darkMode, setDarkMode] = useState(false);
  const [startTime, setStart] = useState(19);
  const [endTime, setEnd] = useState(6);
  const time = useMemo(() => new Date(), []);
  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);
  useEffect(() => {
    console.log('Selected Chat: ', selectedChat);
  }, [selectedChat]);
  useEffect(() => {
    if (time.getHours() >= startTime
      || time.getHours() <= endTime ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [time, startTime, endTime]);


  return (
    <>
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={chat => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatClick(chat);
            }
            setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={chat => {
            if (selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(
              myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id),
            );
          }}
          onNewMessage={(chatId, message) => {
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            const filteredChats = myChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
            );
          }}
        />
      )}
      <div className={`chat-container`}>
        <LeftRail sdm={setDarkMode} dm={darkMode} start={setStart} end={setEnd} />
        <div className={`current-chat  ${darkMode && 'dark-mode'}`}>
          {selectedChat ? (
            <div className='chat'>
              <ChatToolbar />
              <MessageList darkMode={darkMode} />
              <ChatInput />
            </div>
          ) : (
            <div className='no-chat-selected'>
              <img
                src='/img/pointLeft.png'
                className='point-left'
                alt='point-left'
              />
              Select A Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};
