const StoriesOfHope = () => {
  const testimonials = [
    {
      quote: "Thanks to the monthly support, my children now have access to education and healthcare. Our family has hope for a better future.",
      author: "Priya Sharma",
      location: "Mumbai",
      avatar: "PS"
    },
    {
      quote: "The shelter program saved our family during the most difficult time. We are forever grateful for the support we received.",
      author: "Raj Kumar",
      location: "Delhi", 
      avatar: "RK"
    },
    {
      quote: "My daughter can now attend school regularly. The education support has opened doors we never thought possible.",
      author: "Sunita Devi",
      location: "Bangalore",
      avatar: "SD"
    }
  ];

  return (
    <section className="bg-section-pink py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Stories of Hope
          </h2>
          <p className="text-xl text-text-secondary">
            Hear from families whose lives have been transformed by your generosity
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <div className="text-4xl text-brand-red mb-2">"</div>
                <p className="text-text-secondary italic leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-red text-white rounded-full flex items-center justify-center font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesOfHope;