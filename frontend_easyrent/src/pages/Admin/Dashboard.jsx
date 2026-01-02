
import { motion } from "framer-motion"; 
import { FaCar, FaShoppingCart, FaUsers } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";
import StatCard from "./common/StatBar";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminProvider";
import QuickActions from "./common/QuickActions";

function Dashboard() {
  const {stats,getDashboardStats} = useContext(AdminContext)

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
          </div>
<QuickActions/>
        </main>
            
      </>
  );
}

export default Dashboard;