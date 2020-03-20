const Server = {
  address: 'http://localhost:8080/haikus',
  getHaiku: (user) => {
    const queryString = `/${user}`;
    const searchURL = Server.address + queryString;
    return fetch(searchURL)
      .then(result =>  result.json())
      .catch(err => console.log(err));
  }
}

export default Server;
