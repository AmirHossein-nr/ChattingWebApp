import { useChat } from 'context';
import { useState, useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import { ImageUpload } from 'components';
import { sendMessage } from 'react-chat-engine';

export const ChatInput = () => {
  const { chatConfig, selectedChat } = useChat();
  const [chatInputText, setChatInputText] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const inputRef = useRef(null);
  const [image, setImage] = useState();

  const sendChatMessage = () => {
    if (selectedChat && chatInputText) {
      setChatInputText('');
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
  };

  const onFileAttach = file => {
    setImage(file);
    setImageModalOpen(true);
  };

  // function checkRtl(s) {
  //   let ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
  //     rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
  //     rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');
  //   return rtlDirCheck.test(s);
  // }


  return (
    <>
      <div className="chat-controls">
        <div
          onClick={() => {
            const input = inputRef.current;
            if (input) {
              input.value = '';
              input.click();
            }
          }}
          className="attachment-icon"
        >
          <Icon name="attach" color="grey" />
        </div>
        <input
          dir={'auto'}
          value={chatInputText}
          className="chat-input"
          placeholder="Send a message"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendChatMessage();
            }
          }}
          onChange={e => setChatInputText(e.target.value)}
        />
        <div onClick={sendChatMessage} className="send-message-icon">
          <Icon name="send" color="grey" />
        </div>
      </div>

      <input
        type="file"
        ref={inputRef}
        className="file-input"
        accept="image/jpeg,image/png"
        onChange={e => {
          const file = e.target?.files?.[0];
          if (file) {
            onFileAttach(file);
          }
        }}
      />

      {imageModalOpen && !!image && (
        <ImageUpload
          file={image}
          mode="message"
          onSubmit={() => {
            sendMessage(
              chatConfig,
              selectedChat.id,
              {
                text: chatInputText,
                files: [image],
              },
              () => {
                setImage(null);
                setChatInputText('');
              },
            );
          }}
          close={() => setImageModalOpen(false)}
        />
      )}
    </>
  );
};
