import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  const { id } = await params;
  await prisma.entry.delete({
    where: { id: parseInt(id) },
  });
  return new Response(null, { status: 204 });
}
