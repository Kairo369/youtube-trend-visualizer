import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { Link } from 'react-router-dom';
import { FaTimes, FaCheckCircle, FaTrash, FaBell } from 'react-icons/fa';

export default function NotificationPanel({ isOpen, onClose }) {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  } = useNotifications();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#6B46C1] hover:text-[#553499] transition-colors duration-200"
            >
              Mark all as read
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${
                  !notification.read ? 'bg-purple-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {notification.content}
                    </p>
                    {notification.type === 'TREND' && (
                      <Link
                        to={`/trends/${notification.data.location}`}
                        className="mt-2 inline-flex items-center text-sm text-[#6B46C1] hover:text-[#553499]"
                        onClick={() => markAsRead(notification.id)}
                      >
                        View Trends
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    )}
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span>
                        {new Date(notification.timestamp).toLocaleDateString()} at{' '}
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-[#6B46C1] hover:text-[#553499] transition-colors duration-200"
                        title="Mark as read"
                      >
                        <FaCheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      title="Delete notification"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <FaBell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              New trends from your selected locations will appear here
            </p>
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={clearAllNotifications}
            className="w-full px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            Clear all notifications
          </button>
        </div>
      )}
    </div>
  );
}
