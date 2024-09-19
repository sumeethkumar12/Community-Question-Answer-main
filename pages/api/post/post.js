import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, text, userid ,str } = req.body;
  const date = new Date();
  console.log(title, text, userid);

  const getuser = await prisma.users.findUnique({
    where: {
      id: parseInt(userid),
    },
  });
  console.log(getuser);

  if (getuser) {
    const result = await prisma.posts.create({
      data: {
        id: parseInt(Date.now().toString().slice(0, 10)),
        owner_user_id: parseInt(userid),
        owner_display_name: getuser.display_name,
        title: title,
        post_type_id: 1,
        score: 7,
        tags: str,
        content_license: "CC BY-SA 2.5",
        body: text,
        creation_date: date,
      },
    });
    res.json(result);
  } else {
    console.log("getuser is null or undefined");
  }
  
}
