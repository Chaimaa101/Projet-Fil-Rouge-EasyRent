const Collaboration = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl uppercase font-bold italic text-center my-12">
        Notre collaboration
      </h1>
      <div className="container px-4 mx-auto my-10 text-stick flex justify-center items-center gap-5 flex-wrap">
        {[
         
          { image: "/hero.png" },
          { image: "/hero.png" },
          { image: "/hero.png" },
          { image: "/hero.png" },
          {
            image: "/hero.png",
          },
        ].map((item, index) => (
          <div key={index}>
            <img
              className="max-w-36"
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
