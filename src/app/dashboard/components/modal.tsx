import { Button } from "@/components/ui/button";

export const ShareModal: React.FC<{ fileId: string; filename: string; onClose: () => void; }> = ({ fileId, filename, onClose }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="text-lg font-bold mb-2">File Details</div>
        <div className="mb-2"><strong>File ID:</strong> {fileId}</div>
        <div><strong>Filename:</strong> {filename}</div>
        <div className="mt-4 text-right">
          <Button variant="outline" className='color-red' onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};