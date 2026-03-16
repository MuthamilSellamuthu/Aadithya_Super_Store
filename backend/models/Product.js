import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  manufacturingDate: { type: Date },
  expiryDate: { type: Date },
  ingredients: { type: [String] },
  nutritionInformation: {
    calories: { type: String },
    protein: { type: String },
    fat: { type: String },
    carbohydrates: { type: String }
  },
  stock: { type: Number, required: true, default: 0 },
  aisle: { type: String, required: true },
  section: { type: String, required: true },
  image: { type: String, required: true },
  navigationLink: { type: String } // Kuula or 3DVista link
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
