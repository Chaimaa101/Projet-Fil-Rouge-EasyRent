const Collaboration = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl uppercase font-bold italic text-center my-12">
        Nos partenaires
      </h1>
      <div className="container px-4 mx-auto my-10 text-stick flex justify-center items-center gap-5 flex-wrap">
        {[
         
          { image: "/collaborators/arfiquia.png" },
          { image: "/collaborators/Audi_logo.png" },
          { image: "/collaborators/BMW.png" },
          { image: "/collaborators/jeep.png" },
          { image: "/collaborators/Mercedes-Benz.png" },
          { image: "/collaborators/total-energies.png" },
          ,
        ].map((item, index) => (
          <div key={index}>
            <img
              className="max-w-25 h-20"
              src={item.image}
              alt={`Logo ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaboration;
