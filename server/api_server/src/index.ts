import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Database } from 'bun:sqlite';


// 파일 기반 DB 생성 (현재 폴더에 mydb.sqlite 파일이 생깁니다)
const db = new Database("mydb.sqlite");
// 테이블 생성 (JSON 데이터를 담을 컬럼 포함)
db.run("CREATE TABLE IF NOT EXISTS counters (id INTEGER PRIMARY KEY CHECK (id = 1), test_count INTEGER DEFAULT 0)");
db.run(`INSERT OR IGNORE INTO counters (id, test_count) VALUES (1, 0)`);

// 데이터 삽입 (JSON을 문자열로 저장)
// const insert = db.prepare("INSERT INTO users (profile) VALUES (?)");
// insert.run(JSON.stringify({ name: "Jo", mbti: "INTJ" }));

// // 조회
// const result = db.query("SELECT * FROM users").all();
// console.log(result);



const app = new Hono();
// CORS 미들웨어 추가 (모든 출처 허용)
app.use('/*', cors());

app.get('/', (c) => {
  console.log('connect');
  return c.text('Hello Hono!!')

});

app.get('/count', (c) => {
  const result = db.query('SELECT test_count FROM counters WHERE id = 1').get() as { test_count: number };
  console.log('get count');
  return c.json(result);

});

// 3. 카운트 증가 API
app.post('/count/increment', (c) => {
  db.run('UPDATE counters SET test_count = test_count + 1 WHERE id = 1');
  const updated = db.query('SELECT test_count FROM counters WHERE id = 1').get();
  console.log('increment count');
  return c.json(updated);
});

// Bun 환경에서 포트 지정하는 법
// export default {
//   port: 8787, // 여기서 원하는 포트로 변경!
//   fetch: app.fetch,
// }

export default app