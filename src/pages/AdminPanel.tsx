import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Eye, Users, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthContext";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
  const { role } = useContext(AuthContext);
  const [fundraisers, setFundraisers] = useState<any[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    subtitle: "",
    description: "",
    goal: "",
    image: "",
    type: "org" as "org" | "monthly",
  });
  const [uploadingCampaignImage, setUploadingCampaignImage] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState({
    upi: "",
    bank: "",
    account: "",
    ifsc: "",
    qr_url: "",
  });
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [pendingFundraisers, setPendingFundraisers] = useState<any[]>([]);
  const [loadingFundraisers, setLoadingFundraisers] = useState(false);
  
  const [slides, setSlides] = useState<any[]>([]);
  const [loadingSlides, setLoadingSlides] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("campaigns");
  const [slideSaving, setSlideSaving] = useState(false);
  const [slideMessage, setSlideMessage] = useState<string | null>(null);
  const [newSlide, setNewSlide] = useState({
    image_url: "",
    title: "",
    description: "",
    cta: "Donate Now",
    cta_link: "/donate",
    sort_order: 0,
    is_active: true,
  });
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  // Inline edit state for approved campaigns
  const [adminEditRaised, setAdminEditRaised] = useState<Record<string, string>>({});
  const [adminEditDonations, setAdminEditDonations] = useState<Record<string, string>>({});
  const [adminEditDaysLeft, setAdminEditDaysLeft] = useState<Record<string, string>>({});
  const [adminUpdatingId, setAdminUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const loadPending = async () => {
      setLoadingPayments(true);
      const { data } = await supabase
        .from("manual_payments")
        .select("id, user_id, amount, campaign, receipt_url, status, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      setPendingPayments(data || []);
      setLoadingPayments(false);
    };
    loadPending();

    const loadFundraisers = async () => {
      setLoadingFundraisers(true);
      // Load approved campaigns for Campaigns tab
      const { data: approved } = await supabase
        .from("fundraisers")
        .select("id, slug, title, description, goal, raised, donations, days_left, status, type, image, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      setFundraisers(approved || []);
      // Seed inline edit values
      const r: Record<string, string> = {};
      const d: Record<string, string> = {};
      const dl: Record<string, string> = {};
      (approved || []).forEach((f) => {
        r[f.id] = String(f.raised ?? "");
        d[f.id] = String(f.donations ?? "");
        dl[f.id] = String(f.days_left ?? "");
      });
      setAdminEditRaised(r);
      setAdminEditDonations(d);
      setAdminEditDaysLeft(dl);
      // Load pending fundraisers for moderation tab
      const { data: pending } = await supabase
        .from("fundraisers")
        .select("id, slug, title, description, goal, raised, donations, days_left, status, type, image, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      setPendingFundraisers(pending || []);
      setLoadingFundraisers(false);
    };
    loadFundraisers();

    

    // Load payment settings from DB
    (async () => {
      try {
        const { data } = await supabase
          .from('payment_settings')
          .select('upi, bank, account, ifsc, qr_url')
          .eq('id', 1)
          .maybeSingle();
        if (data) {
          setPaymentSettings({
            upi: data.upi || '',
            bank: data.bank || '',
            account: data.account || '',
            ifsc: data.ifsc || '',
            qr_url: data.qr_url || '',
          });
        }
      } catch {}
    })();

    const loadSlides = async () => {
      setLoadingSlides(true);
      const { data } = await supabase
        .from('hero_slides')
        .select('id, image_url, title, description, cta, cta_link, sort_order, is_active')
        .order('sort_order', { ascending: true });
      setSlides(data || []);
      setLoadingSlides(false);
    };
    loadSlides();
  }, []);

  // Save occurs on button click only

  const handleModerate = async (id: string, next: "approved" | "rejected") => {
    const { error } = await supabase.from("manual_payments").update({ status: next }).eq("id", id);
    if (!error) setPendingPayments((prev) => prev.filter((p) => p.id !== id));
  };

  const handleModerateFundraiser = async (id: string, next: "approved" | "rejected") => {
    const { error } = await supabase.from("fundraisers").update({ status: next }).eq("id", id);
    if (!error) {
      // Remove from pending list
      setPendingFundraisers((prev) => prev.filter((p) => p.id !== id));
      // If approved, refresh approved campaigns list
      if (next === "approved") {
        const { data: approved } = await supabase
          .from("fundraisers")
          .select("id, slug, title, description, goal, raised, donations, status, type, image, created_at")
          .eq("status", "approved")
          .order("created_at", { ascending: false });
        setFundraisers(approved || []);
      }
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.title || !newCampaign.description || !newCampaign.goal) return;
    const slug = newCampaign.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const insert = {
      slug,
      title: newCampaign.title,
      subtitle: newCampaign.subtitle || null,
      description: newCampaign.description,
      story: newCampaign.description,
      image: newCampaign.image || null,
      goal: parseInt(newCampaign.goal),
      raised: 0,
      donations: 0,
      type: newCampaign.type,
      organizer: newCampaign.type === 'monthly' ? 'SevaRise Foundation' : null,
      organizer_verified: newCampaign.type === 'monthly' ? true : null,
      // Admin-created campaigns are immediately approved
      status: role === 'admin' ? 'approved' : 'pending',
    } as any;
    await supabase.from('fundraisers').insert(insert);
    // Refresh approved and pending lists
    const [{ data: approved }, { data: pending }] = await Promise.all([
      supabase
        .from("fundraisers")
        .select("id, slug, title, description, goal, raised, donations, status, type, image, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false }),
      supabase
        .from("fundraisers")
        .select("id, slug, title, description, goal, raised, donations, status, type, image, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: false }),
    ]);
    setFundraisers(approved || []);
    setPendingFundraisers(pending || []);
    setNewCampaign({ title: "", subtitle: "", description: "", goal: "", image: "", type: newCampaign.type });
  };

  const handleDeleteCampaign = async (id: string) => {
    await supabase.from('fundraisers').delete().eq('id', id);
    setFundraisers((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAdminUpdateStats = async (id: string) => {
    setAdminUpdatingId(id);
    try {
      const payload: any = {
        raised: Number(adminEditRaised[id] || 0),
        donations: Number(adminEditDonations[id] || 0),
        days_left: Number(adminEditDaysLeft[id] || 0),
      };
      const { error } = await supabase.from('fundraisers').update(payload).eq('id', id);
      if (error) throw error;
      // reflect local changes
      setFundraisers((prev) => prev.map((f) => f.id === id ? { ...f, ...payload } : f));
    } catch {}
    setAdminUpdatingId(null);
  };

  const totalRaised = fundraisers.reduce((sum, c) => sum + (c.raised || 0), 0);
  const totalDonations = fundraisers.reduce((sum, c) => sum + (c.donations || 0), 0);
  

  if (role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-2">Admin Panel</h1>
            <p className="text-text-secondary">Manage campaigns, donations, and content</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-red/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">
                      ₹{totalRaised.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-secondary">Total Raised</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">{totalDonations}</div>
                    <div className="text-sm text-text-secondary">Total Donations</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">{fundraisers.length}</div>
                    <div className="text-sm text-text-secondary">Active Campaigns</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Desktop Tabs */}
            <TabsList className="hidden md:grid w-full grid-cols-5">
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="fundraisers">Fundraisers</TabsTrigger>
            </TabsList>

            {/* Mobile Dropdown */}
            <div className="md:hidden">
              <select 
                className="w-full p-3 border rounded-lg bg-white"
                onChange={(e) => setActiveTab(e.target.value)}
                value={activeTab}
              >
                <option value="campaigns">Campaigns</option>
                <option value="donations">Donations</option>
                <option value="content">Content</option>
                <option value="payments">Payments</option>
                <option value="fundraisers">Fundraisers</option>
              </select>
            </div>

            <TabsContent value="campaigns" className="space-y-6">
              {/* Create New Campaign */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create New Campaign
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Campaign Title</Label>
                      <Input
                        id="title"
                        value={newCampaign.title}
                        onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                        placeholder="Enter campaign title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="goal">Fundraising Goal (₹)</Label>
                      <Input
                        id="goal"
                        type="number"
                        value={newCampaign.goal}
                        onChange={(e) => setNewCampaign({...newCampaign, goal: e.target.value})}
                        placeholder="Enter goal amount"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={newCampaign.subtitle}
                        onChange={(e) => setNewCampaign({...newCampaign, subtitle: e.target.value})}
                        placeholder="Enter subtitle"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Campaign Type</Label>
                      <select id="type" className="w-full h-10 border rounded px-3" value={newCampaign.type} onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value as any})}>
                        <option value="org">Organization-based</option>
                        <option value="monthly">Monthly Mission</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCampaign.description}
                      onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                      placeholder="Enter campaign description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Campaign Image (URL or upload)</Label>
                    <Input
                      id="image"
                      value={newCampaign.image}
                      onChange={(e) => setNewCampaign({...newCampaign, image: e.target.value})}
                      placeholder="Enter image URL"
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        id="image-file"
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingCampaignImage(true);
                          try {
                            const filePath = `campaigns/${Date.now()}_${file.name}`;
                            const { data, error } = await supabase.storage.from('images').upload(filePath, file, { upsert: true });
                            if (error) throw error;
                            const { data: pub } = await supabase.storage.from('images').getPublicUrl(data.path);
                            setNewCampaign({ ...newCampaign, image: pub.publicUrl });
                          } catch {}
                          setUploadingCampaignImage(false);
                        }}
                      />
                      {uploadingCampaignImage ? <span className="text-xs text-text-secondary">Uploading...</span> : null}
                    </div>
                  </div>
                  <Button onClick={handleCreateCampaign} className="w-full">
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Campaigns */}
              <Card>
                <CardHeader>
                  <CardTitle>Manage Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fundraisers.map((campaign) => (
                      <div key={campaign.id} className="p-4 border rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-text-primary">{campaign.title}</h3>
                            <Badge variant={'default'}>{campaign.status}</Badge>
                            <Badge variant={'secondary'}>{campaign.type}</Badge>
                          </div>
                          <p className="text-text-secondary text-sm mb-2">{campaign.description}</p>
                          <div className="flex gap-4 text-sm text-text-secondary">
                            <span>₹{(campaign.raised||0).toLocaleString()} / ₹{(campaign.goal||0).toLocaleString()}</span>
                            <span>{campaign.donations || 0} donations</span>
                            <span>{campaign.goal ? Math.round(((campaign.raised||0) / campaign.goal) * 100) : 0}% funded</span>
                          </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                              <a href={campaign.slug ? `/campaign/${campaign.slug}` : '#'} target={campaign.slug ? '_blank' : undefined} rel="noreferrer">
                                <Eye className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteCampaign(campaign.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {/* Update Stats - visible on mobile too */}
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 md:flex md:items-center md:gap-2 gap-2">
                          <Input className="w-full md:w-24" placeholder="Raised" value={adminEditRaised[campaign.id] ?? ''} onChange={(e) => setAdminEditRaised({ ...adminEditRaised, [campaign.id]: e.target.value })} />
                          <Input className="w-full md:w-20" placeholder="Donations" value={adminEditDonations[campaign.id] ?? ''} onChange={(e) => setAdminEditDonations({ ...adminEditDonations, [campaign.id]: e.target.value })} />
                          <Input className="w-full md:w-20" placeholder="Days" value={adminEditDaysLeft[campaign.id] ?? ''} onChange={(e) => setAdminEditDaysLeft({ ...adminEditDaysLeft, [campaign.id]: e.target.value })} />
                          <Button className="w-full md:w-auto" size="sm" onClick={() => handleAdminUpdateStats(campaign.id)} disabled={adminUpdatingId === campaign.id}>{adminUpdatingId === campaign.id ? 'Saving...' : 'Update Stats'}</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="donations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Manual Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ManualPaymentsList />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg space-y-4">
                      <h3 className="font-semibold text-text-primary">Hero Carousel</h3>
                      <p className="text-text-secondary text-sm">Add, reorder, or remove slides</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Image (URL or upload)</Label>
                          <Input value={newSlide.image_url} onChange={(e) => setNewSlide({ ...newSlide, image_url: e.target.value })} placeholder="https://..." />
                          <div className="mt-2 flex items-center gap-2">
                            <input
                              id="slide-image-file"
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setLoadingSlides(true);
                                try {
                                  const filePath = `hero/${Date.now()}_${file.name}`;
                                  const { data, error } = await supabase.storage.from('images').upload(filePath, file, { upsert: true });
                                  if (error) throw error;
                                  const { data: pub } = await supabase.storage.from('images').getPublicUrl(data.path);
                                  setNewSlide((prev) => ({ ...prev, image_url: pub.publicUrl }));
                                  setSlideMessage('Image uploaded');
                                } catch (err: any) {
                                  setSlideMessage(err?.message || 'Upload failed. Ensure an "images" bucket exists and is public.');
                                }
                                setLoadingSlides(false);
                              }}
                            />
                          </div>
                          {newSlide.image_url ? (
                            <div className="mt-2">
                              <img src={newSlide.image_url} alt="preview" className="h-16 w-28 object-cover rounded border" />
                              <div className="text-xs text-text-secondary truncate max-w-sm">{newSlide.image_url}</div>
                            </div>
                          ) : null}
                          <Label>Title</Label>
                          <Input value={newSlide.title} onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })} placeholder="Slide title" />
                          <Label>Description</Label>
                          <Textarea value={newSlide.description} onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })} rows={2} placeholder="Slide description" />
                        </div>
                        <div className="space-y-2">
                          <Label>CTA Text</Label>
                          <Input value={newSlide.cta} onChange={(e) => setNewSlide({ ...newSlide, cta: e.target.value })} />
                          <Label>CTA Link</Label>
                          <Input value={newSlide.cta_link} onChange={(e) => setNewSlide({ ...newSlide, cta_link: e.target.value })} placeholder="/donate or /campaign/..." />
                          <div className="grid grid-cols-2 gap-3 items-end">
                            <div>
                              <Label>Sort Order</Label>
                              <Input type="number" value={newSlide.sort_order} onChange={(e) => setNewSlide({ ...newSlide, sort_order: parseInt(e.target.value || '0', 10) })} />
                            </div>
                            <div className="flex items-center gap-2 mt-6">
                              <input id="is_active" type="checkbox" checked={newSlide.is_active} onChange={(e) => setNewSlide({ ...newSlide, is_active: e.target.checked })} />
                              <Label htmlFor="is_active">Active</Label>
                            </div>
                          </div>
                          <Button
                            onClick={async () => {
                              setSlideMessage(null);
                              if (!newSlide.title) {
                                setSlideMessage('Title is required');
                                return;
                              }
                              if (loadingSlides) {
                                setSlideMessage('Please wait for image upload to finish');
                                return;
                              }
                              if (!newSlide.image_url) {
                                setSlideMessage('Add an image via upload or paste an image URL');
                                return;
                              }
                              setSlideSaving(true);
                              try {
                                const { error } = await supabase.from('hero_slides').insert(newSlide as any);
                                if (error) throw error;
                                const { data, error: loadErr } = await supabase
                                  .from('hero_slides')
                                  .select('id, image_url, title, description, cta, cta_link, sort_order, is_active')
                                  .order('sort_order', { ascending: true });
                                if (loadErr) throw loadErr;
                                setSlides(data || []);
                                setNewSlide({ image_url: '', title: '', description: '', cta: 'Donate Now', cta_link: '/donate', sort_order: (newSlide.sort_order || 0) + 1, is_active: true });
                                setSlideMessage('Slide added');
                              } catch (e: any) {
                                setSlideMessage(e?.message || 'Failed to add slide. Ensure admin role or policies allow insert.');
                              } finally {
                                setSlideSaving(false);
                              }
                            }}
                            disabled={slideSaving || loadingSlides}
                          >
                            {slideSaving ? 'Adding...' : 'Add Slide'}
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        {slideMessage ? (
                          <div className={`text-sm ${slideMessage.includes('Failed') ? 'text-red-600' : 'text-green-700'}`}>{slideMessage}</div>
                        ) : null}
                        {loadingSlides ? (
                          <div className="text-sm text-text-secondary">Loading slides...</div>
                        ) : slides.length === 0 ? (
                          <div className="text-sm text-text-secondary">No slides yet.</div>
                        ) : (
                          <div className="space-y-2">
                            {slides.map((s) => (
                              <div key={s.id} className="p-3 border rounded flex items-center justify-between">
                                <div className="text-sm">
                                  <div className="font-medium">{s.title}</div>
                                  <div className="text-xs text-text-secondary truncate max-w-md">{s.image_url}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs px-2 py-1 border rounded">Order: {s.sort_order}</span>
                                  <span className="text-xs px-2 py-1 border rounded">{s.is_active ? 'Active' : 'Inactive'}</span>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={async () => {
                                      await supabase.from('hero_slides').delete().eq('id', s.id);
                                      setSlides((prev) => prev.filter((x) => x.id !== s.id));
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-text-primary mb-2">Impact Stories</h3>
                      <p className="text-text-secondary text-sm mb-3">Add and manage success stories and testimonials</p>
                      <Button variant="outline">Manage Stories</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-text-primary mb-2">FAQ Section</h3>
                      <p className="text-text-secondary text-sm mb-3">Update frequently asked questions</p>
                      <Button variant="outline">Edit FAQs</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Payment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="upi">UPI</Label>
                      <Input id="upi" value={paymentSettings.upi} onChange={(e) => setPaymentSettings({ ...paymentSettings, upi: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="bank">Bank</Label>
                      <Input id="bank" value={paymentSettings.bank} onChange={(e) => setPaymentSettings({ ...paymentSettings, bank: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="account">Account</Label>
                      <Input id="account" value={paymentSettings.account} onChange={(e) => setPaymentSettings({ ...paymentSettings, account: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="ifsc">IFSC</Label>
                      <Input id="ifsc" value={paymentSettings.ifsc} onChange={(e) => setPaymentSettings({ ...paymentSettings, ifsc: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="qrurl">QR Code Image URL</Label>
                      <Input id="qrurl" value={paymentSettings.qr_url} onChange={(e) => setPaymentSettings({ ...paymentSettings, qr_url: e.target.value })} placeholder="https://..." />
                      <div className="mt-2 flex items-center gap-2">
                        <Label htmlFor="qr-file" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm" asChild>
                            <span>Choose File</span>
                          </Button>
                        </Label>
                        <input
                          id="qr-file"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              setPaymentMessage('Uploading QR code...');
                              const filePath = `payment_qr/${Date.now()}_${file.name}`;
                              const { data, error } = await supabase.storage.from('images').upload(filePath, file, { upsert: true });
                              if (error) {
                                console.error('Upload error:', error);
                                throw error;
                              }
                              const { data: pub } = await supabase.storage.from('images').getPublicUrl(data.path);
                              setPaymentSettings((prev) => ({ ...prev, qr_url: pub.publicUrl }));
                              setPaymentMessage('QR code uploaded! Click "Save Settings" to save.');
                              setTimeout(() => setPaymentMessage(null), 3000);
                            } catch (err: any) {
                              console.error('QR upload failed:', err);
                              setPaymentMessage(`Upload failed: ${err.message || 'Check console for details'}`);
                              setTimeout(() => setPaymentMessage(null), 5000);
                            }
                          }}
                        />
                        {paymentSettings.qr_url ? (
                          <div className="flex items-center gap-2">
                            <img src={paymentSettings.qr_url} alt="QR preview" className="h-16 w-16 object-contain border rounded" />
                            <span className="text-xs text-text-secondary">Preview</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={async () => {
                      try {
                        const payload = { id: 1, ...paymentSettings, updated_at: new Date().toISOString() } as any;
                        const { error } = await supabase
                          .from('payment_settings')
                          .upsert(payload, { onConflict: 'id' });
                        if (error) throw error;
                        setPaymentMessage('Saved');
                        // reload from DB to reflect canonical values
                        const { data } = await supabase
                          .from('payment_settings')
                          .select('upi, bank, account, ifsc, qr_url')
                          .eq('id', 1)
                          .maybeSingle();
                        if (data) {
                          setPaymentSettings({
                            upi: data.upi || '',
                            bank: data.bank || '',
                            account: data.account || '',
                            ifsc: data.ifsc || '',
                            qr_url: data.qr_url || '',
                          });
                        }
                      } catch (e: any) {
                        setPaymentMessage(e?.message || 'Save failed');
                      } finally {
                        setTimeout(() => setPaymentMessage(null), 1500);
                      }
                    }}>Save Settings</Button>
                    {paymentMessage ? <span className="text-xs text-text-secondary">{paymentMessage}</span> : null}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Manual Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingPayments ? (
                    <div className="text-sm text-text-secondary">Loading...</div>
                  ) : pendingPayments.length === 0 ? (
                    <div className="text-sm text-text-secondary">No pending payments.</div>
                  ) : (
                    <div className="space-y-3">
                      {pendingPayments.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-semibold">₹{p.amount.toLocaleString()} • {p.campaign}</div>
                            <div className="text-xs text-text-secondary">{new Date(p.created_at).toLocaleString()}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {p.receipt_url && (
                              <a href={p.receipt_url} target="_blank" rel="noreferrer" className="text-sm underline">View Receipt</a>
                            )}
                            <Button size="sm" variant="outline" onClick={() => handleModerate(p.id, "approved")}>Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleModerate(p.id, "rejected")}>Reject</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fundraisers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Fundraisers</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingFundraisers ? (
                    <div className="text-sm text-text-secondary">Loading...</div>
                  ) : pendingFundraisers.length === 0 ? (
                    <div className="text-sm text-text-secondary">No pending fundraisers.</div>
                  ) : (
                    <div className="space-y-3">
                      {pendingFundraisers.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-xs text-text-secondary">Goal: ₹{(p.goal||0).toLocaleString()} • Raised: ₹{(p.raised||0).toLocaleString()}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleModerateFundraiser(p.id, "approved")}>Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleModerateFundraiser(p.id, "rejected")}>Reject</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ManualPaymentsList = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('manual_payments')
        .select('id, amount, campaign, donor_name, donor_email, donor_mobile, anonymous, status, receipt_url, created_at')
        .order('created_at', { ascending: false });
      setRows(data || []);
      setLoading(false);
    };
    load();
  }, []);
  if (loading) return <div className="text-sm text-text-secondary">Loading...</div>;
  if (rows.length === 0) return <div className="text-sm text-text-secondary">No payments yet.</div>;
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.id} className="p-3 border rounded flex items-center justify-between">
          <div className="text-sm">
            <div className="font-semibold">₹{Number(r.amount).toLocaleString()} • {r.campaign}</div>
            <div className="text-text-secondary">
              {r.anonymous ? 'Anonymous' : (r.donor_name || r.donor_email || r.donor_mobile || 'Donor')}
            </div>
            <div className="text-xs text-text-secondary">{new Date(r.created_at).toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs capitalize px-2 py-1 border rounded">{r.status}</span>
            {r.receipt_url && (
              <a href={r.receipt_url} target="_blank" rel="noreferrer" className="text-sm underline">Receipt</a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
