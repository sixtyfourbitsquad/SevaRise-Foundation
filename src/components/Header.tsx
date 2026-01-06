import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  const initials = user?.email ? user.email[0]?.toUpperCase() : "U";

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  const handleRefresh = async () => {
    await supabase.auth.refreshSession();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="SevaRise Foundation" className="h-32 w-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-text-secondary hover:text-text-primary">
            Home
          </Link>
          <Link to="/campaigns" className="text-text-secondary hover:text-text-primary">
            Campaigns
          </Link>
          <Link to="/our-story" className="text-text-secondary hover:text-text-primary">
            Our Story
          </Link>
          <Link to="/how-it-works" className="text-text-secondary hover:text-text-primary">
            How it works
          </Link>
          <Link to="/impact" className="text-text-secondary hover:text-text-primary">
            Impact
          </Link>
          <Link to="/start-fundraiser" className="text-text-secondary hover:text-text-primary">
            Start a Fundraiser
          </Link>
          <Link to="/contact" className="text-text-secondary hover:text-text-primary">
            Contact
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-text-secondary hover:text-text-primary font-medium flex items-center gap-1">
              Donate
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[320px] md:w-[560px] p-2">
              <DropdownMenuLabel className="text-xs text-text-secondary">TO OUR MONTHLY MISSIONS</DropdownMenuLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=no-child-orphaned">No Child Orphaned</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=protect-abandoned-elders">Protect Abandoned Elders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=safe-water-for-all">Safe Water for All</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=end-period-poverty">End Period Poverty</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=stop-animal-cruelty">Stop Animal Cruelty</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=feed-the-hungry">Feed the Hungry</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=right-to-clean-air">Right to Clean Air</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=manage-indias-waste">Manage India's Waste</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=every-girl-in-school">Every Girl in School</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=break-cycle-of-poverty">Break Cycle of Poverty</Link>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-text-secondary">TO A CAUSE</DropdownMenuLabel>
              <div className="grid grid-cols-2 gap-1">
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=children">Children</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=health">Health</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=animals">Animals</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=elderly">Elderly</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=more">More</Link>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-text-secondary">TO NGOs IN YOUR AREA</DropdownMenuLabel>
              <div className="grid grid-cols-2 gap-1">
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=mumbai">Mumbai</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=bangalore">Bangalore</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=delhi">Delhi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donate?campaign=pan-india">PAN India</Link>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="text-text-secondary hover:text-text-primary py-2">
                  Home
                </Link>
                <Link to="/campaigns" className="text-text-secondary hover:text-text-primary py-2">
                  Campaigns
                </Link>
                <Link to="/our-story" className="text-text-secondary hover:text-text-primary py-2">
                  Our Story
                </Link>
                <Link to="/how-it-works" className="text-text-secondary hover:text-text-primary py-2">
                  How it works
                </Link>
                <Link to="/impact" className="text-text-secondary hover:text-text-primary py-2">
                  Impact
                </Link>
                <Link to="/start-fundraiser" className="text-text-secondary hover:text-text-primary py-2">
                  Start a Fundraiser
                </Link>
                <Link to="/contact" className="text-text-secondary hover:text-text-primary py-2">
                  Contact
                </Link>
                <div className="pt-4">
                  <Button variant="donate" className="w-full" asChild>
                    <Link to="/donate">Donate Now</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">INR(₹)</span>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="max-w-[200px] truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRefresh}>Refresh session</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="donate" size="sm" className="bg-brand-red hover:bg-brand-red/90 text-white font-semibold" asChild>
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;