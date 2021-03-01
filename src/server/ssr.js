const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// 1 开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由
app.use(express.static(resolve('../../dist/client'), { index: false }));

// 2 获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer');

// 3 导入服务器打包文件
const bundle = require(resolve('../../dist/server/vue-ssr-server-bundle.json'));

// 4 创建渲染器
const template = fs.readFileSync(resolve('../../public/index.html'), 'utf8');
const clientManifest = require(resolve('../../dist/client/vue-ssr-client-manifest.json'));
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template,
  clientManifest
});

app.get('*', async function(req, res) {
  console.log(req.url);
  const context = {
    title: 'sst test',
    url: req.url // 首屏地址
  };
  try {
    const html = await renderer.renderToString(context);
    res.send(html);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log(`server started at http://localhost:3000`);
});
