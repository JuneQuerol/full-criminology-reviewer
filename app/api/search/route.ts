import { NextResponse } from 'next/server';
import { searchContent } from '../../../lib/search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }
  const results = searchContent(query);
  return NextResponse.json(results);
}