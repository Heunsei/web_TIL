const { render } = require("ejs");
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// 입출력 관련해서 도움을 주는 설정들
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1234",
  database: "express",
});

connection.connect((callback) => {
  console.log(callback);
});

app.listen(8080, () => {
  console.log("8080시작중");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/list", (req, res) => {
  connection.query("SELECT * FROM forum", (err, result) => {
    if (err) res.status(500).send(err);
    // res.render & render.json 같이 사용 불가.
    res.render("list.ejs", { titles: result });
  });
});

app.get("/time", (req, res) => {
  let time = new Date();
  console.log(time);
  res.json(time);
});

app.get("/write", (req, res) => {
  res.render("write.ejs");
});

app.post("/add", (req, res) => {
  // console.log(req);
  if (req.body.title === "" || req.body.content === "") {
    return res.status(400).send("error");
  }
  try {
    connection.query(
      `INSERT INTO forum (title, content) VALUES ("${req.body.title}", "${req.body.content}")`,
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success!");
        }
      }
    );
    res.redirect("/list");
  } catch (err) {
    res.status(500).send("error");
  }
});

// URL 파라미터 문법
// :aaaa => 유저가 아무거나 입력 시
app.get("/detail/:id", (req, res) => {
  // console.log(`res.body : ${res}`);
  try {
    connection.query(
      `SELECT * FROM forum WHERE id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          console.log(result[0]);
          console.log("error");
        } else {
          if (result[0] === undefined) {
            res.status(404).send("not found");
          } else {
            res.render("detail.ejs", { post: result[0] });
          }
        }
      }
    );
  } catch (err) {
    res.status(404).send("not found");
  }
});

app.get("/edit/:id", (req, res) => {
  try {
    connection.query(
      `SELECT * FROM forum WHERE id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          console.log(result[0]);
          console.log("error");
        } else {
          if (result[0] === undefined) {
            res.status(404).send("not found");
          } else {
            res.render("edit.ejs", { post: result[0] });
          }
        }
      }
    );
  } catch (err) {
    res.status(404).send("not found");
  }
});

app.post("/edit/:id", (req, res) => {
  console.log("호출됨");
  console.log(req.body);
  connection.query(
    `UPDATE forum SET title = RTRIM("${req.body.title}"), content = RTRIM("${req.body.content}") WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success!");
        res.redirect("/list");
      }
    }
  );
});
