const mongoose = require('mongoose')
const mongoosePagination = require('mongoose-paginate-v2')

const PhotosSchema = new mongoose.Schema({
  artistName: { type: String, trim: true, requiere: true },
  scientificName: { type: String, trim: true, requiere: true },
  pricesSizes: { type: Array, requiere: true },
  photos_URL: { type: Array, require: true },
  description: { type: String, trim: true, requiere: true },
  date: { type: Date, default: Date.now() }
})

PhotosSchema.plugin(mongoosePagination)
const PhotosModel = mongoose.model('photos', PhotosSchema)
module.exports = PhotosModel
