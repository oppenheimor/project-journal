import prisma from '@/lib/prisma';

export async function GET() {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return Response.json(entries);
}

export async function POST(request) {
  const { content } = await request.json();
  const entry = await prisma.entry.create({
    data: { content },
  });
  return Response.json(entry, { status: 201 });
}
