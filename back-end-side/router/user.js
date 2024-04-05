import dotenv from "dotenv";
import express from "express";
import { getAllUser } from "../controller/index.js";
import { User } from "./../models/User.js";
import bcrypt from "bcrypt";
dotenv.config();

const route = express.Router();
//get all user's information
route.get("/", async (req, res) => {
  try {
    const data = await getAllUser();
    res.status(200).json({
      message: "Get all user information successfully",
      content: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//get user's detail
route.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const [user] = await User.findId(id);
    if (user.length >= 1) {
      console.log(user);
      return res.status(200).json({
        message: "Get user detail successfully",
        statusCode: 200,
        content: user[0],
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
});

//create new user
route.post("/signup", async (req, res, next) => {
  try {
    const [checkedUser] = await User.findEmail(req.body.email);
    if (checkedUser.length >= 1) {
      return res.status(402).json({
        message: "Email has already existed",
      });
    } else {
      bcrypt.hash(req.body.password, 12, (err, hash) => {
        console.log(req.body.password);
        if (err) {
          return res.status(401).json({
            message: err.message,
          });
        } else {
          const data = new User(req.body.email, hash);
          data
            .save()
            .then(
              res.status(200).json({
                message: "sign up successfully",
              })
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                message: err.message,
              });
            });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
      message,
    });
    next(error);
  }
});

//login user
route.post("/login", async (req, res, next) => {
  try {
    const [user] = await User.findEmail(req.body.email);

    if (user.length < 1) {
      return res.status(401).json({
        message: "Invalid email or password ",
      });
    } else {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            message: "Invalid email or  password",
          });
        }
        if (result) {
          const lastLogin = new User();
          const { password, ...showUser } = user[0];
          lastLogin.update(req.body.email);
          return res.status(200).json({
            message: "Log in successfully",
            statusCode: res.statusCode,
            content: showUser,
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//Log out user
route.post("/logout", async (req, res, next) => {
  try {
    const [searchUser] = await User.findEmail(req.body.email);

    if (searchUser.length >= 1) {
      const data = new User();
      if (searchUser[0].status === 1) {
        data.logOut(searchUser[0].email);
        return res.status(200).json({
          message: "Log out successfully",
          statusCode: 200,
        });
      } else {
        res.status(404).json({
          message: "Not Found",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});
export default route;
