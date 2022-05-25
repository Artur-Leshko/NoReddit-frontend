export const userSelector = state => state.currentUser;
export const anyUserSelector = state => state.user;
export const followersSelector = state => state.followers;
export const followedSelector = state => state.followed;
export const userFollowedSelector = state => state.currentUserFollowed;
export const popularPostsSelector = state => state.popularPosts;
export const userPostsSelector = state => state.userPosts;
export const upvotedPostsSelector = state => state.votedPosts.up;
export const downvotedPostsSelector = state => state.votedPosts.down;
export const separatePostSelector = state => state.separatePost;
export const postCommentsSelector = state => state.postComments;
export const upvotedCommentsSelector = state => state.votedComments.up;
export const downvotedCommentsSelector = state => state.votedComments.down;
