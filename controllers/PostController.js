import Post from "../models/Post.js";
import User from '../models/User.js'
import cloudinary from '../utils/cloudinary.js'

export const createPost = async (req, res) => {
	try {
		const { caption, image } = req.body;
		const uploadResponse = await cloudinary.v2.uploader.upload(image, {
			upload_preset: 'opnnk8pe',
		});
		const post = await Post.create({
			caption,
			image: {
				public_id: uploadResponse.public_id,
				url: uploadResponse.secure_url,
			},
			owner: req.body._id,
		})
		post.save();
		const user = await User.findById(req.body._id);
		await user.posts.unshift(post);
		await user.save();
       res.status(200).json({
		message:"Post done",
		post,
	   })
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}

export const getAllposts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 }).populate('owner');
		res.status(200).json({
			posts,
			message: "Get all posts",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const likeUnlike = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				message: "Post Not found",
			})
		};
		const userChk = await post.likes.includes(req.body._id);
		if (userChk) {
			const index = await post.likes.indexOf(req.body._id);
			post.likes.splice(index, 1);
			await post.save();

		} else {
			post.likes.push(req.body._id);
			await post.save();

		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});

	}
}

export const addComment=async(req,res)=>{
	try {
		const post=await Post.findById(req.params.id);
		if(!post){
			return res.status(404).json({
				message:"Post not found",
			})
		}
		post.comments.push({
			user: req.body._id,
			comment: req.body.comment,
		  });
	
		  await post.save();
		  return res.status(200).json({                                                                   
			message: "Comment added",
		  });
		
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});

	}
}

export const getMyposts=async(req,res)=>{
	try {
		const ownPosts=await Post.find({owner:{$in:req.body._id}}).sort({ createdAt: -1 });
		res.status(200).json({
			ownPosts,
			message:"own posts",
		})
		
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}

export const deletePost=async(req,res)=>{
	try {
		const post=await Post.findById(req.params.id);
		if(!post){
			return res.status(200).json({
				message:"Post Not found in Database",
			})
		}
		if (post.owner.toString() !== req.body._id.toString()) {
			return res.status(401).json({
			  success: false,
			  message: "Unauthorized",
			});
		  }
            
		  await cloudinary.v2.uploader.destroy(post.image.public_id);
		  await post.deleteOne();
		  const user = await User.findById(req.body._id);
	  
		  const index =await user.posts.indexOf(req.params.id);
		  await  user.posts.splice(index, 1);
		  await user.save();
		  res.status(200).json({
			success: true,
			message: "Post deleted",
		  });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}