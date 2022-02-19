import { useChat } from 'context';
import { ChatAvatar } from 'components';
import { groupMessages } from 'helpers';
import { useScrollToBottom } from 'hooks';

export const MessageList = (props) => {
  const { selectedChat,chatConfig } = useChat();
  useScrollToBottom(selectedChat, 'chat-messages');
  const myUsername = chatConfig.userName;
  // let prevAuthor = ''
  return (
    <div className='chat-messages'>
      {!!selectedChat.messages.length ? (
        groupMessages(selectedChat.messages).map((m, index) => (
          <div key={index} className='chat-message '>
            <div className={`chat-message-header ${myUsername===m[0].sender.username && 'mine-container'}`}>
              <ChatAvatar
                className='message-avatar'
                username={m[0].sender.username}
                chat={selectedChat}
              />
              <div className={`message-author ${!props.darkMode && 'dm'}`}>{m[0].sender.username}</div>
            </div>

            <div className={`message-content `}>
              {m.map((individualMessage, index) => (
                <div key={index} className={`${!individualMessage.attachments.length && 'bubble-container' }
                ${myUsername===m[0].sender.username && 'mine-container'}`}>
                  <div
                    className={`${!individualMessage.attachments.length &&'bubble'} ${myUsername===m[0].sender.username && 'mine'}`}>
                    <div
                      className={`message-text ${myUsername!==m[0].sender.username && 'dm'}`}>
                      {individualMessage.text}
                    </div>
                  </div>
                  {!!individualMessage.attachments.length && (
                    <img
                      className='message-image'
                      src={individualMessage.attachments[0].file}
                      alt={individualMessage.id + '-attachment'}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className='no-messages-yet'>No messages yet</div>
      )}
    </div>
  );
};
