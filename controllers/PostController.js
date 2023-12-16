import Post from "../models/Post.js";
import User from '../models/User.js'
import cloudinary from '../utils/cloudinary.js'
import mongoose from "mongoose";

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
			message: "Post done",
			post,
			success:true,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server Error",
		});
	}
}

export const getAllposts = async (req, res) => {
	const { count } = req.query;
	const limit = 1;
	try {
		const posts = await Post.find().sort({ createdAt: -1 }).skip((parseInt(count) - 1) * 2).limit(2).populate('owner');
		if (posts.length > 0) {
			res.status(200).json({
				posts,
				message: "Get all posts",
				success: true,
			});
		} else {
			res.json({
				success: false,
				message: "No more posts",
			})
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server Error",
		});
	}
};


export const likeUnlike = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				message: "Post Not found",
				success:false,
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
		res.status(500).json({
			success: true,
			message: "Done",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server Error",
		});

	}
}

export const addComment = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				message: "Post not found",
				success:false,
			})
		}
		let date = new Date();
		post.comments.push({
			user: req.body._id,
			date: date,
			comment: req.body.comment,
		});

		await post.save();
		return res.status(200).json({
			message: "Comment added",
			success:true,
		});

	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server Error",
		});

	}
}

export const getMyposts = async (req, res) => {
	try {
		const ownPosts = await Post.find({ owner: { $in: req.params.id } }).sort({ createdAt: -1 }).populate('owner');
		res.status(200).json({
			ownPosts,
			message: "own posts",
		})

	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server Error",
		});
	}
}

export const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(400).json({
				message: "Post Not found ",
				success:false
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

		const index = await user.posts.indexOf(req.params.id);
		await user.posts.splice(index, 1);
		await user.save();
		res.status(200).json({
			success: true,
			message: "Post deleted",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server Error",
		});
	}
}

export const allLikes = async (req, res) => {
	try {
		let allLikes = await Post.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(req.params.id)
				}
			},
			{
				$project: {
					_id: 0,
					likes: 1,
				}
			}
		]);
		allLikes = await Promise.all(
			allLikes.map(async (ele) => {
				return await Promise.all(
					ele.likes.map(async (ele1) => {
						return await User.aggregate([
							{
								$match: {
									_id: new mongoose.Types.ObjectId(ele1.toString()),
								},
							},
							{
								$project: {
									username: 1,
									image: 1,
									followers: 1,
									firstName: 1,
								},
							},
						]);
					})
				);
			})
		);
		const flattenedLikes = allLikes.flat(2);
		res.status(200).json({
			success: true,
			flattenedLikes,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server Error",
		});
	}
}

export const cmtShow = async (req, res) => {
	try {
		let alCmts = await Post.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(req.params.id)
				}
			},
			{
				$project: {
					_id: 0,
					comments: 1,
				}
			}
		]);

		let arr = [];
		await Promise.all(alCmts.map(async (ele) => {
			if (ele.comments && ele.comments.length > 0) {
				const userComments = await Promise.all(ele.comments.map(async (ele1) => {
					try {
						const user = await User.aggregate([
							{
								$match: {
									_id: new mongoose.Types.ObjectId(ele1.user),
								},
							},
							{
								$project: {
									firstName: 1,
									username: 1,
									image: 1,
								},
							},
						]);

						return { user:user, date: ele1.date, comment: ele1.comment };
					} catch (error) {
						console.error('Error in user aggregation:', error);
						return null;
					}
				}));

				const validUserComments = userComments.filter((comment) => comment !== null);

				if (validUserComments.length > 0) {
					arr = arr.concat(validUserComments);
				}
			}
		}));
		res.status(200).json({
			success: true,
			arr,
			message:"comment shown"
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: "Internal server Error",
		});
	}
}