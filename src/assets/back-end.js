var express = require("express");
var app = express();
app.use(express.json());

app.get("/", function (req, res) {
  console.log("主页 GET 请求");
  res.send("Hello GET");
});

app.post("/login-info", (req, res) => {
  var exist = false,
    rightPass = false;
  var user;
  for (const item of userList) {
    if (req.body.email == item.email) {
      exist = true;
      rightPass = req.body.password == item.password;
      user = item;
    }
  }

  res.send({ exist: exist, rightPass: rightPass, user: user });
});

app.post("/register-info", (req, res) => {
  var exist = false, curUser;
  for (const item of userList) {
    if (req.body.email == item.email) {
      exist = true;
    }
  }

  if (!exist) {
    let lastid =
      parseInt(userList[userList.length - 1].id.split("U")[1]) + 1 + "";
    curUser = {
      id: "U" + lastid.padStart(3, "0"),
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
      data: [],
    };

    userList.push(curUser);
  }
  console.log(userList);

  res.send({ success: !exist, user: curUser });
});

app.get("/user-info", (req, res) => {
  console.log("user-info GET 请求");
  var user;

  for (const item of userList) {
    if (req.query.id == item.id) {
      user = item;
    }
  }
  res.send({
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    password: user.password,
    data: user.data,
  });
});

var server = app.listen(8081, function () {
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://localhost:" + port);
});

var userList = [
  {
    id: "U001",
    email: "E001@qq.com",
    password: "P001",
    nickname: "小明",
    data: [],
  },
  {
    id: "U002",
    email: "E002@qq.com",
    password: "P002",
    nickname: "小红",
    data: [],
  },
  {
    id: "U003",
    email: "E003@qq.com",
    password: "P003",
    nickname: "小刚",
    data: [],
  },
  {
    id: "U004",
    email: "E004@qq.com",
    password: "P004",
    nickname: "小李",
    data: [],
  },
];
