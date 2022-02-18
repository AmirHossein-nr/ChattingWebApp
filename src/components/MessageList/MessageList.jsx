import { useChat } from 'context';
import { ChatAvatar } from 'components';
import { groupMessages } from 'helpers';
import { useScrollToBottom } from 'hooks';

export const MessageList = (props) => {
  const { selectedChat } = useChat();
  useScrollToBottom(selectedChat, 'chat-messages');

  return (
    <div className="chat-messages">
      {!!selectedChat.messages.length ? (
        groupMessages(selectedChat.messages).map((m, index) => (
          <div key={index} className="chat-message">
            <div className="chat-message-header">
              <ChatAvatar
                className="message-avatar"
                username={m[0].sender.username}
                chat={selectedChat}
              />
              <div className="message-author">{m[0].sender.username}</div>
            </div>

            <div className="message-content">
              {m.map((individualMessage, index) => (
                <div key={index}>
                  <div className="bubble-container">
                    <div className="bubble" >
                      <div className={`message-text ${!props.darkMode && 'dm'}`}>
                        {individualMessage.text}
                      </div>
                    </div>
                  </div>

                  {!!individualMessage.attachments.length && (
                    <img
                      className="message-image"
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
        <div className="no-messages-yet">No messages yet</div>
      )}
    </div>
  );
};
