const db = require("../db")
const User = require("./user")

class Followers{

    static async getFollowersAndFollowing(userId){
        const query1 = "SELECT COUNT(*) FROM followers WHERE userid = $1"
        const query2 = "SELECT * FROM followers WHERE followerid = $1"
        const followerCount = await db.query(query1, [userId])
        const following = await db.query(query2, [userId])
        return {followerCount: parseInt(followerCount.rows[0].count),
                followingCount: following.rowCount,
                following: following.rows,
            users: await User.getAllUsers()}
    }

    static async addNew(userId, followerId){
       const result = await db.query("INSERT INTO followers (userid, followerid) VALUES ($1, $2) RETURNING*;", [followerId, userId])
       return result.rows[0]
    }
}

module.exports = Followers