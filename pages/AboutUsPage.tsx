import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511920183353-3c9c9b0a1d4b?q=80&w=1887')" }}>
        <div className="absolute inset-0 bg-stone-900/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">About Golden Harvest</h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-200">The Foundation of Culinary Excellence</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Mission</h2>
            <p className="text-lg text-stone-700 leading-relaxed">
              At Golden Harvest Supply, our mission is simple: to be the most trusted partner for chefs, restaurateurs, and culinary artisans by providing unparalleled access to the world's finest raw ingredients. We believe that exceptional dishes begin with exceptional materials. We are dedicated to sourcing, curating, and delivering ingredients that inspire creativity and elevate every culinary creation.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">From Source to Kitchen</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-4">
              Our journey starts at the source. We build lasting relationships with growers, farmers, and producers who share our passion for quality and sustainability. From the volcanic soils of Sumatra for our coffee beans to the heritage mills of Italy for our flour, we meticulously select each product to ensure it meets our exacting standards.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed">
              This direct-sourcing approach not only guarantees the freshness and authenticity of our products but also supports the communities that cultivate them. We provide full transparency in our supply chain, so you know exactly where your ingredients come from.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Commitment to You</h2>
            <p className="text-lg text-stone-700 leading-relaxed">
              Whether you are a Michelin-starred restaurant or a passionate home cook, we are committed to being your reliable partner. We offer our curated selection to businesses and individuals alike, ensuring everyone has the opportunity to work with the best. We are more than just a supplier; we are a part of your culinary team, dedicated to helping you achieve your vision.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;