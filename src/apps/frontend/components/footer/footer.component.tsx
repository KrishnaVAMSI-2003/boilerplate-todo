import React from 'react';
import { Link } from 'react-router-dom';
import './footer.component.scss';

export default function Footer(): React.ReactElement {
  return (
    <div className='footer--container'>
      <div className='footer__top__line'></div>
      <div>
        <Link to='/about'>About Us</Link>
      </div>
      <div className='footer__text__muted'>
        &#169; Jalan Technology Consulting, 2022
      </div>
    </div>
  );
}
