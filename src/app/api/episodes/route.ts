import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const episodes = searchParams.get('episodes');

    const response = await fetch(`${API_BASE_URL}/episode/${episodes}`);

    if (!response.ok) {
      throw new Error('Failed to fetch episodes');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return NextResponse.json([data]);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch episodes' },
      { status: 500 },
    );
  }
}
