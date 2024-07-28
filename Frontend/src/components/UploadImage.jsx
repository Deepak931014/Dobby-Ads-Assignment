import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UploadImage() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || !imageName) {
      toast.warning("Please select an image and provide a name");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", imageName);

    try {
      const response = await fetch("http://localhost:8086/img/upload", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Image uploaded successfully");
        navigate("/upload-img");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Image upload failed");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Image</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Image Name:</label>
            <input
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="Enter image name"
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Select Image:</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadImage;
