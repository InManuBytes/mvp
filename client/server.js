const Server = {
  address: 'http://localhost:8080/haikus',
  getHaiku: (user) => {
    const queryString = `/${user}`;
    const searchURL = Server.address + queryString;
    return fetch(searchURL)
      .then(result =>  result.json())
      .catch(err => console.log('ERROR WITH REQ', err));
  },
  postHaiku: () => {
    const postURL = `${Server.address}/share`;
    const postOptions = {
      method: 'post',
      body: JSON.stringify('Hello World')
    };
    return fetch(postURL, postOptions)
      .then(result => result.json())
      .catch(err => console.log('ERROR POSTING ', err));
  }
}

export default Server;
