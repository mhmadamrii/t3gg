import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // loop for seed random users
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: Math.random().toString(36).substring(7),
        email: Math.random().toString(36).substring(7) + "@example.com",
      },
    });
    console.log(user);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
