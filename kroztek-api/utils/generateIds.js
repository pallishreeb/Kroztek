const User = require("../models/userModel")

// Function to generate the next user ID
async function generateNextUserId(appName) {
    try {
        const lastUser = await User.findOne({}, {}, { sort: { userId: -1 } });

        let nextNumber = 1;

        if (lastUser) {
            const lastUserId = lastUser.userId;
            const lastNumber = parseInt(lastUserId.replace(appName, ''), 10);
            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }

        const nextUserId = `${appName}${nextNumber}`;

        return nextUserId;
    } catch (error) {
        throw error;
    }
}

// Function to generate the next postId based on the highest postId in the database
function generateNextPostId(highestPost) {
    if (highestPost && highestPost?.postId) {
      const highestId = parseInt(highestPost.postId.replace('kroz', ''), 10);
      if (!isNaN(highestId)) {
        return `kroz${highestId + 1}`;
      }
    }
    return 'kroz1'; // Default if there are no existing posts or an error occurs
  }

module.exports = {generateNextUserId, generateNextPostId};