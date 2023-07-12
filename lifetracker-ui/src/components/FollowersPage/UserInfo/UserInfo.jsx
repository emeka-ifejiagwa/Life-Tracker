import { MdOutlineAccountCircle } from "react-icons/md";
import { IconContext } from "react-icons";
import "./UserInfo.css";

export default function UserInfo({followerCount, followingCount}) {
  return (
    <header className="user-info-header">
      <div className="user-name-container">
      <IconContext.Provider
        value={{ color: "var(--button-color)", size: "6.1rem" }}
      >
        <MdOutlineAccountCircle
          className="user-icon"
          style={{ padding: "0", margin: "0" }}
        />
      </IconContext.Provider>
      <p>Username here</p>
      </div>
      {/* <div className="user-info-count"> */}
      <div className="follower-count">
        <h1 className="info-h1">{followerCount}</h1>
        <p className="count-name">Followers</p>
      </div>
      <div className="following-count">
      <h1 className="info-h1">{followingCount}</h1>
        <p className="count-name">Following</p>
      </div>
      {/* </div> */}
    </header>
  );
}
