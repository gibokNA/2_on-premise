const express = require('express');
const mysql = require('mysql2/promise');
const os = require('os');

const app = express();
const PORT = 8080;

// 환경 변수에서 DB 접속 정보 가져오기 (없으면 기본값 사용)
const dbConfig = {
  host: process.env.DB_HOST || '192.168.100.30', // Keepalived VIP
  user: process.env.DB_USER || 'wms_user',        // Ansible로 만든 유저
  password: process.env.DB_PASSWORD || 'wms_pass',// Ansible로 만든 비번
  database: process.env.DB_NAME || 'wms_db'
};

app.get('/', async (req, res) => {
  try {
    // 1. DB 연결 시도
    const connection = await mysql.createConnection(dbConfig);
    
    // 2. 간단한 쿼리 실행 (DB 버전 확인)
    const [rows] = await connection.execute('SELECT VERSION() as version');
    const dbVersion = rows[0].version;
    await connection.end();

    // 3. 결과 출력 (HTML)
    res.send(`
      <h1>🚀 WMS App v1.0</h1>
      <p><strong>Hostname (Pod):</strong> ${os.hostname()}</p>
      <p><strong>DB Connection:</strong> <span style="color:green">SUCCESS</span> (Ver: ${dbVersion})</p>
      <p><strong>DB Host:</strong> ${dbConfig.host}</p>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send(`
      <h1>🚨 DB Connection Failed</h1>
      <p><strong>Hostname:</strong> ${os.hostname()}</p>
      <p><strong>Error:</strong> ${err.message}</p>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});