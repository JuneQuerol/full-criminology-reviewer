import { NextResponse } from 'next/server';
import { getModuleList } from '@/lib/content';

export async function GET() {
  const modules = getModuleList();
  return NextResponse.json(modules);
}