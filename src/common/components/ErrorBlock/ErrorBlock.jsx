import React from 'react';
import './ErrorBlock.scss';

export const ErrorBlock = ({ errorArr, id, }) => {
  return (
    <React.Fragment>
      {errorArr.length !== 0 ? errorArr.map(error => String(error.id) === String(id) &&
        error.errorText.map((text, index) => <React.Fragment key={index}><span className='error-span' >{text}</span><br /></React.Fragment>)) : null}
    </React.Fragment>
  );
};
