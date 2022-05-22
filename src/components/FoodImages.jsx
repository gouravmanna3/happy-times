import React from 'react';
import { Box, ImageList, ImageListItem, Typography } from '@mui/material';

import './Dashboard.css';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: require('../assets/images/foods/1.jpg'),
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: require('../assets/images/foods/2.jpg'),
    title: 'Burger',
  },
  {
    img: require('../assets/images/foods/3.jpg'),
    title: 'Camera',
  },
  {
    img: require('../assets/images/foods/4.jpg'),
    title: 'Coffee',
    cols: 2,
  },
  {
    img: require('../assets/images/foods/5.jpg'),
    title: 'Hats',
    cols: 2,
  },
  {
    img: require('../assets/images/foods/6.jpg'),
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: require('../assets/images/foods/7.jpg'),
    title: 'Basketball',
  },
  {
    img: require('../assets/images/foods/8.jpg'),
    title: 'Fern',
  },
  {
    img: require('../assets/images/foods/9.jpg'),
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: require('../assets/images/foods/10.jpg'),
    title: 'Tomato basil',
  },
  {
    img: require('../assets/images/foods/11.jpg'),
    title: 'Sea star',
  },
  {
    img: require('../assets/images/foods/12.jpg'),
    title: 'Bike',
    cols: 2,
  },
];

const FoodImages = () => {
  return (
    <Box>
      <p className="foodHeading">   
       Foods that brought us closer {String.fromCodePoint('0x1F354')} {String.fromCodePoint('0x1F368')} 
       {String.fromCodePoint('0x1F35F')} {String.fromCodePoint('0x1F95F')} 
      </p>
      <ImageList sx={{ width: 'auto', height: 492 }} variant="woven" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=161&fit=crop&auto=format`}
              srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}

export default FoodImages;

