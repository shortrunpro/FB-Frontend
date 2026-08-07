import React from 'react';

import Thumbnail from '../Thumbnail/Thumbnail';

type PropType = {
  selected: boolean;
  image: string;
  onClick: () => void;
};

export const Thumb = (props: PropType) => {
  const { selected, image, onClick } = props;

  return (
    <div className={'pg-thumbs__slide'}>
      <button
        onClick={onClick}
        type="button"
        className="pg-thumbs__slide__number"
      >
        <Thumbnail
          size="small"
          thumbnail={image}
          className="p-0"
        />
      </button>
    </div>
  );
};
