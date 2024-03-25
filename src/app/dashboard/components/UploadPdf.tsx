import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  setShowPopup: (show: boolean) => void;
}

const UploadPdf: React.FC<Props> = ({ setShowPopup }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('No file selected');
      return;
    }

    const user = localStorage.getItem('user');
    if (!user) {
      toast.error('User information not found in localStorage');
      return;
    }

    const userId = JSON.parse(user)?.uid;
    if (!userId) {
      toast.error('User ID not found in localStorage');
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
        setShowPopup(false)
          toast.success('File uploaded successfully');
      } else {
        toast.error('File upload failed');
      }
    } catch (error) {
      toast.error('Error uploading file:' + error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upload PDF</h2>
          <button className="text-red-500 font-semibold" onClick={() => setShowPopup(false)}>Close</button>
        </div>
        <input type="file" onChange={handleFileChange} />
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default UploadPdf;