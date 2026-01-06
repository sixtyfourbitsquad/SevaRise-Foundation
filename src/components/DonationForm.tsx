import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Heart } from "lucide-react";


const donationAmounts = [500, 1000, 2500, 5000, 10000];

const images = [
  "https://cfstatic.give.do/83cbc6cd-c444-4259-8b98-61aaeda10a5b.png",
  
  "https://cfstatic.give.do/67777ea2-3f0c-4b87-875d-21e045f34c15.webp",
  "https://cfstatic.give.do/fbcbebed-c5ea-4d6d-92ba-ba175777f30a.webp",
  "https://cfstatic.give.do/e9b0472c-94d0-4734-be62-8938e24c571f.webp",
  "https://cfstatic.give.do/6878e600-99e3-4458-94c8-d92aa433954b.webp",
  "https://cfstatic.give.do/6e4006c1-70b1-4e79-b1cb-3ff232d2181b.webp",
  "https://cfstatic.give.do/7e2f7ba0-1e28-441a-9d9b-49a7180199aa.webp",
  "https://cfstatic.give.do/84c55434-ff2e-4edd-96a1-5271c2c5e9ea.webp",

  
  "https://cfstatic.give.do/59b00496-88bc-444f-8903-d731e32aa2f3.webp",
 
  "https://cfstatic.give.do/17f7299e-342e-4163-b3bc-1af3a11da08c.png",
  "https://cfstatic.give.do/6eee9991-02ab-468d-afe7-8499d2365d67.webp",
  "https://cfstatic.give.do/7b5924bd-6af8-4a3f-a468-53691eab9377.webp",
  "https://img.youtube.com/vi/V0KOGuSOi20/maxresdefault.jpg",
  "https://cfstatic.give.do/ab425988-f410-4f07-a7ef-855bc2554fb3.webp",
  "https://cfstatic.give.do/a2e3adb9-4809-4ac8-a0bc-6c1c25edeff9.webp",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F7xZ48abwAAgNst.jpg/960px-F7xZ48abwAAgNst.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDzJJIFNTRmEZqi4eSLMAw_JGmqxk74fggSg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3pa2oJB-rCAZnVOEbylJt8uSn7zRKHTsmCQ&s",
  "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/10/full/20250110185442.jpg"
];


const campaignDetails = {
  // Monthly Missions
  "no-child-orphaned": {
    title: "No Child Orphaned",
    description: "Ensure every child has a safe home and loving family environment.",
    image: images[0]
  },
  "protect-abandoned-elders": {
    title: "Protect Abandoned Elders",
    description: "Provide dignity, care, and support to abandoned elders.",
    image: images[1]
  },
  "safe-water-for-all": {
    title: "Safe Water for All",
    description: "Bring safe and clean drinking water to communities in need.",
    image: images[2]
  },
  "end-period-poverty": {
    title: "End Period Poverty",
    description: "Ensure menstrual health, dignity, and access for all.",
    image: images[3]
  },
  "stop-animal-cruelty": {
    title: "Stop Animal Cruelty",
    description: "Protect animals from abuse and provide compassionate care.",
    image: images[4]
  },
  "feed-the-hungry": {
    title: "Feed the Hungry",
    description: "Provide nutritious meals to vulnerable children and families.",
    image: images[5]
  },
  "right-to-clean-air": {
    title: "Right to Clean Air",
    description: "Support initiatives that fight air pollution and protect health.",
    image: images[6]
  },
  "manage-indias-waste": {
    title: "Manage India's Waste",
    description: "Build cleaner cities through better waste management.",
    image: images[7]
  },
  "every-girl-in-school": {
    title: "Every Girl in School",
    description: "Keep girls in school with education and support.",
    image: images[8]
  },
  "break-cycle-of-poverty": {
    title: "Break Cycle of Poverty",
    description: "Empower families with education, livelihoods, and support.",
    image: images[9]
  },

  // Causes
  "children": {
    title: "Children",
    description: "Protect, educate, and nourish children for a brighter future.",
    image: images[10]
  },
  "health": {
    title: "Health",
    description: "Strengthen healthcare access and outcomes in vulnerable areas.",
    image: images[11]
  },
  "animals": {
    title: "Animals",
    description: "Rescue, rehabilitate, and care for animals in need.",
    image: images[12]
  },
  "elderly": {
    title: "Elderly",
    description: "Provide healthcare and social support to elders.",
    image: images[13]
  },
  "more": {
    title: "More Causes",
    description: "Discover more ways to make an impact.",
    image: images[14]
  },

  // NGOs by area
  "mumbai": {
    title: "NGOs in Mumbai",
    description: "Support local NGOs making a difference in Mumbai.",
    image: images[15]
  },
  "bangalore": {
    title: "NGOs in Bangalore",
    description: "Support local NGOs making a difference in Bangalore.",
    image: images[16]
  },
  "delhi": {
    title: "NGOs in Delhi",
    description: "Support local NGOs making a difference in Delhi.",
    image: images[17]
  },
  "pan-india": {
    title: "NGOs across India",
    description: "Support NGOs creating impact across India.",
    image: images[18]
  },

  // Backward compatibility with existing keys
  "end-hunger": {
    title: "End Hunger",
    description: "Provide nutritious meals to children and families in need.",
    image: images[5] // same as "feed-the-hungry"
  },
  "protect-elders": {
    title: "Protect Elders",
    description: "Support elderly care and healthcare in underserved communities.",
    image: images[1] // same as "protect-abandoned-elders"
  }
};

const DonationForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const campaignId = searchParams.get('campaign') || 'no-child-orphaned';
  const preset = campaignDetails[campaignId as keyof typeof campaignDetails];
  const [dynamicCampaign, setDynamicCampaign] = useState<{ title: string; description: string; image?: string } | null>(null);
  const selectedCampaign = dynamicCampaign || preset || campaignDetails['no-child-orphaned'];
  
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    pincode: "",
    isAnonymous: false,
    allowUpdates: true
  });

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setIsCustom(true);
    if (value) {
      setSelectedAmount(parseInt(value) || 0);
    }
  };

  const finalAmount = isCustom ? (parseInt(customAmount) || 0) : selectedAmount;

  // Load saved draft on mount
  useEffect(() => {
    // Try to resolve campaignId as a fundraiser slug for dynamic campaigns
    const tryLoadFundraiser = async () => {
      try {
        const { data } = await supabase
          .from('fundraisers')
          .select('title, description, image')
          .eq('slug', campaignId)
          .in('status', ['approved', 'published'])
          .maybeSingle();
        if (data) {
          setDynamicCampaign({ title: data.title, description: data.description || data.title, image: data.image || undefined });
        } else {
          setDynamicCampaign(null);
        }
      } catch {
        setDynamicCampaign(null);
      }
    };
    tryLoadFundraiser();

    const saved = localStorage.getItem("donationDraft");
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft && draft.campaign === campaignId) {
          setFormData((prev) => ({
            ...prev,
            fullName: draft.fullName || "",
            mobile: draft.mobile || "",
            email: draft.email || "",
            address: draft.address || "",
            pincode: draft.pincode || "",
            isAnonymous: !!draft.isAnonymous,
            allowUpdates: draft.allowUpdates ?? true,
          }));
          if (draft.amount) {
            setSelectedAmount(Number(draft.amount));
            setIsCustom(false);
            setCustomAmount("");
          }
        }
      } catch {}
    }
  }, [campaignId]);

  // Persist draft on changes
  useEffect(() => {
    const draft = {
      campaign: campaignId,
      amount: finalAmount,
      ...formData,
    };
    localStorage.setItem("donationDraft", JSON.stringify(draft));
  }, [campaignId, finalAmount, formData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-text-primary">
              Make a Donation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Donation Amount */}
            <div>
              <Label className="text-base font-semibold text-text-primary mb-4 block">
                Select Donation Amount
              </Label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountClick(amount)}
                    className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
                      selectedAmount === amount && !isCustom
                        ? 'border-brand-red bg-brand-red text-white'
                        : 'border-gray-300 hover:border-brand-red text-text-primary'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
              <div>
                <Label htmlFor="custom-amount" className="text-sm font-medium text-text-secondary">
                  Or enter custom amount
                </Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <Separator />

            {/* Donor Details */}
            {!formData.isAnonymous && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Donor Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Billing Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    placeholder="Enter pincode"
                  />
                </div>
              </div>
            </div>
            )}

            <Separator />

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, isAnonymous: checked as boolean})
                  }
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Make my donation anonymous
                </Label>
              </div>
              {!formData.isAnonymous && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="updates"
                  checked={formData.allowUpdates}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, allowUpdates: checked as boolean})
                  }
                />
                <Label htmlFor="updates" className="text-sm">
                  I would like to receive updates via SMS/WhatsApp
                </Label>
              </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-primary">
              Donation Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={selectedCampaign.image}
                alt={selectedCampaign.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-2">
                Monthly Pledge - {selectedCampaign.title}
              </h4>
              <p className="text-sm text-text-secondary">
                {selectedCampaign.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Monthly Amount:</span>
                <span className="font-semibold text-text-primary">
                  ₹{finalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Processing Fee:</span>
                <span className="text-text-secondary">₹0</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span className="text-text-primary">Total:</span>
              <span className="text-brand-red">₹{finalAmount.toLocaleString()}</span>
            </div>

            <Button 
              className="w-full" 
              variant="donate-large"
              disabled={!finalAmount || (!formData.isAnonymous && (!formData.fullName || !formData.email || !formData.mobile))}
              onClick={() => navigate(`/payment?campaign=${encodeURIComponent(campaignId)}&amount=${finalAmount}`)}
            >
              <Heart className="w-4 h-4 mr-2" />
              Donate ₹{finalAmount.toLocaleString()}
            </Button>

            <div className="flex items-center justify-center text-xs text-text-secondary mt-4">
              <Shield className="w-4 h-4 mr-1" />
              Secure payment • Tax certificate provided
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationForm;