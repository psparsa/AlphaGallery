export const apiBaseURL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_API_ADDRESS_SERVER_SIDE
    : process.env.NEXT_PUBLIC_API_ADDRESS_CLIENT_SIDE;

export const endPoints = Object.freeze({
  posts: '/posts',
  userInfo: '/users/me',
  login: '/auth/local',
  registerUser: '/auth/local/register',
  publishPost: '/posts',
  uploadImage: '/upload',
});
