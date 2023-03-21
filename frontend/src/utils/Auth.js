//export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://api.mesto1.peshekhonova.nomoredomains.work'; //удаленный бекенд
// export const BASE_URL = 'http://localhost:3001'

function checkResponse(res) {
    if(res.ok) {
      return res.json();
      
    } 
    return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    return checkResponse(res)
  })
};

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    return checkResponse(res)
  })
  // .then((data) => {
  //   localStorage.setItem('jwt', data.token)
  //   return data
  // })
}; 

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
  .then((res) => {
    return checkResponse(res)
  })

}