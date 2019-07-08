import React from 'react';
import GalleryItem from './GalleryItem';
import NotFound from './NotFound';

const Gallery = (props) => {
  const results = props.data;
  let images;
  if (results.length > 0) {
    images = results.map( image => <GalleryItem url={image.url_z} key={image.id}/> );
  } else {
    images = <NotFound />
  }

  return(
    <div className="photo-container">
      <h2>{props.title}</h2>
      <ul>
        {images}
      </ul>
    </div>
  );
}

export default Gallery;
