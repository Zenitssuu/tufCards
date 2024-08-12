import connection from "../index.js";

const getAllPosts = (req, res) => {
  const sqlQuery = "SELECT * FROM cards";
  connection.query(sqlQuery, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(201).json(data);
  });
};
const addPost = (req, res) => {
  //   console.log(req.body);
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res
      .status(400)
      .json({ message: "Question and answer are required" });
  }

  const sqlQuery = `INSERT INTO cards (question, answer) VALUES (?, ?);`;

  connection.query(sqlQuery, [question, answer], (err, data) => {
    if (err) return res.status(400).json({ message: err.message });
    return res.status(201).json({
      message: "Question successfully added",
      questionId: data.insertId,
    });
  });
};

const editPost = (req, res) => {
  //   console.log(req.body);

  const questionId = req.params.slug;
  const { question, answer } = req.body;
  const sqlQuery = `UPDATE cards SET question = ?, answer = ? WHERE id = ?;`;

  connection.query(sqlQuery, [question, answer, questionId], (err, data) => {
    if (err) return res.status(400).json({ message: err.message });

    return res.status(200).json({ message: "Question successfully updated" });
  });
};

const deletePost = (req, res) => {
  const questionId = req.params.slug;

  const sqlQuery = `DELETE FROM cards WHERE id = ?;`;

  connection.query(sqlQuery, [questionId], (err, data) => {
    if (err) return res.status(400).json({ message: err.message });

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "question not found" });
    }

    return res.status(200).json({ message: "question successfully deleted" });
  });
};
export { getAllPosts, addPost, editPost, deletePost };
