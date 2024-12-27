import { Request, Response, NextFunction } from "express";
const { db } = require("../firebase");
const AppError = require('../utils/AppError');

// Get all posts for a user
exports.getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const snapshot = await db.collection("posts").get();
  const posts = snapshot.docs.map((doc: any) => doc.data());
  res.status(200).json(posts);
};

exports.getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const doc = await db.collection("posts").doc(id).get();
  if (!doc.exists) {
    return next(new AppError("Post not found", "NotFoundError", 404));
  }
  res.status(200).json({ id: doc.id, ...doc.data() });
};

exports.createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newPost = req.body;
  const docRef = await db.collection("posts").add(newPost);
  res.status(201).json({ id: docRef.id, ...newPost });
};

exports.updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updatedPost = req.body;
  const docRef = db.collection('posts').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return next(new AppError('Post not found', 404));
  }

  await docRef.update(updatedPost);
  res.status(200).json({ id, ...updatedPost });
};

exports.deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const docRef = db.collection('posts').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return next(new AppError('Post not found', 404));
  }

  await docRef.delete();
  res.status(204).send();
};
