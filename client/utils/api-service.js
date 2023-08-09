import 'dotenv/config';
const Base_URL = 'http://localhost:3001';

const apiService = {
  logIn: async (user) => {
    return await fetch(`${Base_URL}/user/login`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  },

  signUp: async (user) => {
    return await fetch(`${Base_URL}/user/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  },

  createItem: async (item) => {
    return await fetch(`${Base_URL}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(item),
    }).then((res) => res.json());
  },

  createAddress: async (address) => {
    return await fetch(`${Base_URL}/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(address),
    }).then((res) => res.json());
  },

  getAllItems: async () => {
    return await fetch(`${Base_URL}/all-items`, { credentials: 'include' }).then((res) =>
      res.json()
    );
  },

  getPlaceNames: async (lat, lng) => {
    // change to api key
    const API_KEY = process.env.GOOGLEAPI_KEY;
    console.log(API_KEY);
    const queryParams = encodeURI(
      // key removed
      `latlng=${lat},${lng}&key=${API_KEY}`
    );
    return await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${queryParams}`
    ).then((res) => res.json());
  },

  getOwnItems: async (userId) => {
    return await fetch(`${Base_URL}/${userId}`).then((res) => res.json());
  },

  checkEmail: async (email) => {
    return await fetch(`${Base_URL}/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email }),
    }).then((res) => res.json());
  },
};

export default apiService;
