import React, { useEffect, useState } from 'react';
import Item from '../components/Item';
import { MenuAPI } from '../api/menu';

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const getMenuItems = async () => {
    try {
      const menuItems = await MenuAPI.getMenu();
      setMenuItems(menuItems);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMenuItems();
  }, []);
  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
