import authApi from "@/lib/auth";

const handleGoogleSuccess = async (response: any) => {
  try {
    const result = await authApi.post('/auth/google', {
      token: response.credential
    });

    console.log('Google auth result:', result.data);

    if (result.data.access_token) {
      // Store tokens
      localStorage.setItem('accessToken', result.data.access_token);
      localStorage.setItem('token', result.data.access_token);
      
      console.log('Stored tokens:', {
        accessToken: localStorage.getItem('accessToken'),
        token: localStorage.getItem('token')
      });

      // Update auth context with flattened structure
      login(result.data.user, {
        access_token: result.data.access_token
      });

      router.push('/dashboard');
    } else {
      throw new Error('No access token received from Google auth');
    }
  } catch (error) {
    console.error('Google auth error:', error);
    setError(error.response?.data?.message || 'Failed to authenticate with Google');
  }
}; 