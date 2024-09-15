import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Loading from '../components/Loading';
import OrderRow from '../components/OrderRow';
import { ChefAPI } from '../api/chef';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const socket = io('http://localhost:3003');

const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour${hours !== 1 ? 's' : ''}${
      mins > 0 ? ` and ${mins} min${mins !== 1 ? 's' : ''}` : ''
    }`;
  }
};

const generateEstTimeOfOrder = (order) => {
  const totalPizzaQuantity = order.items.reduce((total, item) => {
    if (item.type === 'pizza') {
      return total + item.quantity;
    }
    return total;
  }, 0);
  return totalPizzaQuantity * 5;
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [estTimeRemaining, setEstTimeRemaining] = useState(0);

  const getPendingOrders = async () => {
    setLoading(true);
    const orders = await ChefAPI.getPendingOrders();
    setEstTimeRemaining(orders.estimatedPreprationTimeInMinutes);
    setPendingOrdersCount(orders.pendingOrders);
    setOrders(orders.pendingOrdersList);
    setLoading(false);
  };

  const handleNewOrderAdded = ({ order }) => {
    toast('New order added');
    setOrders((prevOrders) => [order, ...prevOrders]);
    setEstTimeRemaining(
      (prevEstTime) => prevEstTime + generateEstTimeOfOrder(order)
    );
    setPendingOrdersCount((prevCount) => prevCount + 1);
  };
  const handleOrderCompleted = ({ orderId }) => {
    toast(`Order completed with orderId: ${orderId} `);

    setOrders((prevOrders) =>
      prevOrders.filter((prevOrder) => prevOrder._id !== orderId)
    );
  };

  const handlePendingOrderCount = ({
    estimatedPreprationTimeInMinutes,
    pendingOrders,
  }) => {
    setEstTimeRemaining(estimatedPreprationTimeInMinutes);
    setPendingOrdersCount(pendingOrders);
  };
  useEffect(() => {
    getPendingOrders();
    // Handle real-time updates
    socket.on('orderAdded', handleNewOrderAdded);

    socket.on('orderCompleted', handleOrderCompleted);

    socket.on('pendingOrdersCount', handlePendingOrderCount);

    // Clean up on component unmount
    return () => {
      socket.off('orderAdded');
      socket.off('orderCompleted');
      socket.off('pendingOrdersCount');
    };
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
                  Pending orders: {pendingOrdersCount}
                </h2>
                <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
                  Est. time remaining: {formatDuration(estTimeRemaining)}
                </h2>
              </div>

              <div className="mt-6 flow-root sm:mt-8">
                <div className="divide-y divide-gray-200 ">
                  {orders &&
                    orders.map((order) => (
                      <OrderRow key={order._id} order={order} isAdmin />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
      )}
    </>
  );
};

export default AdminDashboard;
