import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {
          name: 'twitter',
          url: 'https://twitter.com/BestTweetKus'
        },
        {
          name: 'github',
          url: 'https://github.com/manuelag19'
        }
      ]
    }
  }

  render() {
    const { links } = this.state;
    return (
      <div className="ui secondary pointing menu">
        <a className="active item">
          Home
        </a>
        <a className="item">
          About
        </a>
        <div className="right menu">
          {links.map(link => {
            const aclassName = `ui ${link.name} item`;
            const iclassName = `ui ${link.name} icon`;
            return (
              <a className={aclassName} href={link.url} target="_blank">
                <i className={iclassName}></i>
              </a>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Menu;
