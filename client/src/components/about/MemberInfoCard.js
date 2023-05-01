import React from 'react';
import MemberInfo from './MemberInfo.js';

function MemberList() {
  return (
    <div>
      {Object.keys(MemberInfo).map((group) => (
        <div key={group} className="content-box-md">
          <h2>{MemberInfo[group].heading}</h2>
          <div className='row'>
            {MemberInfo[group].people.map((person) => (
              <div md={1} lg={3} key={person.name} className='member'>
                <a href={person.url}>
                  <img src={person.image} alt={person.imageText} className="member-image"/>
                </a>
                <h3>{person.name}</h3>
                <p>{person.position}</p>
                <p>{person.department}</p>
                <p>{person.institution}</p>
                <p>{person.location}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemberList;