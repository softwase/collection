import React, { useEffect, useMemo, useState } from 'react';
import * as _ from 'lodash';

import GameField from '@app/components/GameField';
import FrogImage from '@assets/frog.jpg'
import GlassesImage from '@assets/glasses.jpg'
import ElephantImage from '@assets/elephant.jpg'

const images = [ElephantImage, ElephantImage, FrogImage, GlassesImage, FrogImage, GlassesImage];

interface IProps {
  fieldSize: number
}

const GameFieldContainer = (props: IProps) => {
  const { fieldSize } = props;

  const [ selected, setSelected ] = useState<Array<{image: string, index: number}>>([]);
  const [ visibleImages, setVisibleImages ] = useState<Array<string>>([]);

  const isGameOver: boolean =  useMemo(() => (
    images.length === visibleImages.length
  ), [images, visibleImages]);

  useEffect(() => {
    setTimeout(() => {
      console.log('fieldsSIze', fieldSize, ElephantImage)
    })
  }, [])

  useEffect(() => {
    if (selected.length === 2) {
      setTimeout(() => {
        setSelected([]);
      }, 1000)
    }
  }, [selected])

  const onImageClick = (image: string, index: number) => () => {
    if (selected.length === 2 || visibleImages.includes(image)) {
      return;
    }

    if (!selected.length) {
      setSelected([{image, index}])

      return;
    }

    setSelected((images) => {
      const lastSelectedImage = _.last(images)

      if (lastSelectedImage?.image === image && lastSelectedImage?.index !== index) {
        setVisibleImages((prev) => ([
          ...prev,
          image
        ]))

        return [];
      }
      
      return [...images, {image, index}];
    })
    

  };

  return (
    <GameField 
      images={ images }
      onImageClick={onImageClick}
      selectedImage={selected}
      visibleImages={visibleImages}
      isGameOver={isGameOver}
    />
  )
}

export default GameFieldContainer;