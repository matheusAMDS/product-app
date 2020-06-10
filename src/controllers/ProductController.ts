import knex from '../database/connection'
import { Request, Response } from 'express'

class ProductController {
  async show(request: Request, response: Response) {
    const { id } = request.params
    const product = await knex('products')
      .where('products.id', id)
      .join(
        'creators_products', 
        'products.id', 
        '=', 
        'creators_products.product_id'
      )
      .join('creators', 'creators.id', '=', 'creators_products.creator_id')
      .first()
      .select('products.*', 'creators.name')

    return response.json({
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      by: product.name,
      website: product.website
    })
  }   

  async index(request: Request, response: Response) {
    const category = String(request.query.category)
    const page = Number(request.query.page) || 1

    const productsFilter = category !== 'undefined'
      ? knex('products').where('category', category)
      : knex('products')

    const products = await productsFilter
      .join(
        'creators_products', 
        'products.id', 
        '=', 
        'creators_products.product_id'
      )
      .join('creators', 'creators.id','=', 'creators_products.creator_id')
      .select('products.*', 'creators.name')
      .offset((page - 1) * 10)
      .limit(10)

    const serializedProducts = products.map(product => {
      return {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        description: product.description,
        category: product.category,
        website: product.website,
        by: product.name
      }
    })

    return response.json(serializedProducts)
  }

  async create(request: Request, response: Response) {
    const thumbnail = request.file.filename
    const creator_id = request.creator_id
    const { title, description, category, website } = request.body
    const data = {
      title,
      description,
      category,
      website,
      thumbnail
    }

    const product = await knex('products').insert(data)
    const creator = await knex('creators')
      .where('id', creator_id)
      .first()

    await knex('creators_products').insert({
      creator_id,
      product_id: product[0]
    })

    return response.json({
      ...data,
      by: creator.name,
      id: product[0]
    })
  }
}

export default ProductController