import express from 'express'
import multer from 'multer'
import { celebrate } from 'celebrate'

import SessionController from './controllers/SessionController'
import ProductController from './controllers/ProductController'

import { login, register } from './validators/session'
import { create, show } from './validators/products'

import uploadConfig from './config/multer'
import { authenticate } from './lib/auth'

const routes = express.Router()
const upload = multer(uploadConfig)

const sessionController = new SessionController()
const productController = new ProductController()

routes.post('/register', celebrate(register), sessionController.register)
routes.post('/login', celebrate(login), sessionController.login)

routes.get('/products', productController.index)
routes.get('/products/:id', celebrate(show), productController.show)
routes.post('/products', authenticate, upload.single('thumbnail'), productController.create)

export default routes