// src/app/api/auth/token/github/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const githubClientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/auth/github/callback`;

    if (!githubClientId) {
      return NextResponse.json(
        { error: 'GitHub OAuth is not configured' },
        { status: 500 }
      );
    }

    // Generate state for security
    const state = crypto.randomUUID();

    // Construct GitHub OAuth URL
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.append('client_id', githubClientId);
    githubAuthUrl.searchParams.append('redirect_uri', redirectUri);
    githubAuthUrl.searchParams.append('scope', 'read:user user:email');
    githubAuthUrl.searchParams.append('state', state);

    // Return redirect response
    return NextResponse.redirect(githubAuthUrl.toString());
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate GitHub OAuth' },
      { status: 500 }
    );
  }
}