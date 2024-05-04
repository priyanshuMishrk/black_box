import React, { useState } from "react";
import Footer from "../../Components/Common/Footer";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Logo from "../../blackbox-logo-01.png";
const StartClass = () => {
  const baseURL = window.location.origin; 
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
//     const container = document.querySelector('.myCallContainer');
// console.log('Container Width:', container.clientWidth); 
// console.log('Container Height:', container.clientHeight); 

    let myMeeting = async (element) => {
      const role = ZegoUIKitPrebuilt.Host;
        const appID = 1145153958;
      const serverSecret = "b4a5abb018a8a680858acdd6b1200119";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid,  randomID(5),  randomID(5));

      const zp = await ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          config: {
            role,
          },
        },
        showRemoveUserButton : true,
        branding : {
          logoURL: Logo
        },
        showTurnOffRemoteCameraButton : true,
        showTurnOffRemoteMicrophoneButton : true,
        whiteboardConfig: {
          showAddImageButton: false, 
          showCreateAndCloseButton: true 
        },
        sharedLinks: [
            {
              name: 'CopyLink',
              url:
               window.location.protocol + '//' + 
               window.location.host + "/join/" +
                roomid,
            },
          ],
          showLeavingView : false,
          onLeaveRoom: () => {
            window.location.href = `${baseURL}/profile`;  // Replace with your target URL 
          }
      });

    }

    return (<>
    <div className="myCallContainer gl"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}></div>
    <Footer/>
    </>)
}

export default StartClass;