
import { motion } from "framer-motion"; 
import { BiSolidCollection } from "react-icons/bi";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";
import StatCard from "./common/StatBar";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminProvider";
import RecentReservations from "./statistics/RecentReservations";
import QuickActions from "./statistics/QuickActions";

function Dashboard() {
  const {state,} = useContext(AdminContext)

  return (
  <>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              <StatCard
                name="Total Revenue"
                icon={LuChartNoAxesCombined}
                number={300}
                trend="up"
              />
              <StatCard 
                name="Reservation" 
                icon={FaShoppingCart} 
                number={45}
                trend="neutral"
              />
              <StatCard 
                name="Clients" 
                icon={FaUsers} 
                number={20}
                trend="up"
              />
              <StatCard
                name="Vehicules"
                icon={BiSolidCollection}
                number={12}
                bg="#686ef1"
                trend="down"
              />
            </motion.div>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentReservations/>
              <RecentReservations/>
          </div>
<QuickActions/>
        </main>
            
      </>
  );
}

export default Dashboard;