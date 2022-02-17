import { useChat } from 'context';
import { useResolved } from 'hooks';
import { ChatList } from 'components';
import { RailHeader } from 'components';
import { Loader } from 'semantic-ui-react';

export const LeftRail = (props) => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats);

  return (
    <div className="left-rail">
      <RailHeader sdm={props.sdm} dm={props.dm}/>
      {chatsResolved ? (
        <>
          {!!myChats.length ? (
            <div className={`chat-list-container ${!props.dm && "loading-blue"}`}>
              <ChatList />
            </div>
          ) : (
            <div className={`chat-list-container no-chats-yet ${!props.dm && "loading-blue"}`}>
              <h3>No Chats Yet</h3>
            </div>
          )}
          <button className="create-chat-button" onClick={createChatClick}>
            Create Chat
          </button>
        </>
      ) : (
        <div className={`chats-loading ${!props.dm && "loading-blue"}`}>
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};
