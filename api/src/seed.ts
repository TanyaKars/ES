import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        name: 'John Doe',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob.wilson@example.com',
        name: 'Bob Wilson',
      },
    }),
  ]);

  // Create sample posts
  await Promise.all([
    prisma.post.create({
      data: {
        title: 'Welcome to the ES Monorepo',
        content: 'This is a sample post in our new monorepo setup.',
        published: true,
        authorId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'TypeScript is Awesome',
        content: 'Here are some reasons why TypeScript makes development better...',
        published: true,
        authorId: users[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Draft Post',
        content: 'This post is still being written.',
        published: false,
        authorId: users[2].id,
      },
    }),
  ]);

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });