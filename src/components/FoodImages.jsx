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
    title: 'Mango Juice',
    rows: 2,
    cols: 2,
  },
  {
    img: require('../assets/images/foods/2.jpg'),
    title: 'Pepper Chicken',
  },
  {
    img: require('../assets/images/foods/3.jpg'),
    title: 'Biryani',
  },
  {
    img: require('../assets/images/foods/4.jpg'),
    title: 'Prawns',
    cols: 2,
  },
  {
    img: require('../assets/images/foods/5.jpg'),
    title: 'Momo',
    cols: 2,
  },
  {
    img: require('../assets/images/foods/6.jpg'),
    title: 'Prawns',
    rows: 2,
    cols: 2,
  },
  {
    img: require('../assets/images/foods/7.jpg'),
    title: 'Fruit Salad',
  },
  {
    img: require('../assets/images/foods/8.jpg'),
    title: 'Momo',
  },
  {
    img: require('../assets/images/foods/9.jpg'),
    title: 'Watermelon Juice',
    rows: 2,
    cols: 2,
  },
  {
    img: require('../assets/images/foods/10.jpg'),
    title: 'Haleem',
  },
  {
    img: require('../assets/images/foods/11.jpg'),
    title: 'Ice-cream',
  },
  {
    img: require('../assets/images/foods/12.jpg'),
    title: 'Icecream',
    cols: 2,
  },
  {
    img: require('../assets/images/foods/13.jpg'),
    title: 'Orange Juice',
  },
  {
    img: require('../assets/images/foods/14.jpg'),
    title: 'Icecream',
  },
  {
    img: require('../assets/images/foods/15.jpg'),
    title: 'FrenchFries',
    rows: 2,
    cols: 2,
  },
  {
    img: require('../assets/images/foods/16.jpg'),
    title: 'FrenchFries',
  },
  {
    img: require('../assets/images/foods/17.jpg'),
    title: 'Noddles',
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

