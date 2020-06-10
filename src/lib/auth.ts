import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface Decoded {
  id: number;
}

export function generateToken(id: number) {
  const JWT_KEY = String(process.env.JWT_KEY)
  
  return jwt.sign({ id }, JWT_KEY, { expiresIn: '6h' })
}

export function authenticate(request: Request, response: Response, next: NextFunction) {
  const JWT_KEY = String(process.env.JWT_KEY)
  const { authorization } = request.headers
  
  if (!authorization)
    return response
      .status(401)
      .json({ error: "User not authenticated" })

  const [scheme, token] = authorization.split(' ')

  if (scheme !== 'Bearer')
    return response 
      .status(403)
      .json({ error: "Authorization method must be a Bearer Token" })

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) 
      return response
        .status(401)
        .json({ error: err.message })

    const result = decoded as Decoded

    request.creator_id = result.id
    next()
  })
}