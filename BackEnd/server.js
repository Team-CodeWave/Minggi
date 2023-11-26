const express = require('express');
const cores = require('cores');
const app = express();
const port = 3000;

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Hello, It is WebServer!');
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
});

app.use(cors());

//AWS 자격 증명 설정 및 서비스 사용
const AWS = require('aws-sdk');

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
});