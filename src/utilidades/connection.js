import mongoose from "mongoose";

const {MONGO_URL} = process.env

export const conexion = async () => {
    try {
        const {connection} = await mongoose.connect(MONGO_URL)
        if (connection.readyState == 1){
            console.log("Conectado a la base de datos")
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log(error);
        return Promise.resolve(false)
    }
}