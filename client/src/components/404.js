import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/details.css';

function Pagenotfound() {
  return (
    <div className='pnf'>
      <div className='error-text'>Error 404</div>
      <div className='not-found-text'>Nothing to see here.</div>
      <Link to='/' className='back-button'>
        <span className='button-text'>Go Back</span>
        <div className='button-bg'></div>
      </Link>
    </div>
  );
}

export default Pagenotfound;
