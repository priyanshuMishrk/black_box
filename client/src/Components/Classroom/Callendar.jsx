import React from 'react';

const CalendarIcon = (month , date) => {
  month = "Mar"
  date = 20
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         aria-label="Calendar" 
         role="img"
         className='calIcon'
         viewBox="0 0 512 512">

<path d="M512 455c0 32-25 57-57 57H57c-32 0-57-25-57-57V128c0-31 25-57 57-57h398c32 0 57 26 57 57z" fill="white" stroke="#ffcc00" stroke-width="30"/>
<path d="M484 0h-47c2 4 4 9 4 14a28 28 0 1 1-53-14H124c3 4 4 9 4 14A28 28 0 1 1 75 0H28C13 0 0 13 0 28v157h512V28c0-15-13-28-28-28z" fill="#ffcc00"/>

{/* <g fill="#f3aab9">
  <circle cx="470" cy="142" r="14"/>
  <circle cx="470" cy="100" r="14"/>
  <circle cx="427" cy="142" r="14"/>
  <circle cx="427" cy="100" r="14"/>
  <circle cx="384" cy="142" r="14"/>
  <circle cx="384" cy="100" r="14"/>
</g> */}

      <text id="month" x="125" y="164" fill="#fff" font-family="monospace" font-size="140px" style={{ textAlign : "center" }}>{month}</text>
      <text id="day" x="256" y="400" fill="#ffcc00" font-family="monospace" font-size="256px" style={{ textAnchor: 'middle' }}>{date}</text>
    </svg>
  );
};

export default CalendarIcon;