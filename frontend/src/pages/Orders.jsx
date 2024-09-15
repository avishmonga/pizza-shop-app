import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import OrderRow from '../components/OrderRow';
import { OrderAPI } from '../api/order';

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    setLoading(true);
    const orders = await OrderAPI.getOrders();
    setOrders(orders);
    setLoading(false);
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <section className="bg-white py-8 antialiased  md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
                  My orders
                </h2>
              </div>

              <div className="mt-6 flow-root sm:mt-8">
                <div className="divide-y divide-gray-200 ">
                  {orders &&
                    orders.map((order) => (
                      <OrderRow key={order._id} order={order} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Orders;
