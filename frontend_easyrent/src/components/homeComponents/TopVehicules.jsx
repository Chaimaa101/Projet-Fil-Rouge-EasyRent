import React, { useContext, useEffect } from 'react'
import VehicleCard from '../vehiculesListComponents/VehiculeCard'
import { VehiculeContext } from '../../Context/VehiculeProvider';

function TopVehicules() {
     const { pagination, vehicules, getVehicules, loading,total } =
        useContext(VehiculeContext);
    
      useEffect(() => {
        getVehicules();
      }, []);
  return (
    <>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto text-center">
    {vehicules.map((vehicule) => (
    <VehicleCard vehicule = {vehicule} key ={vehicule.id} />
    ))}
    </div>
    </>
  )
}

export default TopVehicules