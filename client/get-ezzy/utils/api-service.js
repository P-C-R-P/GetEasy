import 'dotenv/config';
const Base_URL = 'http://localhost:3001';

const apiService = {
  signin: async (user) => {
   return await fetch(`${Base_URL}/user`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
   }).then(res => res.json());
  },
  
    
  checkUser: async () => {
    return await fetch(`${Base_URL}/check-user`, {credentials: 'include'}).then(res => {
      if (res.status === 440 || res.status === 401) return false;
      else return res.json();
    });
  },

  inserItem: async (item) => {
    return await fetch(`${Base_URL}/item`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(item)
      }
    ).then(res => res.json());
  },

  inserAddress: async (address) => {
    return await fetch(`${Base_URL}/address`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(address)
      }
    ).then(res => res.json());
  },

  getAllItems: async () => {
    return await fetch(`${Base_URL}/`, { credentials: 'include' }
  ).then(res => res.json());
  },

  getPlacesNames: async (lat, lng) => {
    const queryParams = encodeURI(`latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_API_KEY}`);
    return await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${queryParams}`
    ).then(res => res.json());
  },

  getOwnItems: async () => {
    return await fetch(`${Base_URL}/${localStorage.getItem('userId')}`
    ).then(res => res.json());
  }

}


export default apiService;