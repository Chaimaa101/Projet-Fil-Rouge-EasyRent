
export default function RecentReservations() {
  // Exemple de données
  const reservations = [
    {
      id: 1,
      name: "Emma Wilson",
      car: "Mercedes C-Class",
      time: "2 days",
      status: "Completed",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg", // tu peux remplacer par ton image
    },
    {
      id: 2,
      name: "Emma Wilson",
      car: "Mercedes C-Class",
      time: "2 days",
      status: "Completed",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Emma Wilson",
      car: "Mercedes C-Class",
      time: "2 days",
      status: "Completed",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Recent Reservations</h2>
        <a href="#" className="text-blue-500 text-sm hover:underline">
          View All
        </a>
      </div>

      {/* List */}
      <ul className="space-y-4">
        {reservations.map((res) => (
          <li key={res.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={res.avatar}
                alt={res.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{res.name}</p>
                <p className="text-gray-500 text-sm">
                  {res.car} - {res.time}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs text-teal-700 bg-teal-100 rounded-full">
              {res.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
