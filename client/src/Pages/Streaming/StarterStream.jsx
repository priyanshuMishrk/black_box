import React, { useState } from 'react';


const StreamingForm = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]); 
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (API call, etc.)
    console.log('Thumbnail:', thumbnail);
    console.log('Title:', title);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className='streaming-form-box'>
      <div>
        <label htmlFor="thumbnail" className='gl  lastrem'>Thumbnail :</label>
        <input type="file" id="thumbnail" className='gl' accept="image/*" onChange={handleThumbnailChange} />
      </div>
      <div>
        <label htmlFor="title" className='gl lastrem mr-5'>Title :</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} className='gl' />
      </div>
      <button type="submit" className='gx streamButton' >Start Streaming</button>
    </form>
    </>
  );
};

export default StreamingForm;