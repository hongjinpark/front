const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

const port = 3000; //인스턴스 생성시 만들었던 포트번호 기입

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use(express.static(path.join(__dirname, 'build')));

// 각 경로에 대한 정적 파일 제공 설정
app.use(
  '/upload/assets/images/user',
  express.static(path.join(__dirname, 'upload', 'assets', 'images', 'user'))
);
app.use(
  '/upload/assets/images/board',
  express.static(path.join(__dirname, 'upload', 'assets', 'images', 'board'))
);
app.use(
  '/upload/assets/images/product',
  express.static(path.join(__dirname, 'upload', 'assets', 'images', 'product'))
);

app.get('/*', (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Date': Date.now(),
  });
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

http.createServer(app).listen(port, () => {
  console.log(`app listening at ${port}`);
});
