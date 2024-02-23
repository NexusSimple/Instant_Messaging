import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, password } = body;
}
