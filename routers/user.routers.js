const express = require("express");
const userRouter = express.Router();

const {
  signup,
  login,
  changePassword,
  updateProfilePicture,
  updateContactDetails,
  findUserByPhoneNumber,
} = require("../services/user.services");

userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
  try {
    const savedUser = await signup(req.body);
    if (savedUser) {
      res.status(201).json({ "Signup success": savedUser });
    } else {
      res.status(401).json({ error: "Fill all details!" });
    }
  } catch (error) {
    res.status(500).json({ "signup failed": error });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    if (user) {
      res.status(200).json({ "Login success": user });
    } else {
      res.status(404).json({ error: "Credentials Invalid" });
    }
  } catch (error) {
    res.status(500).json({ "Login failed": error });
  }
});

userRouter.post("/passwordChange", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await changePassword(email, currentPassword, newPassword);
    if (user) {
      res.status(200).json({ "Password changed succesfully": user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ "Changing Password failed": error });
  }
});

userRouter.post("/profile", async (req, res) => {
  try {
    const { email, newPictureUrl } = req.body;
    const user = await updateProfilePicture(email, newPictureUrl);
    if (user) {
      res.status(200).json({ "Profile picture changed succesfully": user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ "Changing profile picture failed": error });
  }
});

userRouter.post("/updateContact/:email", async (req, res) => {
  try {
    const user = await updateContactDetails(req.params.email, req.body);
    if (user) {
      res.status(200).json({ "Contact updated successfully": user });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ "Updating contact failed": error });
  }
});

userRouter.get("/phone/:phoneNumber", async (req, res) => {
  try {
    const user = await findUserByPhoneNumber(req.params.phoneNumber);
    if (user) {
      res.status(200).json({ "User found": user });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ "error finding user": error });
  }
});

module.exports = userRouter;
