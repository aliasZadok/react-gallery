import React from 'react';
import GalleryItem from './GalleryItem';

const DefaultRoutes = (props) => {
  let images = props.defaultImages.map((image) => {
    return <GalleryItem url={image.url_z} key={image.id}/>
  });
  return(
    <div className="photo-container">
      <ul>
        {images}
      </ul>
    </div>
  );
}

export default DefaultRoutes;
