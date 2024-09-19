import cookie from "cookie";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { userName } = req.body;
  const date = new Date();

  const newUser = await prisma.users.create({
    data: {
      id: parseInt(date.getTime().toString().slice(0, 10)),
      display_name: userName,
      creation_date: date,
      last_access_date: date,
      reputation: 0,
    },
  });

  const tokenValue = newUser.id.toString();
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", tokenValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );

  res.json(newUser);
}
