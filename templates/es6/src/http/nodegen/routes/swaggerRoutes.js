import { Router } from 'express'
import expressAuthMiddle from 'express-auth-middle'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
import config from '../../../config'

export default () => {
  const router = Router({})
  if(config.env !== 'production') {
    let swaggerFile = config.swaggerFile
    if (config.swaggerFile === 'latest') {
      const recursive = require('recursive-readdir-sync')
      // read the dir and get the latest file name in the dir.
      let files = recursive('./dredd')
      files.forEach((file) => {
        if (path.extname(file) === '.yml') {
          swaggerFile = file
        }
      })
    }

    const swaggerDocument = YAML.load(path.resolve(swaggerFile))

    // Middleware for basicauth and xauth
    router.use(expressAuthMiddle({
      methods: ['basic-auth'],
      credentials: {
        basicAuthUname: config.basicAuthUname,
        basicAuthPword: config.basicAuthPword,
      },
      challenge: 'Protected area',
    }))
    router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }
  return router
}