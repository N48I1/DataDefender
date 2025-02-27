import React from 'react';
import { Bell, Check, Trash2, CheckCheck } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotifications();

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-purple-900">Notifications</h2>
          </div>
          
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-l-4 p-4 rounded ${
                  notification.read ? 'bg-gray-50 border-gray-300' : 'bg-purple-50 border-purple-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-purple-900">{notification.title}</div>
                    <div className="text-sm text-purple-700 mt-1">{notification.message}</div>
                    <div className="text-xs text-purple-600 mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 hover:bg-purple-100 rounded"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4 text-purple-600" />
                      </button>
                    )}
                    <button
                      onClick={() => clearNotification(notification.id)}
                      className="p-1 hover:bg-purple-100 rounded"
                      title="Delete notification"
                    >
                      <Trash2 className="h-4 w-4 text-purple-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;