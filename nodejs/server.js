const { render } = require("ejs");
const express = require("express");
const app = express();
const methodOverride = require("method-override");
// 환경변수 관련 라이브러리
require("dotenv").config();
let connection = require("./database.js");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// 입출력 관련해서 도움을 주는 설정들
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: process.env.PORT,
//   user: "root",
//   password: process.env.DB_PASSWORD,
//   database: "express",
// });

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (요청, file, cb) {
      cb(null, Date.now().toString()); //업로드시 파일명 변경가능
    },
  }),
});

app.use(passport.initialize());
app.use(
  session({
    secret: "암호화에 쓸 비번",
    // 요청할 때마다 세션 갱신 여부
    resave: false,
    // 로그인 안해도 세션을 만들 것인가
    saveUninitialized: false,
  })
);

app.use(passport.session());

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

app.post("/add", upload.single("img1"), (req, res) => {
  console.log(req);
  if (req.body.title === "" || req.body.content === "") {
    return res.status(400).send("error");
  }
  try {
    connection.query(
      `INSERT INTO forum (title, content, image) VALUES ("${req.body.title}", "${req.body.content}", "${req.file.location}")`,
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

app.put("/edit/:id", (req, res) => {
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

app.delete("/delete/:id", (req, res) => {
  console.log(`delete called id : ${req.params.id}`);
  connection.query(
    `DELETE FROM forum WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        res.redirect("/list");
      }
    }
  );
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  connection.query(
    `SELECT username, password FROM auth WHERE username = "${req.body.username}" AND password = "${req.body.password}"`,
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log("success");
        res.redirect("/list");
      }
    }
  );
});

app.post("/회원가입", (req, res) => {
  connection.query(
    `INSERT INTO auth (username, password) VALUES (${
      (req.body.username, req.body.password)
    })`,
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log("success");
        res.redirect("/");
      }
    }
  );
});

// url 앞부분 통일 시 이렇게 전달.
app.use("/shop", require("./routes/shop.js"));
