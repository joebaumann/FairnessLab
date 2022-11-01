import React from 'react';
import './Hamburger.css';

const Hamburger = ({isOpen}) => {
  return (
    <div className='hamburger'>
        <div className={isOpen? 'burger burger1 open' : 'burger burger1 closed'}/>
        <div className={isOpen? 'burger burger2 open' : 'burger burger2 closed'}/>
        <div className={isOpen? 'burger burger3 open' : 'burger burger3 closed'}/>
    </div>
  );
}

export default Hamburger;