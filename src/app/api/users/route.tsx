import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Make sure you have Prisma client setup correctly

// POST request to save user data in MongoDB
export async function POST(req: Request) {
  const { name, email, phone } = await req.json();

  try {
    const user = await prisma.person.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ error: 'Error saving user' }, { status: 500 });
  }
}

