
// Data ko database me insert

import { products } from "./constants/data.js"
import Product from "./model/productSchema.js";


const DefaultData = async() =>{
try {
     
     await Product.insertMany(products);
    console.log("Data imported Successfully");
} catch (error) {
    console.log("Error while inserting default data", error.message);
}
}

export default DefaultData;