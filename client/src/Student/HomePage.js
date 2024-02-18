import React from 'react';


const HomePage = () => {
    const getToken = () => {
    return localStorage.getItem('token');
  }
  const retrievedToken = getToken();
    return(
        <div>
            Token: {retrievedToken}
        </div>
    );
}
export default HomePage