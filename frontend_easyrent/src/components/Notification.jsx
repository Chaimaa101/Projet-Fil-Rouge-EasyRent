import { useState } from "react";
import { FiBell } from "react-icons/fi";

export default function NotificationDropdown({ notifications }) {
  const [open, setOpen] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  return (
    <div className="relative">
      {/* Bouton notification */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
    <FiBell size={22} className="hover:text-teal-600 transition" />
        {notifications?.length > 0 && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2 font-semibold text-gray-700 border-b border-gray-200">
            Notifications
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="p-3 text-gray-500 text-sm">Aucune notification</div>
            ) : (
              notifications.map((notif, index) => (
                <div
                  key={index}
                  className="p-3 bg-purple-50 rounded-lg shadow-md border border-gray-200 my-2 mx-2"
                >
                  <div className="notification-title text-sm font-semibold text-gray-800">
                    {notif.title || "Titre"}
                  </div>
                  <div className="notification-message text-xs text-gray-600 mt-1">
                    {notif.message}
                  </div>
                  <div className="notification-date text-[11px] text-gray-400 mt-2">
                    {formatDate(notif.date)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
