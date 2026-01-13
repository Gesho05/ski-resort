import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import News from '@/models/News';

export async function GET() {
  await dbConnect();
  try {
    const news = await News.find({}).sort({ createdAt: -1 }); // Get latest news first
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}