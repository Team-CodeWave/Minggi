const axios = require('axios');

axios.get('http://localhost:3000/api/DND')
  .then(response => {
    console.log('Server Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

  
//AWS 자격 증명 설정 및 서비스 사용
/*const AWS = require('aws-sdk');

const session = new AWS.Credentials({
  accessKeyId: access_key,
  secretAccessKey: secret_key,
  region: region_name
});

const ec2 = new AWS.EC2({ credentials: session });

ec2.describeInstances({}, function(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    const instances = data.Reservations.flatMap(reservation => reservation.Instances);
    instances.forEach(instance => {
      console.log(instance);
    });
  }
});*/


/* server.js 원본 코드
const express = require('express');
const path = require("path");
const cors = require('cors');
const { exec } = require('child_process');
const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');
const styles = require('../src/index.css');
const App = require('./App');
const reportWebVitals = require('./reportWebVitals');
const app = express();
const port = 3000;
const axios = require('axios');

app.use(cors());

axios.get('http://localhost:3000/api/DND', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
})
  .then(response => {
    // 응답 데이터 처리
    console.log(response.data);
    
  })
  .catch(error => {
    // 에러 처리
    console.error('Error:', error.message);;
  });

// 정적 파일 제공을 위한 경로 설정
app.use(express.static(path.join(__dirname, '..', 'src', 'index.js')));

// 모든 요청에 대해 React 웹페이지로 리다이렉트
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.js'));
});

// 기본 라우트 설정
app.get('/api/DND', (req, res) => {
  res.json('Hello, It is WebServer!');
});

// REST API 라우트 설정
app.get('/api/data', (req, res) => {
  // 데이터 처리 로직 작성
  // 예: 데이터 조회, 데이터베이스 연동 등
  res.send('REST API Requst data');
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);

  // React 앱 실행
  exec('npm run build && npm start', {
    cwd: path.join(__dirname, '../src/index.js') // React 프로젝트의 경로로 설정
  }, (error, stdout, stderr) => {
    if (error) {
      console.error(`React 앱 실행 중 오류가 발생했습니다: ${error}`);
      return;
    }
    console.log(`React 앱이 실행되었습니다.`);
  });
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build/App.js"));
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(BrowserRouter, null, React.createElement(App))
);

ReactDOM.render(
  React.createElement(BrowserRouter, null, React.createElement(App)),
  document.getElementById('root')
);
*/