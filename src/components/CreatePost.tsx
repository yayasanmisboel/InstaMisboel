import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostContext } from '../context/PostContext';
import { Image, X } from 'lucide-react';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addPost } = usePostContext();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('Image size should be less than 10MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview) {
      setError('Please select an image to post.');
      return;
    }
    
    // For the MVP, we'll use the uploaded image directly
    // In a real app, you would upload this to a storage service
    addPost({
      imageUrl: imagePreview,
      caption
    });
    
    navigate('/');
  };

  const clearImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="px-4 py-6">
      <form onSubmit={handleSubmit}>
        {/* Image upload area */}
        {!imagePreview ? (
          <div className="mb-6">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Image className="w-12 h-12 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 text-center">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG or GIF (max. 10MB)
                </p>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        ) : (
          <div className="mb-6 relative">
            <img
              src={imagePreview}
              alt="Post preview"
              className="w-full h-auto rounded-lg"
            />
            <button
              type="button"
              className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-60 rounded-full text-white"
              onClick={clearImage}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}
        
        {/* Caption input */}
        <div className="mb-6">
          <label
            htmlFor="caption"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Caption
          </label>
          <textarea
            id="caption"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a caption for your post..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Share Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
