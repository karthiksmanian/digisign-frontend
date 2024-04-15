export const deletePdfs = async (pdfIds: string[]): Promise<void> => {
  try {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      throw new Error('User data not found in localStorage');
    }

    const user = JSON.parse(userJson);
    const accessToken = user.stsTokenManager.accessToken;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pdfs/delete`, {
      method: 'POST',
      body: JSON.stringify({
        file_ids: pdfIds
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete PDFs');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};