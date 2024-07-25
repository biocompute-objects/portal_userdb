import React, { useState, useEffect } from 'react';

const HelpPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showPopup = localStorage.getItem('showHelpPopup');
    if (showPopup !== 'false') {
      setIsVisible(true);
    }
  }, []);

  const handleYesClick = () => {
    window.open('https://wiki.biocomputeobject.org/Buildbcos', '_blank');
  };

  const handleNoClick = () => {
    setIsVisible(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('showHelpPopup', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Need help creating a BCO?</h2>
        <p>We have detailed instructions on our wiki page. Would you like to visit it?</p>
        <button onClick={handleYesClick}>Yes</button>
        <button onClick={handleNoClick}>No</button>
        <button onClick={handleDontShowAgain}>Don't show again</button>
        
      </div>
    </div>
  );
};

export default HelpPopup;
