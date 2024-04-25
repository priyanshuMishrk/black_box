import React, { useState } from "react";
import Footer from "../../Components/Common/Footer";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Logo from "../../blackbox-logo-01.png";
const Room = () => {
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

    let myMeeting = async (element) => {
      const role = ZegoUIKitPrebuilt.Host;
        const appID = 1145153958;
      const serverSecret = "b4a5abb018a8a680858acdd6b1200119";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid,  randomID(5),  randomID(5));

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          config: {
            role,
          },
        },
        showRemoveUserButton : true,
        branding : {
          logoURL: Logo
        },
        sharedLinks: [
            {
              name: 'CopyLink',
              url:
               window.location.protocol + '//' + 
               window.location.host + "/join/" +
                roomid,
            },
          ]
      });

    }

    return (<>
    <div className="myCallContainer gl"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}></div>
    <Footer/>
    </>)
}

export default Room;