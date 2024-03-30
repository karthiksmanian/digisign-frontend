export const getPdfDetails = async (): Promise<any> => {
  try {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      throw new Error('User data not found in localStorage');
    }

    const user = JSON.parse(userJson);
    const userId: string = user.uid;
    const accessToken: string = user.stsTokenManager.accessToken;

    const response = await fetch(`http://localhost:8001/pdfs/user?user_id=${userId}`, {
      headers: { Authorization: accessToken }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF details. Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPdfDetailsToSign = async (): Promise<any> => {
  try {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      throw new Error('User data not found in localStorage');
    }

    const user = JSON.parse(userJson);
    const userEmail: string = user.email;
    const accessToken: string = user.stsTokenManager.accessToken;

    const response = await fetch(`http://localhost:8001/pdfs/to_sign?user_email=${userEmail}`, {
      headers: { Authorization: accessToken }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF details to sign. Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};