import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { tagstext } = req.body;

  const result = await await prisma.tags.findMany({
    orderBy: {
      tag_name: "asc",
    },
    where: {
      tag_name: {
        contains: tagstext,
      },
    },
    take: 10,
  });
  res.json(result);
}
