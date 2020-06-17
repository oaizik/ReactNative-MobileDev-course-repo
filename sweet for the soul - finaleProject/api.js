import consts from './consts/consts.json';

module.exports = {
  async userSignin(userEmail, userPassword) {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let response = await fetch(`${consts.server_url}/user/signin/${userEmail}&${userPassword}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('authentication error, ', error));
    console.log(response)
    if(response && response.user) {
      return(response.user);
    } else if (response && !response.user) {
      return('error');
    }
  },

  async userSingup(userName, userEmail, userPassword, userPhone, userAddress) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({"name":`${userName}`,"email":`${userEmail}`,"password":`${userPassword}`,"phone":`${userPhone}`,"address":`${userAddress}`,"isAdmin":false});
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let response = await fetch(`${consts.server_url}/user/signup`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('authentication error, ', error));
    if(response && response.user) {
      return(response.user);
    } else {
      return('error');
    }
  },

  async fetchOpenDeliverys() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let response = await fetch(`${consts.server_url}/delivery/open`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
    if (response.length > 0) {
      return(response);
    } else {
      return('error');
    }
  },

  async assignDelivery(selectedId, uId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({"userId":`${uId}`});
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let response = await fetch(`${consts.server_url}/delivery/assign/${selectedId}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
    return(response);
  },

  async fetchUserDeliverys(uId) {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let response = await fetch(`${consts.server_url}/delivery/open/user/${uId}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
    if (response.length > 0) {
      return(response);
    } else {
      return('error');
    }
  },

  async removeDelivery(selectedId) {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    let response = await fetch(`https://sweet-for-the-soul-server.herokuapp.com/delivery/cancelAssign/${selectedId}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
    return(response);
  },

  async completeDelivery(selectedId, uId) {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    let response = await fetch(`${consts.server_url}/delivery/complete/${selectedId}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
    return(response);
  },

  async incrementNumOfDeliverys(uId) {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    let response = await fetch(`${consts.server_url}/user/incdeliveries/${uId}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
    return(response);
  }
}