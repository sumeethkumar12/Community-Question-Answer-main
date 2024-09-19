import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, text, str, postID } = req.body;
  console.log(title, text, str, postID);

  const date = new Date();

  const result = await prisma.posts.update({
    where: {
      id: parseInt(postID),
    },
    data: {
      title: title,
      post_type_id: 1,
      score: 7,
      tags: str,
      content_license: "CC BY-SA 2.5",
      body: text,
      last_edit_date: date,
    },
  });
  res.json(result);
}
