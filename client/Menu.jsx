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
      ],
    }
  }

  render() {
    const { links } = this.state;
    const { pages, onClick, active } = this.props
    return (
      <div className="ui secondary pointing menu">
        {pages.map(page => {
          const className = (page === active) ? 'active item' : 'item';
          return <a key={page} className={className} onClick={() => onClick(page)}>{page}</a>;
        })}
        <div className="right menu">
          {links.map(link => {
            const aclassName = `ui ${link.name} item`;
            const iclassName = `ui ${link.name} icon`;
            return (
              <a key={link.name} className={aclassName} href={link.url} target="_blank">
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
