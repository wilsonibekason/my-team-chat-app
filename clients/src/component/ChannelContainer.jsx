import React from "react";
import { Channel, useChatContext, MessageTeam } from "stream-chat-react";
import { ChannelInner, EditChannel, CreateChannel, TeamMessage } from "./";

const ChannelContainer = ({
  isEditing,
  setIsCreating,
  SetIsEditing,
  isCreating,
  createType,
}) => {
  const channel = useChatContext();

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }
  if (isEditing) {
    return (
      <div className="channel__container">
        <CreateChannel SetIsEditing={SetIsEditing} />
      </div>
    );
  }

  const EmptyState = () => {
    return (
      <div className="channel-empty__container">
        <p className="channel-empty__first">This is the beg</p>
        <p className="channel-empty__second">Start creating Emojis and gifs</p>
      </div>
    );
  };
  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner SetIsEditing={SetIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
