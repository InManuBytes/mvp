const Server = {
  address: 'http://localhost:3000/users',
  getHaiku: (user) => {
    const queryString = `?q=${user}`;
    const searchURL = Server.address + queryString;
    return fetch(searchURL)
      .then(result =>  result.json())
      .catch(err => console.log(err));
  }
}

export default Server;
