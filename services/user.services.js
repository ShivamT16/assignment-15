const User = require("../models/user");

const signup = async (userDetails) => {
  try {
    const user = new User(userDetails);
    const allDetails =
      user.username &&
      user.profilePictureURL &&
      user.phoneNumber &&
      user.email &&
      user.password;
    if (allDetails) {
      const newUser = await user.save();
      console.log("New user created", newUser);
      return newUser;
    } else {
      console.log("Fill all details");
    }
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      console.log(`${user.username} logged in succesfully`);
      return user;
    } else {
      console.log("Invalid credentials");
    }
  } catch (error) {
    throw error;
  }
};

const changePassword = async (email, currentPassword, newPassword) => {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === currentPassword) {
      user.password = newPassword;
      const updatedUser = await user.save();
      console.log("Password changed succesfully", updatedUser);
      return updatedUser;
    } else {
      console.log("Credentials Invalid");
    }
  } catch (error) {
    throw error;
  }
};

const updateProfilePicture = async (email, newPictureUrl) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.profilePictureURL = newPictureUrl;
      const updatedUser = await user.save();
      console.log("Profile picture updated successfully", updatedUser);
      return updatedUser;
    } else {
      console.log("User not found");
    }
  } catch (error) {
    throw error;
  }
};

const updateContactDetails = async (email, updatedDetails) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      Object.assign(user, updatedDetails);
      const updatedUser = await user.save();
      console.log("Contact details updated succesfully", updatedUser);
      return updatedUser;
    } else {
      console.log("User not found");
    }
  } catch (error) {
    throw error;
  }
};

const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    const user = await User.findOne({ phoneNumber });
    if (user) {
      console.log("User found by number", user);
      return user;
    } else {
      console.log("User not found");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signup,
  login,
  changePassword,
  updateProfilePicture,
  updateContactDetails,
  findUserByPhoneNumber,
};
