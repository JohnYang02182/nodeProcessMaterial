import axios from 'axios';

// judge the status code
const detectStatusCode = (response) => {
  if (response.status >= 200 && response.status < 300) {
    // Successful response
    return response.data;
  } else {
    // Error response
    throw new Error(`Request failed with status code ${response.status}`);
  }
}

// add get method
export async function get(url){
  try {
    const res = await axios.get(url);
    detectStatusCode(res);
  } catch(err){
    console.error('Error info', err);
  }
}

// add post method
export async function post(url, data){
  try {
    const res = await axios.post(url,data);
    detectStatusCode(res);
  } catch(err){
    console.error('Error info:', err);
  }
}

// add pull method
export async function pull(url, data){
  try {
    const res = await axios.put(url, data);
    return detectStatusCode(res);
  } catch(error) {
    console.error('Error info:', err);
  }
}

// add delete method
export async function del(url){
  try {
    const res = await axios.delete(url);
    return detectStatusCode(res);
  } catch(error) {
    console.error('Error info:', err);
  }
}