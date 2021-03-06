import multer from 'multer'
import path from 'path'

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const filename = `${Date.now()}-${file.originalname}`

      callback(null, filename)
    }
  })
}