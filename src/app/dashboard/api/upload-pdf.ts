export const handleFileUpload = async (file: File): Promise<boolean> => {
  try {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      throw new Error('User data not found in localStorage');
    }

    const user = JSON.parse(userJson);
    const userId: string = user.uid;

    const formData = new FormData();
    formData.append('pdf', file, file.name);
    formData.append('user_id', userId);

    const response = await fetch(`http://localhost:8001/pdfs/create`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error(`Failed to upload file. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error
  }
};