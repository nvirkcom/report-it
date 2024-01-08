const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));

const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Required Password and Username",
    });
  }

  try {
    const usersFound = await knex("user").where({
      username: req.body.username,
    });

    if (usersFound.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const userData = usersFound[0];

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    res.status(201).json({
      token: jwt.sign(
        {
          id: userData.id,
        },
        process.env.SECRET_KEY
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error! Try Again",
    });
  }
};

const register = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Required Password and Username",
    });
  }

  try {
    const usersFound = await knex("user").where({
      username: req.body.username,
    });

    if (usersFound.length > 0) {
      return res.status(404).json({
        message: "Username Not Available",
      });
    }

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await knex("user").insert({
      username: username,
      password: hashedPassword,
    });

    const newUserId = result[0];
    const createdUser = await knex("user").where({ id: newUserId });

    res.status(201).json({
      token: jwt.sign(
        {
          id: createdUser.id,
        },
        process.env.SECRET_KEY
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error! Try Again",
    });
  }
};

module.exports = {
  login,
  register,
};
