import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { postidnum, answer,userID} = req.body;
  const date = new Date();


  const result = await prisma.posts.create({
    data: {
      owner_user_id: parseInt(userID),
      post_type_id: 2,
      score: 7,
      parent_id: postidnum,
      tags: null,
      content_license: "CC BY-SA 2.5",
      body: answer,
      creation_date: date,
    },
  });

  res.json(result);
}
