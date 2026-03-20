import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Bun 환경에서 포트 지정하는 법
// export default {
//   port: 8787, // 여기서 원하는 포트로 변경!
//   fetch: app.fetch,
// }

export default app