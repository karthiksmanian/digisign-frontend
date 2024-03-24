import { useState } from 'react';

const UploadPdf = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const user = localStorage.getItem('user');
    if (!user) {
      console.error('User information not found in localStorage');
      return;
    }

    const userId = JSON.parse(user)?.uid;
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file, file?.name);
    formData.append('user_id', userId);

    try {
      const response = await fetch('http://localhost:5000/pdfs/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPdf;