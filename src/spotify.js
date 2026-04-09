// src/spotify.js

// Hardcoded for stability
const CLIENT_ID = "cea88b1b1cbc42fe931cb9793f6b2bf7";
const CLIENT_SECRET = "20a67678c57045188f4409def581be8b";
const REFRESH_TOKEN = "AQBsia6bYd3jjA0-3FbVCw6fkkvO01V1TqYrLBYd0LhSJGsCGqgnzCs6tN8le-HXjs0c5esCOzUU8GBY_RSETx0zHYWf2In5ZR9B75Wu11PxatTBgLQ5w-VwDffhvJM_ZmE";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const getAccessToken = async () => {
  const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};