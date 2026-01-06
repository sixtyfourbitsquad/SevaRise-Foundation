const ImpactStats = () => {
  const stats = [
    { number: "2,764", label: "Children supported with monthly meals", color: "text-blue-600" },
    { number: "1,849", label: "Families provided safe shelter", color: "text-green-600" },
    { number: "3,500+", label: "Healthcare services delivered", color: "text-purple-600" },
    { number: "5,621", label: "Educational opportunities created", color: "text-orange-600" }
  ];

  return (
    <section className="bg-section-gray py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Impact of Monthly Donors
          </h2>
          <p className="text-xl text-text-secondary">
            See how your regular contributions are making a real difference
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <p className="text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;