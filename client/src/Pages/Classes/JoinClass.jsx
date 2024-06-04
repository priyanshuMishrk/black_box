import React, { useRef , useEffect, useState} from "react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Logo from "../../blackbox-logo-01.png";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import PH from "../../Images/PHF.png"

const JoinClass = () => {
  const [opc, setOpc] = useState(true)
  function troll() {
    setOpc(false)
  }



  function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  
  const {roomid} = useParams()
  const [shouldReload, setShouldReload] = useState(true);
    const role = ZegoUIKitPrebuilt.Audience;

    let myMeeting = async (element) => {
      console.log(345)
      const appID = 1145153958;
      const serverSecret = "b4a5abb018a8a680858acdd6b1200119";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid,  randomID(5),  randomID(5));
      
      var zp = ZegoUIKitPrebuilt.create(kitToken);
    
      
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          config: {
            role,
          },
        },
        branding : {
          logoURL: Logo,
        },
        showUserList: true,
        sharedLinks: [
            {
              name: 'CopyLink',
              url:
               window.location.protocol + '//' + 
               window.location.host + window.location.pathname +
                '?roomID=' +
                roomid,
            },
          ],
          onJoinRoom : troll
      });
      
    }
    const myCallContainerRef = useRef(null);

    useEffect(() => {
        // Access the div element using the ref
        const element = myCallContainerRef.current;

        if (element) {
            myMeeting(element);
          }
    }, []);
    return (<>
    <div className={opc ? "opc0":""}>
      <img src={PH} className="classMeet"/>
    </div>
    <div className="myCallContainer gl"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}>
      </div>
    <Footer/>
    </>)
}

export default JoinClass;