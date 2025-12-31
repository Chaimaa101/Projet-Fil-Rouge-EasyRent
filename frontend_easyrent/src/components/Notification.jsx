import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiBell } from "react-icons/fi";

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);


  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/notifications"); 
      // setNotifications(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.post(`/api/notifications/${id}/read`);
     fetchNotifications()
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications?.filter(n => !n.read_at).length;

  return (
    <div className="relative inline-block text-left">
       <button
        onClick={() => setOpen(!open)}
        className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
    <FiBell size={22} className="hover:text-teal-600 transition" />
 
          <span className="absolute top-0 right-0  text-red-500 rounded-full">{unreadCount}</span>
  
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md z-50">
          <ul className="divide-y divide-gray-200">
            {notifications?.length === 0 && (
              <li className="px-4 py-2 text-gray-500">Pas de notifications</li>
            )}
            {notifications?.map((notification) => (
              <li
                key={notification.id}
                className={`px-4 py-2 cursor-pointer ${
                  notification.read_at ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => !notification.read_at && markAsRead(notification.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">
                      {notification.data.title || "Notification"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read_at && (
                    <span className="text-xs text-blue-500">New</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
