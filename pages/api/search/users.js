import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { text } = req.body;

  const result = await prisma.users.findMany({
    where: {
      display_name: {
        contains: text,
      },
    },
    take: 10,
  });

  res.json(result);
}
