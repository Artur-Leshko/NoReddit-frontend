import React from 'react';
import noreddit404 from '../../../images/noreddit404.png';
import './notfound.scss';

export const NotFound = () => {
  return (
    <div className='notfound'>
      <div className='notfound__title'>404 Not Found</div>
      <div className='notfound__image'><img src={noreddit404} alt='404' /></div>
      <div className='notfound__text'>Looks like you went the wrong way :(</div>
    </div>
  );
};
