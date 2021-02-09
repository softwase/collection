import React    from 'react';
import { find } from 'lodash';

import { Grid } from '@material-ui/core';
import * as S   from './styles';

interface ISelected {
  image: string,
  index: number
}

interface IProps {
  images: Array<string>
  onImageClick: Function,
  selectedImage: Array<ISelected>,
  visibleImages: Array<string>,
  isGameOver: boolean
}

const GameField = (props: IProps) => {
    const {
        images, onImageClick, selectedImage, visibleImages, isGameOver
    } = props;

    return (
        <Grid container spacing={ 3 }>
            { images.map((image, index) => (
                <Grid item xs={ 4 } key={ index }>
                    <S.OverlayContainer onClick={ !isGameOver ? onImageClick(image, index) : null }>
                        <S.Image src={ image } />
                        <S.Overlay
                            visible={ find(selectedImage, { index })?.index === index || visibleImages.includes(image) }
                        />
                    </S.OverlayContainer>
                </Grid>
            )) }
        </Grid>
    );
};

export default GameField;
