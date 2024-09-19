import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { postidnum, comment } = req.body;
    const date = new Date();

  const result = await prisma.comments.create({
    data: {
      post_id: postidnum,
      user_id: 28,
      score: 2,
      content_license: "CC BY-SA 2.5",
      user_display_name: null,
      text: comment,
      creation_date: date,
    },
  });
  res.json(result);
}
