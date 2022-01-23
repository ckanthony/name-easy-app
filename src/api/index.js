import axios from 'axios';

export async function postNameEasy(params) {
  const result = await axios.post(`${process.env.REACT_APP_API_URL}/name-easy`, {
    data: params
  }, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  });
  if (!result.data) {
    throw new Error('user_not_ready');
  }
  return result.data;
}
