import Like from "./like.enum";

export type IBlogLike = {
  _id?: string;
  blogId: string;
  userId: string;
  // 0 dislike 1 like
  isLike?: Like;
  isDeleted?: boolean;
  createDate?: Date;
  updateDate?: Date;
}
