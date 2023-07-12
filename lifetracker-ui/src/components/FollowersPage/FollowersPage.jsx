import { useEffect, useState } from "react"
import "./FollowersPage.css"
import UserInfo from "./UserInfo/UserInfo"
import axios from "axios"

export default function FollowersPage({appState, setAppState}) {

  const [followInfo, setFollowInfo] = useState({
    followerCount: 0,
    followingCount: 0,
    following: [], 
    users: []
  })
  useEffect(() => {
    const url = "https://life-tracker-uj12.onrender.com/followers"
    axios.get(url, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("lifetracker_token"),
      },
    }).then(res => setFollowInfo(res.data))
  }, [])

  const handleClick = (event) => {
    const url = "https://life-tracker-uj12.onrender.com/followers"
    axios.post(url, {wasFollowedId: parseInt(event.target.name)}, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("lifetracker_token"),
      },
    }).then(res => setFollowInfo(res.data))
    .catch((error) => {
      localStorage.clear();
      setAppState({
        user: {},
        token: undefined,
        isAuthenticated: false,
        nutritions: [],
        sleep: [],
        exercise: [],
      });
    });
  }

  return appState.isAuthenticated? (
    <div className="user-info-fixed">
      <div className="user-info-container">
      <UserInfo followerCount={followInfo.followerCount} followingCount={followInfo.followingCount} username={appState.user.username}/>
      <div className="follow-div">
        <table className="user-table">
          <tr>
            <th>Username</th>
            <th>Joined At</th>
            <th>Follow/Unfollow</th>
          </tr>
            {followInfo.users.map(user => (
            <tr>
              <td>
              {user.username}
              </td>
              <td>
              {user.created_at.split("T")[0]}
              </td>
              <td>
                {followInfo.following.some(otherUser => parseInt(otherUser.userid) === parseInt(user.id)) ?
                <button className="border-button" name={user.id} onClick={handleClick}>
              Unfollow
            </button>:
              
             <button className="fill-button" name={user.id} onClick={handleClick}>
             Follow
           </button>}
              </td>
              </tr>))}
        </table>
      </div>
      </div>
    </div>) : <h1 style={{color: "white"}}>Log in</h1>

}
