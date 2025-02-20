import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    const response = await fetch(`${API_BASE_URL}/character?page=${page}`);

    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch characters' },
      { status: 500 }
    );
  }
}
