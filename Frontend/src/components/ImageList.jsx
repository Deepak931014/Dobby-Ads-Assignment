import React, { useEffect, useState } from 'react';
import { asyncPostCall } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ImageList({ setToken }) {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  const fetchImages = async () => {
    try {
      const token = `Bearer ${localStorage.getItem('token')}`;
      const data = await asyncPostCall('/img/get-all-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ search })
      });
      if (data?.length >= 0) {
        setImages(data);
      } else {
        toast.error("Server error, please try again");
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to fetch images');
    }
  };

  useEffect(() => {
    fetchImages();
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
        onClick={() => navigate("/upload-img-a")}
      >
        Click Upload New Image
      </button>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search here"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images?.map((item, index) => (
            <div className="p-4 bg-white rounded shadow" key={index}>
              <img src={`http://localhost:8086/${item?.imageUrl}`} alt={item?.name} className="w-full h-32 object-cover rounded" />
              <h4 className="mt-2 text-lg font-semibold">Name: {item?.name}</h4>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
}

export default ImageList;
