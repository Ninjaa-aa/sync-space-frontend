import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { size: string } }
): Promise<Response> {
  const size = params.size.split('x');
  const width = parseInt(size[0]);
  const height = size[1] ? parseInt(size[1]) : width;

  // Create SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e2e8f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="12" fill="#94a3b8" text-anchor="middle" dy=".3em">
        ${width}x${height}
      </text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}