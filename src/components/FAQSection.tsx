import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How can I be sure my donation is being used effectively?",
      answer: "We maintain complete transparency with regular impact reports, financial statements, and updates on how funds are being utilized. You'll receive monthly updates on the progress of programs your donation supports."
    },
    {
      question: "Can I choose which specific program my donation supports?",
      answer: "Yes, you can choose to support specific programs like education, healthcare, shelter, or general support. When donating, you can select your preferred area of impact."
    },
    {
      question: "Is my donation tax deductible?",
      answer: "Yes, all donations are eligible for tax deduction under Section 80G of the Income Tax Act. You'll receive a tax certificate for your donations within 48 hours."
    },
    {
      question: "How do I cancel or modify my monthly donation?",
      answer: "You can easily manage your monthly donations through your account dashboard. You can modify the amount, pause, or cancel your subscription at any time."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, net banking, UPI, and digital wallets. All transactions are processed through secure payment gateways."
    }
  ];

  return (
    <section className="bg-section-gray py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-text-secondary">
              Get answers to common questions about donating and our programs
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg px-6 shadow-sm border-0"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-text-primary">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;