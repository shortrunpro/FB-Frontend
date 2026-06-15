export const cart = {
  totals: {
    currency: '$',
    product_price: 4542,
    delivery_price: 20,
    total_price: 4562
  },
  items: [
    {
      id: 'item-1',
      products: [
        {
          id: 'product-1',
          thumbnail: '/images/home-products/product-1.jpg',
          brand: 'Gentle Monster',
          title: 'Cargo Denim Jacket',
          size: 'M',
          color: 'Blue',
          price: 588,
          originalPrice: 799,
          currency: '$'
        },
        {
          id: 'product-2',
          thumbnail: '/images/home-products/product-3.jpg',
          brand: 'Nike',
          title: 'Air Force Triple Red Sneakers',
          size: '36',
          color: 'Red',
          price: 588,
          originalPrice: 799,
          currency: '$'
        }
      ],
      delivery_price: 10,
      currency: '$'
    },
    {
      id: 'item-2',

      products: [
        {
          id: 'product-1',
          thumbnail: '/images/home-products/product-2.jpg',
          brand: 'Gentle Monster',
          title: 'Square-frame Glasses',
          size: 'One Size',
          color: 'Brown',
          price: 588,
          originalPrice: 799,
          currency: '$'
        }
      ],
      delivery_price: 10,
      currency: '$'
    }
  ]
};
