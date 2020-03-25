const Server = {
  address: 'http://localhost:8080/haikus',
  getHaiku: (user) => {
    const queryString = `/${user}`;
    const searchURL = Server.address + queryString;
    return fetch(searchURL)
      .then(result =>  result.json())
      .catch(err => err.json());
  },
  postHaiku: (imageBlob, haiku, author) => {
    const postURL = `${Server.address}/share`;
    const formData = new FormData();
    // create the form data to send to server
    formData.append('haiku', haiku);
    formData.append('author', author);
    formData.append('haikuCard', imageBlob, 'haikuCard.png');
    const postOptions = {
      method: 'post',
      body: formData
    };
    return fetch(postURL, postOptions)
      .then(result => result.json())
      .catch(err => err);
  }
}

export default Server;
