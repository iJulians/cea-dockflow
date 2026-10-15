import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'

import { Veiculos } from '@cea-dockflow/shared'
import { createDb, veiculos } from '@cea-dockflow/db'

import packageJson from '../package.json'

type Bindings = {
  DATABASE_URL: string
}

const app = new Hono<{Bindings: Bindings}>()

app.use(
  '/api/*',
  cors({
    origin: 'https://cea-dockflow-web.SEU-SUBDOMINIO.workers.dev',
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.get('/', (c) => {
  return c.json({
    name: packageJson.name,
    version: packageJson.version,
  })
})

app.post(
  '/veiculos',
  zValidator('json', Veiculos.Create.inputSchema),
  async (c) => {
    const data = c.req.valid('json')

    const db = createDb(c.env.DATABASE_URL)

    const [veiculo] = await db
    .insert(veiculos)
    .values(data)
    .returning()

    return c.json(veiculo)
  }
)

export default app
