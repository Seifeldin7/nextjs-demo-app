import { Request, Response, NextFunction } from "express";
const { db } = require("../firebase");

//   const existingCheck = await checkService.getCheckById(checkId);

//   // Stop the existing cron job
//   existingCheck.job.stop();

//   await checkService.deleteCheck(req.params.id, req.user);
//   res.status(httpStatus.OK).end();
// };

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
  try {
    const { id } = req.params;
    const doc = await db.collection("posts").doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPost = req.body;
    const docRef = await db.collection("posts").add(newPost);
    res.status(201).json({ id: docRef.id, ...newPost });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedPost = req.body;
    const docRef = db.collection("posts").doc(id);
    await docRef.update(updatedPost);
    res.status(200).json({ id, ...updatedPost });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await db.collection("posts").doc(id).delete();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
