export const removeShare = async (fileId: string, email: string): Promise<boolean> => {
  try {
    const userJson: string | null = localStorage.getItem('user');
    if (!userJson) {
      throw new Error('User data not found in localStorage');
    }

    const user = JSON.parse(userJson);
    const accessToken: string = user.stsTokenManager.accessToken;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pdfs/remove_share`, {
      method: 'POST',
      body: JSON.stringify({
        emails: [email],
        file_ids: [fileId]
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to remove access');
    }
    return true;
  } catch (error) {
    throw error;
  }
}
