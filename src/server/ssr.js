const express = require("express");
const Vue = require("vue");
const { createRenderer } = require("vue-server-renderer");

const app = express();

// 获取渲染器
const renderer = createRenderer();

const vm = new Vue({
  data() {
    return {
      name: "cleam lee"
    };
  },
  template: `
    <div>
      <h1>{{name}}</h1>
    </div>
  `
});

app.get("/", async function(req, res) {
  try {
    const html = await renderer.renderToString(vm);
    res.send(html);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("启动成功");
});
