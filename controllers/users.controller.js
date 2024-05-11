const { send_OTP } = require("../auth/verfication");
const crypto = require("crypto");
const Users = new (require("../services/users.service"))();
const fs = require("fs");
const { token } = require("morgan");
const imagePath = '../images/blackbox-logo-01.png'
let userData;

class User_Ctrl {
  socialUser = async (req, res) => {
    setTimeout(() => {
      userData = null;
    }, 10000);
    try {
      if (userData) {
        res.status(200).json(userData);
        userData = null;
      }
    } catch (err) {
      return res.status(400).json(err.message);
    }
  };

  allUsers = async (req, res) => {
    try {
      const result = await Users.allUsers();
      res.status(200).json({ totalUsers: result.Users.length, ...result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  blackboxusers = async (req, res) => {
    try {
      const result = await Users.allUsers(Number(req.user_id));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  addFriend = async (req, res) => {
    try {
      const result = await Users.AddFriend(
        Number(req.user_id),
        Number(req.params.id),
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  acceptFriend = async (req, res) => {
    try {
      const result = await Users.AcceptFriend(Number(req.params.id));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  dismissFriend = async (req, res) => {
    try {
      const result = await Users.DismissFriend(Number(req.params.id));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  allFriendReqs = async (req, res) => {
    try {
      const result = await Users.FriendRequests(Number(req.user_id));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  allFriends = async (req, res) => {
    try {
      const result = await Users.areFriends(Number(req.user_id));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  verification = async (req, res) => {
    try {
      //email
      const otp = crypto.randomInt(100000, 999999);
      const verifyingE = await Users.userCheck(req.body.email, otp);
      if (verifyingE) {
        send_OTP(req.body.email, otp);
        return res.status(200).json({ status: true });
      } else {
        return res.status(400).json({ status: false });
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  verifying = async (req, res) => {
    try {
      const result = await Users.matchOtp(req.body.email, Number(req.body.otp));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  hostProfile = async (req, res) => {
    try {
      const result = await Users.hostProfile(Number(req.params.id));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  forgetPass = async (req, res) => {
    try {
      const result = await Users.forgetPass(req.body.email, req.body.password);
      if (typeof result === "object") {
        return res.status(202).cookie("token_key", result.token).json(result);
      }
      res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  profile = async (req, res) => {
    try {
      const result = await Users.profile(req.user_id);
      if (typeof result === "object") {
        return res.status(202).cookie("token_key", result.token).json(result);
      }
      res.status(400).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  editProfile = async (req, res) => {
    try {
      const result = await Users.editProfile(req.body, req.user_id);
      console.log(result, "the object");
      if (typeof result === "object") {
        return res.status(202).json(result);
      }
      res.status(406).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  signup = async (req, res) => {
    try {
      let data = req.user;
      if (data.hasOwnProperty("provider")) {
        delete data.provider;
      }
      // console.log(json.parse(data) , "kkkkkkkkkkkkkokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
      if (req.hasOwnProperty("user")) {
        // console.log(req.user, "facebook/google");
        data = {
          provider: req.user.provider,
          img_thumbnail: req.user.photos[0].value,
          first_name: req.user.name.givenName,
          last_name: req.user.name.familyName,
          email: req.user.emails[0].value,
          // email : "priyanshumishra@gmail.com",
          password: req.user.id,
        };
      }
      else if (req.hasOwnProperty("_json") && req.user.provider == "facebook"){
        data = {
          provider: req.user.provider,
          img_thumbnail: req.user.photos[0].value,
          first_name: req.user.name.givenName,
          last_name: req.user.name.familyName,
          email: req.user.emails[0].value,
          // email : "priyanshumishra@gmail.com",
          password: req.user.id,
        };
      }
      const result = await Users.signup(data);
      if (typeof result === "object") {
        if (result.hasOwnProperty("token")) {
          console.log(result, "vikash");
          userData = result;
          res.setHeader('Content-Type', 'text/html');

  // Send HTML content as the response
        return res.send(`<html>
        <head>
        <title>HTML Response</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: black;
            padding: 1vw;
          }
          h1 {
            color: #ffcc00;
            font-size: 1.5vw !important;
          }
          button {
            padding: 1vw 1.2vw;
            background-color: #ffcc00;
            color: #fff;
            border: none;
            cursor: pointer;
            font-size: 1vw !important;
            border-radius: 0.5vw;
          }
        </style>
        </head>
        <body>
        <img src=${imagePath} class="jj" alt="Sample Image" />
        <h1 class="ll">Hello ${result.result.first_name} ${result.result.last_name}, you are logged in successfully.Please click on the Profile button (right hand side) to visit your page.</h1>
        <button onclick="window.close()">Close Page</button>
        </body>
        </html>`);
          // return res
          //   .status(400)
          //   .send(
          //     `Hello ${result.result.first_name} ${result.result.last_name}, you are logged in successfully. \nPlease click on the Profile button (right hand side) to visit your page.`,
          //   );
        } else {
          return res.status(201).json(result);
        }
      }
      res.status(400).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  logout = async (req, res) => {
    try {
      fs.writeFileSync("./youtube.json", JSON.stringify({ id: null }, null, 4));
      userData = null;
      req.logout();
      console.log("print");
    } catch (error) {
      //only for the passport was...
    }
    res
      .status(200)
      .clearCookie("token_key")
      .send("The user is logged out now.");
  };

  login = async (req, res) => {
    try {
      if (req.body.hasOwnProperty("email")) {
        const result = await Users.loginWithEmailPass(
          req.body.email,
          req.body.password,
        );
        if (typeof result === "object") {
          return res.status(202).cookie("token_key", result.token).json(result);
        }
        res.status(400).send(result);
      } else if (req.body.hasOwnProperty("phone_num")) {
        // console.log("The phone number login...");
        const result = await Users.loginWithPhoneOTP(req.body);
        // console.log(result, "result");
        if (typeof result === "object") {
          if (result.hasOwnProperty("token")) {
            res.cookie("token_key", result.token);
          }
          return res.status(200).json({
            to: result.to,
            channel: result.channel,
            status: result.status,
            dateCreated: result.dateCreated,
            token: result.token || null,
          });
        }
        res.status(400).send(result);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  };
}

module.exports = User_Ctrl;
