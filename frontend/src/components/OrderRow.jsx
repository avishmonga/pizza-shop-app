import React, { useState } from 'react';
import moment from 'moment';

const OrderRow = ({ order, isAdmin }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div key={order._id} className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap items-center gap-y-4">
        <div className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <div className="text-base font-medium text-gray-500">Order ID:</div>
          <div className="order-id mt-1.5 text-sm font-semibold text-gray-900 mr-4">
            #{order._id}
          </div>
        </div>

        {isAdmin && (
          <div className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <div className="text-base font-medium text-gray-500">
              Client ID:
            </div>
            <div className="order-id mt-1.5 text-sm font-semibold text-gray-900 mr-4">
              #{order.clientId}
            </div>
          </div>
        )}
        <div className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <div className="text-base font-medium text-gray-500">Date:</div>
          <div className="mt-1.5 text-base font-semibold text-gray-900">
            {moment(order.createdAt).format('MMM Do YY')}
          </div>
        </div>

        <div className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <div className="text-base font-medium text-gray-500">Price:</div>
          <div className="mt-1.5 text-base font-semibold text-gray-900">
            ${order.totalPrice}
          </div>
        </div>

        <div className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <div className="text-base font-medium text-gray-500">Status:</div>
          <div
            className={`mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
              order.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <svg
              className="mr-1 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 11.917 9.724 16.5 19 7.5"
              />
            </svg>
            {order.status}
          </div>
        </div>

        <div className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto"
          >
            {showDetails ? 'Hide details' : 'View details'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="w-full mt-6 px-4 py-6 bg-gray-50 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-900">{item.name}</td>
                  <td className="px-4 py-2 text-gray-900">{item.quantity}</td>
                  <td className="px-4 py-2 text-gray-900">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderRow;
