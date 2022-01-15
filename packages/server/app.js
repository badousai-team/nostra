const express = require('express')
require('express-async-errors')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { createHttpTerminator } = require('http-terminator')
const noCache = require('nocache')
const requireDir = require('require-dir')
const cors = require('cors')
const helmet = require('helmet')
const requestIp = require('request-ip')
const useragent = require('express-useragent')
const { Umzug, SequelizeStorage } = require('umzug')

const exception = require('./utils/exception')
const { userAuth } = require('./middlewares/auth')
const { db } = require('./models/db')
const { setupCrons } = require('./cron')
const redisClient = require('./service/redis')

const routes = requireDir('./controllers', { recurse: true })

const app = express()

// get PORT from .env file info
const port = process.env.SERVER_PORT || '9000' // default to 9000 if port info not set
const isProduction = process.env.NODE_ENV === 'production'
const sessionSecret = process.env.COOKIE_SECRET || 'harmony'
const cookieDomain = process.env.COOKIE_DOMAIN || 'harmony.one'
const corsOrigin = process.env.CORS_ORIGIN || '*'

// in milliseconds
// https://expressjs.com/en/resources/middleware/session.html
const DURATION_30_DAYS = 30 * 24 * 3600 * 1000

var sess = {
  secret: sessionSecret,
  cookie: { path: '/', httpOnly: true, maxAge: DURATION_30_DAYS },
  unset: 'destroy',
}

console.log('App ENV', app.get('env'))

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
  sess.cookie.domain = `.${cookieDomain}`
  sess.proxy = true
}

// store session in redis
sess.store = new RedisStore({ client: redisClient })

app.use(session(sess))

const corsOptions = {
  origin: corsOrigin,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(noCache())

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '1mb' })) // for parsing application/json

// if need to compress response to gzip format
// include compression library and uncomment the code below
// app.use(compression())

if (isProduction) {
  // PRODUCTION optimization
  app.use(helmet())
  app.use(requestIp.mw())
  app.use(useragent.express())
}

app.get('/', (req, res) => {
  res.json({
    meta: {
      code: 200,
      error: null,
      message: `Server is running at: http://localhost:${port}`,
    },
  })
})

// ROUTES -> link to controllers
app.use('/public', routes.public)
app.use('/session', routes.session)
app.use('/user', userAuth, routes.user)
app.use('/aws', routes.aws)

app.use((err, req, res, next) => {
  if (!err) {
    next()
    return
  }

  if (!isProduction) console.log(err)
  const [error, status] = exception(err)

  if (status === 500) {
    res.status(status).json({
      meta: {
        code: 500,
        message: error.message,
      },
    })
  } else {
    res.status(status).json({ meta: error })
  }
  return
})

app.use((req, res) => {
  if (!res.headersSent) {
    res.status(404).json({ message: 'Sorry can\'t find that!' })
  }
})

let httpTerminator

const migrator = new Umzug({
  logger: console,
  storage: new SequelizeStorage({ sequelize: db }),
  context: db.getQueryInterface(),
  migrations: {
    glob: './migrations/*.js',
    resolve: ({ name, path, context }) => {
      // Adjust the migration from the new signature to the v2 signature, making easier to upgrade to v3
      const migration = require(path)
      return {
        name,
        up: async () => migration.up(context),
        down: async () => migration.down(context),
      }
    },
  },
})

const seeder = new Umzug({
  logger: console,
  storage: new SequelizeStorage({ sequelize: db, modelName: 'SequelizeData' }),
  context: db.getQueryInterface(),
  migrations: {
    glob: './seeders/*.js',
    resolve: ({ name, path, context }) => {
      // Adjust the migration from the new signature to the v2 signature, making easier to upgrade to v3
      const seed = require(path)
      return {
        name,
        up: async () => seed.up(context),
        down: async () => seed.down(context),
      }
    },
  },
})

migrator
  .up()
  .then(() => {
    if (!isProduction) seeder.up()
    console.log(`Starting server on ${port}`)
    const server = app.listen(port, () => {
      console.log(`Server listening http on ${port}`)
      httpTerminator = createHttpTerminator({ server })
      process.send && process.send('ready')
      if (process.env.API_SERVER_HOST !== 'localhost') {
        setupCrons()
      }
    })
  })
  .catch((err) => {
    console.log('ERROR migrating DB:', err)
    process.exit()
  })

process.on('SIGINT', async () => {
  console.log('Received shutdown signal')
  await db.close().catch(() => process.exit(1))
  console.log('DB closed')
  if (httpTerminator) {
    await httpTerminator.terminate().catch(() => process.exit(1))
    console.log('server terminated')
  }
  process.exit(0)
})

module.exports = app
