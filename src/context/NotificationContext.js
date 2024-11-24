import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (user?.isPremium) {
      const storedNotifications = localStorage.getItem(`notifications_${user.id}`);
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        setNotifications(parsedNotifications);
        setUnreadCount(parsedNotifications.filter(n => !n.read).length);
      }
    }
  }, [user]);

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (user?.isPremium) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

  const addNotification = (notification) => {
    if (user?.isPremium) {
      const newNotification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...notification
      };
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        setUnreadCount(count => Math.max(0, count - 1));
      }
      return prev.filter(n => n.id !== notificationId);
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Mock function to check for new trends (replace with actual API call)
  const checkForNewTrends = async () => {
    if (user?.isPremium && user.preferences?.locations) {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock new trends data
        const mockTrends = user.preferences.locations.map(location => ({
          location,
          trends: [
            {
              title: `Trending in ${location}`,
              videoId: `mock_${Date.now()}`,
              thumbnail: `https://picsum.photos/seed/${Date.now()}/200/300`,
              views: Math.floor(Math.random() * 1000000)
            }
          ]
        }));

        mockTrends.forEach(trend => {
          addNotification({
            type: 'TREND',
            title: `New Trend in ${trend.location}`,
            content: `Check out what's trending in ${trend.location}!`,
            data: trend
          });
        });

        return mockTrends;
      } catch (error) {
        console.error('Error checking for new trends:', error);
      }
    }
    return [];
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    checkForNewTrends
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
