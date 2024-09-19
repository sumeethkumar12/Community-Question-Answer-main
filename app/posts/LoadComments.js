import prisma from "@/lib/prisma";

export default async function loadComments(postID) {
  const comments = await prisma.comments.findMany({
    where: {
      post_id: parseInt(postID, 10),
    },
  });
  return comments;
}

