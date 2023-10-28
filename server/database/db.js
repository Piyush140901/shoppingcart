import mongoose from "mongoose";



export const Connection = async(username, password)=>{
    const URL=`mongodb://${username}:${password}@ac-kkvul98-shard-00-00.r0fxeof.mongodb.net:27017,ac-kkvul98-shard-00-01.r0fxeof.mongodb.net:27017,ac-kkvul98-shard-00-02.r0fxeof.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-efb48w-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
       await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true});
       console.log("DataBase Connected Successfully");
    } catch (error) {
        console.log("Error will connecting with database", error.message);
    }
}
export default Connection;