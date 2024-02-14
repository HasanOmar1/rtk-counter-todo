import STATUS_CODE from "../constants/statusCode.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "7days",
  });
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please fill all fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nameExist = await User.findOne({ name });
    if (nameExist) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Name already taken");
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(STATUS_CODE.CREATED);
      res.send({
        data: user,
        token: generateToken(user._id, user.email),
      });
    }
  } catch (error) {
    next(error);
  }
};

//  Login to account
//  POST /api/v1/users/login
//  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please provide your email and password");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id, user.email),
      });
    } else {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      req.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Users not found");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};
