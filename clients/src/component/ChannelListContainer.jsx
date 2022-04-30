import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";
const cookies = new Cookies();
const Sidebar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} width="30" alt="" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} width="30" alt="" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Header</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => (channel.type = "team"));
};
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => (channel.type = "messaging"));
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
  setCreateType,
}) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("userId");
    cookies.remove("phoneNumber");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    window.location.reload();
  };
  const filters = { numbers: [client.userID] };
  return (
    <>
      <Sidebar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="team"
              createType={createType}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              createType={createType}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toogle, setToogle] = useState(false);
  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
      </div>
      <div
        className="channel-list__container-responsive"
        style={{ left: toogle ? "0%" : "100%", backgroundColor: "#005ff" }}
      >
        <div
          className="channel-list__container-toogle"
          onClick={() => setToogle((prevToggle) => !prevToggle)}
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
          setToogle={setToogle}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
