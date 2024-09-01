import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import {createError} from "../error.js";
import {v2 as cloudinary} from "cloudinary";

dotenv.config();

// Configuration
// cloudinary.config({ 
//     cloud_name: , 
//     api_key: , 
//     api_secret: ' // Click 'View API Keys' above to copy your API secret
// });


// Get all the post
export const getAllPosts = async(req,res,next) =>{
    try{
        const posts = await Post.find({});
        return res.status(200).json({success: true,data: posts});
    }catch(error){
        next(createError(error.status, error?.response?.data?.error?.message || error?.message));
    }
}