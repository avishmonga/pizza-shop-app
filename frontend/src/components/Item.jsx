import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { useCart } from '../providers/cartContext';

const sizeOptions = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

const quantityOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

const Item = ({ item }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[0]);

  return (
    <div className="font-bold w-full max-w-[300px] bg-white p-5 flex flex-col rounded-lg shadow-lg gap-3">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[180px] object-cover rounded-lg hover:scale-110 transition-all duration-500 ease-in-out"
      />
      <div className="flex justify-between items-center text-sm">
        <h2 className="text-gray-700">{item.name}</h2>
        <span className="text-green-500 font-semibold">${item.price}</span>
      </div>
      <div className="flex justify-between items-center gap-2">
        <Dropdown
          options={sizeOptions}
          selected={selectedSize}
          setSelected={setSelectedSize}
          className="w-[45%]" // Set width for dropdown
        />
        <Dropdown
          options={quantityOptions}
          selected={selectedQuantity}
          setSelected={setSelectedQuantity}
          className="w-[30%]" // Set width for dropdown
        />
        <button
          onClick={() => {
            addToCart({
              ...item,
              size: selectedSize.value,
              quantity: selectedQuantity.value,
            });
          }}
          className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm w-[25%]"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Item;
