import mongoose from "mongoose";
import { Schema} from "mongoose";

const userScheema = new Schema({
    name: {
        type : String,
        required: true,
    },
    email: {
        type : String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {}
    }
},
{
    minimize: false
}
);


const userModel = mongoose.models.User || mongoose.model("User",userScheema);

export default userModel;