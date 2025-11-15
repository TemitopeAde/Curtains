import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH update quote status
export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const body = await request.json();
    const { status, totalAmount } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (totalAmount !== undefined) updateData.totalAmount = parseFloat(totalAmount);

    const quote = await prisma.quote.update({
      where: { id: params.id },
      data: updateData,
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    );
  }
}
