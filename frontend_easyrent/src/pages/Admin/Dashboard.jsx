
import { motion } from "framer-motion"; 
import { FaCar, FaShoppingCart, FaUsers } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";
import StatCard from "./common/StatBar";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminProvider";
import QuickActions from "./common/QuickActions";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";



function Dashboard() {
  const {stats,getDashboardStats} = useContext(AdminContext)
     
  // const reservationsByMonth = [
  //   { month: "Jan", total: 12 },
  //   { month: "Feb", total: 18 },
  //   { month: "Mar", total: 22 },
  //   { month: "Apr", total: 16 },
  //   { month: "May", total: 28 },
  // ];

  // const reservationStatus = [
  //   { name: "Payées", value: 50 },
  //   { name: "En attente", value: 20 },
  //   { name: "Annulées", value: 16 },
  // ];

  // const COLORS = ["#0f766e", "#14b8a6", "#f87171"];


  useEffect(()=>{
    getDashboardStats()
  },[])
  return (
  <>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              <StatCard
                name="Total Revenue"
                icon={LuChartNoAxesCombined}
                number={stats?.revenus}
                trend="up"
              />
              <StatCard
                name="Vehicules loué"
                icon={FaCar}
                number={stats?.loue}
                trend="up"
              />
              <StatCard 
                name="Reservation" 
                icon={FaShoppingCart} 
                number={stats?.reservations}
                trend="neutral"
              />
              <StatCard 
                name="Clients" 
                icon={FaUsers} 
                number={stats?.users}
                trend="up"
              />
              <StatCard
                name="Vehicules"
                icon={FaCar}
                number={stats?.vehicles}
                bg="#686ef1"
                trend="down"
              />
            </motion.div>
          </div>


{/* 
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-teal-700">Dashboard Admin – EasyRent</h1>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Réservations par mois</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reservationsByMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

     
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Statut des réservations</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reservationStatus}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {reservationStatus.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        </div>
        </div> */}
 

<QuickActions/>
        </main>
            
      </>
  );
}

export default Dashboard; 