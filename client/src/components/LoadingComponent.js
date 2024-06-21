import React from 'react';
import biocomputing from "../images/biocomputing.gif"
import '../App.css'; // Ensure you have styles for the loading icon


const LoadingIcon = () => {
  return (
    <div className="loading-icon">
      <img src={biocomputing} alt='loading...' />
    </div>
  );
};

export default LoadingIcon;
