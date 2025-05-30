import axios from 'axios';

export const fetchAPI = async (type = "get", url = "", payload = {}) => {
 const isValid = ['get', 'post', 'delete', 'patch'].includes(type);
  if (!isValid) {
    throw new Error(`Type ${type} is an invalid HTTP method`);
  }

  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/${url}`
  try {
    if (type === 'get' || type === 'delete') {
      const info = await axios[type](apiUrl, {
        params: payload
      });

      return info.data;
    }
    const info = await axios[type](apiUrl, payload);
    
    return info.data;
  } catch (e) {
    
    throw new Error(`${e.message}`);
  }
}