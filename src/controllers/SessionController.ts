import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcryptjs'

import { generateToken } from '../lib/auth'

class SessionController {
  async register(request: Request, response: Response) {
    const { name, email, password } = request.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const result = await knex('creators').insert({
        name,
        email,
        password: hashedPassword
      })

      return response.json({
        token: generateToken(result[0]),
        user: {
          id: result[0],
          name,
          email, 
          password: hashedPassword
        } 
      })

    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT')
        return response
          .status(400)
          .json({ error: "Email already being used." })
      else 
        console.log(error)
    } 
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body

    const user = await knex('creators').where('email', email).first()

    if (!user)
      return response 
        .status(400)
        .json({ error: "Email not registered" })

    if (!await bcrypt.compare(password, user.password))
      return response
        .status(400)
        .json({ error: "Wrong password" })

    return response.json({
      token: generateToken(user.id),
      user
    })
  }
}

export default SessionController