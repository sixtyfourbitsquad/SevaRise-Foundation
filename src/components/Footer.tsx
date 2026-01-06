import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation Links from Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-text-secondary hover:text-text-primary">Home</Link></li>
              <li><Link to="/campaigns" className="text-text-secondary hover:text-text-primary">Campaigns</Link></li>
              <li><Link to="/our-story" className="text-text-secondary hover:text-text-primary">Our Story</Link></li>
              <li><Link to="/how-it-works" className="text-text-secondary hover:text-text-primary">How it works</Link></li>
              <li><Link to="/impact" className="text-text-secondary hover:text-text-primary">Impact</Link></li>
              <li><Link to="/start-fundraiser" className="text-text-secondary hover:text-text-primary">Start a Fundraiser</Link></li>
              <li><Link to="/contact" className="text-text-secondary hover:text-text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">Donate</h3>
            <ul className="space-y-2">
              <li><Link to="/donate?campaign=no-child-orphaned" className="text-text-secondary hover:text-text-primary">No Child Orphaned</Link></li>
              <li><Link to="/donate?campaign=protect-abandoned-elders" className="text-text-secondary hover:text-text-primary">Protect Abandoned Elders</Link></li>
              <li><Link to="/donate?campaign=safe-water-for-all" className="text-text-secondary hover:text-text-primary">Safe Water for All</Link></li>
              <li><Link to="/donate?campaign=end-period-poverty" className="text-text-secondary hover:text-text-primary">End Period Poverty</Link></li>
              <li><Link to="/donate?campaign=stop-animal-cruelty" className="text-text-secondary hover:text-text-primary">Stop Animal Cruelty</Link></li>
              <li><Link to="/donate?campaign=feed-the-hungry" className="text-text-secondary hover:text-text-primary">Feed the Hungry</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">Causes</h3>
            <ul className="space-y-2">
              <li><Link to="/donate?campaign=children" className="text-text-secondary hover:text-text-primary">Children</Link></li>
              <li><Link to="/donate?campaign=health" className="text-text-secondary hover:text-text-primary">Health</Link></li>
              <li><Link to="/donate?campaign=animals" className="text-text-secondary hover:text-text-primary">Animals</Link></li>
              <li><Link to="/donate?campaign=elderly" className="text-text-secondary hover:text-text-primary">Elderly</Link></li>
              <li><Link to="/donate?campaign=more" className="text-text-secondary hover:text-text-primary">More</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">Locations</h3>
            <ul className="space-y-2">
              <li><Link to="/donate?campaign=mumbai" className="text-text-secondary hover:text-text-primary">Mumbai</Link></li>
              <li><Link to="/donate?campaign=bangalore" className="text-text-secondary hover:text-text-primary">Bangalore</Link></li>
              <li><Link to="/donate?campaign=delhi" className="text-text-secondary hover:text-text-primary">Delhi</Link></li>
              <li><Link to="/donate?campaign=pan-india" className="text-text-secondary hover:text-text-primary">PAN India</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <Facebook className="w-5 h-5 text-text-muted hover:text-brand-red cursor-pointer" />
            <Twitter className="w-5 h-5 text-text-muted hover:text-brand-red cursor-pointer" />
            <Instagram className="w-5 h-5 text-text-muted hover:text-brand-red cursor-pointer" />
            <Linkedin className="w-5 h-5 text-text-muted hover:text-brand-red cursor-pointer" />
            <Youtube className="w-5 h-5 text-text-muted hover:text-brand-red cursor-pointer" />
          </div>

          <div className="flex items-center space-x-6 text-sm text-text-secondary">
            <Link to="#" className="hover:text-text-primary">Terms</Link>
            <Link to="#" className="hover:text-text-primary">Privacy Policy</Link>
            <span>© SevaRise Foundation</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-text-muted">
          <p>
            Use of children's information including images, videos, testimonials, etc. in the Campaign is necessary for creating awareness about the charitable cause in order to bring traction to the said 
            charitable cause and obtain donations which can then be used for charitable activities. Information is used and processed with valid consent. This statement is issued in compliance with the 
            Consumer Protection Act, 2019, as amended from time to time.
          </p>
        </div>
      </div>

      {/* Sticky donate button for mobile */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <Button variant="donate" size="lg" className="rounded-full shadow-lg" asChild>
          <Link to="/donate">Donate Now</Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
