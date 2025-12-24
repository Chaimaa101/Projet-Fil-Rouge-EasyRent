import VehicleCard from "./VehicleCard";

const vehicles = [
  {
    id: 1,
    brand: "Mercedes",
    price: 25,
    image: "/car.png",
    seats: 5,
    luggage: 2,
    transmission: "Automatic",
  },
  {
    id: 2,
    brand: "Mercedes",
    price: 25,
    image: "/car.png",
    seats: 5,
    luggage: 2,
    transmission: "Automatic",
  },
  {
    id: 3,
    brand: "Mercedes",
    price: 25,
    image: "/car.png",
    seats: 5,
    luggage: 2,
    transmission: "Automatic",
  },
];

export default function FeaturedVehicles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
