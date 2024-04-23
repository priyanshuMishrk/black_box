import React, { useState } from 'react';
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import ClassImg from "../../Images/liveclass.png"
import Rating from "../../Utils/Rating";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded"

const client = ZoomMtgEmbedded.createClient()

let meetingSDKElement = document.getElementById('meetingSDKElement')

const ClassesOnGoing = () => {

    const [rating, setRating] = useState(0);

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

    return (<>
    <Header/>
    <div className="ongoinclass">
        <img src={ClassImg} alt="class goin on"  className="imgInClass"/>
    </div>
    <div className="rating">
        <div className='textRate gx'> GIVE YOUR RATINGS <span
      style={{ color:  'yellow' , fontSize : '1.5vw', fontWeight:"900", transform: 'scale(2)'}}
    >
      &#9733; {/* Unicode for star */}
    </span></div>
    <Rating value={rating} onChange={handleRatingChange} />
    </div>
    <div className='afterRating'>

    </div>
    <Footer/>
    </>)
}

export default ClassesOnGoing;