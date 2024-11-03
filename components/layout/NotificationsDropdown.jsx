import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Calendar, 
  Tool, 
  Gift, 
  Shield,
  ChevronRight
} from 'lucide-react';

const NotificationItem = ({ notification }) => {
  const icons = {
    service: Tool,
    reward: Gift,
    insurance: Shield,
    appointment: Calendar
  };

  const Icon = icons[notification.type] || Bell;

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
      <div className={`p-2 rounded-lg ${
        notification.read ? 'bg-gray-100' : 'bg-blue-100'
      }`}>
        <Icon className={`h-5 w-5 ${
          notification.read ? 'text-gray-500' : 'text-blue-500'
        }`} />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className={`font-medium ${
            notification.read ? 'text-gray-600' : 'text-gray-900'
          }`}>
            {notification.title}
          </div>
          {!notification.read && (
            <Badge variant="secondary" className="flex-shrink-0">New</Badge>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-1">
          {notification.message}
        </p>

        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="text-gray-400">
            {notification.time}
          </span>
          {notification.action && (
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              {notification.action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      type: 'service',
      title: 'Service Reminder',
      message: 'Your Ferrari F8 is due for annual maintenance',
      time: '2 hours ago',
      read: false,
      action: 'Schedule Now'
    },
    {
      id: 2,
      type: 'reward',
      title: 'Points Earned',
      message: 'You earned 500 points from your recent service',
      time: '1 day ago',
      read: true
    }
    // Add more notifications as needed
  ]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg relative"
      >
        <Bell className="h-5 w-5" />
        {notifications.some(n => !n.read) && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <Card className="absolute right-0 top-12 w-96 max-h-[32rem] z-50 overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-gray-500">
                  You have {notifications.filter(n => !n.read).length} unread notifications
                </p>
              </div>
              <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
                Mark all read
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>

            <div className="p-3 border-t">
              <button className="w-full px-3 py-2 text-sm text-blue-500 hover:text-blue-600 
                font-medium flex items-center justify-center gap-2">
                View All Notifications
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default NotificationsDropdown;