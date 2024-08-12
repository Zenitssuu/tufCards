import connection from "../index.js";
import { validationResult } from "express-validator";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  // console.log(req.body);

  const error = validationResult(req.body);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { username, email, password } = req.body;

  const tempSqlQuery = `SELECT * FROM USERS WHERE email = ?; `;

  //checking whether user exists or not
  connection.query(tempSqlQuery, [email], async (err, data) => {
    if (err) return res.status(400).json({ error: err.message });

    if (data && data.length) {
      return res.status(400).json({ message: "this user already exists" });
    } else {
      bycrpt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          hash.trim("");
          const adduserQuery = `INSERT INTO USERS (email,username, password) VALUES (?, ?, ?);`;
          connection.query(
            adduserQuery,
            [email, username, hash],
            (err, data) => {
              if (err) {
                return res.status(500).json({ message: err.message });
              }

              return res
                .status(200)
                .json({ message: "user added successfully" });
            }
          );
        }
      });
    }
  });
};
const loginUser = async (req, res) => {
  //   console.log(req.body);
  const secret = process.env.SECRET_KEY;
  //   console.log(secret);

  const error = validationResult(req.body);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;

  const tempSqlQUery = `SELECT * FROM USERS WHERE email = ?;`;

  connection.query(tempSqlQUery, [email], (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!data.length) {
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    }

    bycrpt.compare(password, data[0]["password"], (compErr, compRes) => {
      if (compErr) {
        return res.status(400).json({ message: compErr });
      }
      // console.log(compRes);

      if (compRes) {
        const token = jwt.sign(
          { id: data[0]["id"], is_admin: data[0]["is_admin"] },
          secret,
          { expiresIn: "2h" }
        );
        const tokenQuery = `UPDATE users SET token=? WHERE id=?`;

        connection.query(tokenQuery, [token, data[0]["id"]]);

        return res.status(200).json({ msg: "logged In", token, user: data[0] });
      }

      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    });
  });
};

const getUser = (req,res) => {
    const authToken = req.headers.authorization.split (' ')[1];
    const decode = jwt.verify(authToken,process.env.SECRET_KEY);

    const tempSqlQuery = `SELECT * FROM users WHERE id = ?`

    connection.query(tempSqlQuery,[decode.id], (err,data,fields) =>{
        if(err) throw err

        return res.status(200).json({sucess:true,data:data[0],message:'fetch successfully'})
    })


}
const logoutUser = async () => {};
const deleteUser = async () => {};

export { registerUser, loginUser, logoutUser, deleteUser,getUser };
