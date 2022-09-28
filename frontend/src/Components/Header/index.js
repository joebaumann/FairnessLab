import React from 'react';
import './Header.css';

const Header = ({title}) => {
    return (
        <header className="Header">
          <h1 dangerouslySetInnerHTML={{__html: title}} />
        </header>
      );
}

export default Header;