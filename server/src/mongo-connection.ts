import * as mongoose from "mongoose";
import * as dotenv from "dotenv"

dotenv.config();

export async function initMongoConnection():Promise<any>{

    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rsuv7ei.mongodb.net?retryWrites=true&w=majority`

    try{
        await mongoose.connect(uri, {
            dbName:'tours-application',
        })
    }catch (err){
        console.log(err)
        throw err
    }
}