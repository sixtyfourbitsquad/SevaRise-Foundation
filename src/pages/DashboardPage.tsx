import { useContext, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthContext";

type Donation = { id: string; amount: number; campaign: string; created_at: string };
type ManualPayment = { id: string; amount: number; campaign: string; status: string; receipt_url: string | null; created_at: string };
type Fundraiser = {
  id: string;
  slug: string | null;
  title: string;
  status: string;
  goal: number | null;
  raised: number | null;
  donations: number | null;
  days_left: number | null;
  created_at: string;
};

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationsLoading, setDonationsLoading] = useState(false);
  const [donationsError, setDonationsError] = useState<string | null>(null);

  const [manualPayments, setManualPayments] = useState<ManualPayment[]>([]);
  const [manualLoading, setManualLoading] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);

  const [myFundraisers, setMyFundraisers] = useState<Fundraiser[]>([]);
  const [fundraisersLoading, setFundraisersLoading] = useState(false);
  const [fundraisersError, setFundraisersError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editGoalById, setEditGoalById] = useState<Record<string, string>>({});
  const [editRaisedById, setEditRaisedById] = useState<Record<string, string>>({});
  const [editDonationsById, setEditDonationsById] = useState<Record<string, string>>({});
  const [editDaysLeftById, setEditDaysLeftById] = useState<Record<string, string>>({});

  const [fundraiserTitle, setFundraiserTitle] = useState("");
  const [fundraiserSubtitle, setFundraiserSubtitle] = useState("");
  const [fundraiserDesc, setFundraiserDesc] = useState("");
  const [fundraiserGoal, setFundraiserGoal] = useState("");
  const [fundraiserImage, setFundraiserImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [organizer, setOrganizer] = useState("");
  const [organizerBio, setOrganizerBio] = useState("");
  const [impact1, setImpact1] = useState("");
  const [impact2, setImpact2] = useState("");
  const [impact3, setImpact3] = useState("");
  const [fundraiserSubmitting, setFundraiserSubmitting] = useState(false);
  const [fundraiserMessage, setFundraiserMessage] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const name = (user.user_metadata?.full_name as string) || "";
      setFullName(name);
    };
    loadProfile();
  }, [user]);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) return;
      setDonationsLoading(true);
      setDonationsError(null);
      try {
        const { data, error } = await supabase
          .from("donations")
          .select("id, amount, campaign, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setDonations((data as Donation[]) || []);
      } catch (err: any) {
        setDonationsError(err.message || "Failed to load donations");
      } finally {
        setDonationsLoading(false);
      }
    };
    fetchDonations();
  }, [user]);

  useEffect(() => {
    const fetchManual = async () => {
      if (!user) return;
      setManualLoading(true);
      setManualError(null);
      try {
        const { data, error } = await supabase
          .from("manual_payments")
          .select("id, amount, campaign, status, receipt_url, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setManualPayments((data as ManualPayment[]) || []);
      } catch (err: any) {
        setManualError(err.message || "Failed to load manual payments");
      } finally {
        setManualLoading(false);
      }
    };
    fetchManual();
  }, [user]);

  useEffect(() => {
    const fetchFundraisers = async () => {
      if (!user) return;
      setFundraisersLoading(true);
      setFundraisersError(null);
      try {
        const { data, error } = await supabase
          .from("fundraisers")
          .select("id, slug, title, status, goal, raised, donations, days_left, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        const list = (data as Fundraiser[]) || [];
        setMyFundraisers(list);
        const g: Record<string, string> = {};
        const r: Record<string, string> = {};
        const dn: Record<string, string> = {};
        const dl: Record<string, string> = {};
        list.forEach((f) => {
          g[f.id] = String(f.goal ?? "");
          r[f.id] = String(f.raised ?? "");
          dn[f.id] = String(f.donations ?? "");
          dl[f.id] = String(f.days_left ?? "");
        });
        setEditGoalById(g);
        setEditRaisedById(r);
        setEditDonationsById(dn);
        setEditDaysLeftById(dl);
      } catch (err: any) {
        setFundraisersError(err.message || "Failed to load fundraisers");
      } finally {
        setFundraisersLoading(false);
      }
    };
    fetchFundraisers();
  }, [user]);

  const handleUpdateFundraiser = async (id: string) => {
    if (!user) return;
    setUpdatingId(id);
    try {
      const goalNum = Number(editGoalById[id] || 0);
      const raisedNum = Number(editRaisedById[id] || 0);
      const { error } = await supabase
        .from("fundraisers")
        .update({ goal: goalNum, raised: raisedNum, donations: Number(editDonationsById[id] || 0), days_left: Number(editDaysLeftById[id] || 0) })
        .eq("id", id)
        .eq("user_id", user.id);
      if (error) throw error;
    } catch (err) {
      // optionally surface error
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateFundraiser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFundraiserSubmitting(true);
    setFundraiserMessage(null);
    try {
      const slug = fundraiserTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const { error } = await supabase.from("fundraisers").insert({
        user_id: user.id,
        slug,
        title: fundraiserTitle,
        subtitle: fundraiserSubtitle,
        description: fundraiserDesc,
        story: fundraiserDesc,
        image: fundraiserImage,
        goal: Number(fundraiserGoal || 0),
        organizer,
        organizer_bio: organizerBio,
        impact: [impact1, impact2, impact3].filter(Boolean),
        updates: [],
        status: "pending",
      });
      if (error) throw error;
      setFundraiserTitle("");
      setFundraiserSubtitle("");
      setFundraiserDesc("");
      setFundraiserGoal("");
      setFundraiserImage("");
      setOrganizer("");
      setOrganizerBio("");
      setImpact1("");
      setImpact2("");
      setImpact3("");
      setFundraiserMessage("Fundraiser created as draft.");
    } catch (err: any) {
      setFundraiserMessage(err.message || "Failed to create fundraiser");
    } finally {
      setFundraiserSubmitting(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProfileSaving(true);
    setProfileMessage(null);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });
      if (error) throw error;
      setProfileMessage("Profile updated.");
    } catch (err: any) {
      setProfileMessage(err.message || "Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="donations">
                <TabsList>
                  <TabsTrigger value="donations">Donations</TabsTrigger>
                  <TabsTrigger value="fundraiser">Create Fundraiser</TabsTrigger>
                  <TabsTrigger value="your-fundraising">Your Fundraising</TabsTrigger>
                </TabsList>

                <TabsContent value="donations" className="mt-6 space-y-8">
                  <div>
                    <h3 className="font-semibold mb-3">Manual Payments (Pending/Approved)</h3>
                    {manualLoading ? (
                      <div className="text-sm text-text-secondary">Loading...</div>
                    ) : manualError ? (
                      <div className="text-sm text-red-600">{manualError}</div>
                    ) : manualPayments.length === 0 ? (
                      <div className="text-sm text-text-secondary">No manual payments yet.</div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Receipt</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {manualPayments.map((p) => (
                            <TableRow key={p.id}>
                              <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                              <TableCell className="truncate max-w-[240px]">{p.campaign}</TableCell>
                              <TableCell className="capitalize">{p.status}</TableCell>
                              <TableCell>
                                {p.receipt_url ? (
                                  <a href={p.receipt_url} target="_blank" rel="noreferrer" className="underline text-sm">View</a>
                                ) : (
                                  <span className="text-text-secondary text-sm">—</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">₹{p.amount.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Approved Donations</h3>
                    {donationsLoading ? (
                      <div className="text-sm text-text-secondary">Loading...</div>
                    ) : donationsError ? (
                      <div className="text-sm text-red-600">{donationsError}</div>
                    ) : donations.length === 0 ? (
                      <div className="text-sm text-text-secondary">No approved donations yet.</div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Campaign</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {donations.map((d) => (
                            <TableRow key={d.id}>
                              <TableCell>{new Date(d.created_at).toLocaleDateString()}</TableCell>
                              <TableCell className="truncate max-w-[240px]">{d.campaign}</TableCell>
                              <TableCell className="text-right">₹{d.amount.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="fundraiser" className="mt-6">
                  <form className="space-y-4" onSubmit={handleCreateFundraiser}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="f-title">Title</Label>
                        <Input id="f-title" value={fundraiserTitle} onChange={(e) => setFundraiserTitle(e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="f-subtitle">Subtitle</Label>
                        <Input id="f-subtitle" value={fundraiserSubtitle} onChange={(e) => setFundraiserSubtitle(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="f-goal">Goal (₹)</Label>
                        <Input id="f-goal" type="number" value={fundraiserGoal} onChange={(e) => setFundraiserGoal(e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="f-image">Image (URL or upload)</Label>
                        <Input id="f-image" value={fundraiserImage} onChange={(e) => setFundraiserImage(e.target.value)} />
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            id="f-image-file"
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploadingImage(true);
                              try {
                                const filePath = `fundraisers/${Date.now()}_${file.name}`;
                                const { data, error } = await supabase.storage.from('images').upload(filePath, file, { upsert: true });
                                if (error) throw error;
                                const { data: pub } = await supabase.storage.from('images').getPublicUrl(data.path);
                                setFundraiserImage(pub.publicUrl);
                              } catch {}
                              setUploadingImage(false);
                            }}
                          />
                            {uploadingImage ? <span className="text-xs text-text-secondary">Uploading...</span> : <span className="text-xs text-text-secondary">Paste a URL or upload a file</span>}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="f-desc">Story / Description</Label>
                      <Input id="f-desc" value={fundraiserDesc} onChange={(e) => setFundraiserDesc(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="f-org">Organizer</Label>
                        <Input id="f-org" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="f-orgbio">Organizer Bio</Label>
                        <Input id="f-orgbio" value={organizerBio} onChange={(e) => setOrganizerBio(e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Impact #1</Label>
                        <Input value={impact1} onChange={(e) => setImpact1(e.target.value)} placeholder="₹300 provides ..." />
                      </div>
                      <div>
                        <Label>Impact #2</Label>
                        <Input value={impact2} onChange={(e) => setImpact2(e.target.value)} placeholder="₹1000 supports ..." />
                      </div>
                      <div>
                        <Label>Impact #3</Label>
                        <Input value={impact3} onChange={(e) => setImpact3(e.target.value)} placeholder="₹3000 helps ..." />
                      </div>
                    </div>
                    {fundraiserMessage && (
                      <div className={`text-sm ${fundraiserMessage.includes("created") ? "text-green-700" : "text-red-600"}`}>{fundraiserMessage}</div>
                    )}
                    <Button type="submit" disabled={fundraiserSubmitting}>{fundraiserSubmitting ? "Submitting..." : "Submit for Approval"}</Button>
                  </form>
                </TabsContent>

                <TabsContent value="your-fundraising" className="mt-6">
                  {fundraisersLoading ? (
                    <div className="text-sm text-text-secondary">Loading...</div>
                  ) : fundraisersError ? (
                    <div className="text-sm text-red-600">{fundraisersError}</div>
                  ) : myFundraisers.length === 0 ? (
                    <div className="text-sm text-text-secondary">You haven't created any fundraisers yet.</div>
                  ) : (
                    <div className="space-y-4">
                      {myFundraisers.map((f) => (
                        <div key={f.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold">{f.title}</div>
                              <div className="text-xs text-text-secondary">Status: {f.status}</div>
                            </div>
                            {f.slug ? (
                              <a className="text-sm underline" href={`/campaign/${f.slug}`}>View</a>
                            ) : null}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-3">
                            <div>
                              <Label>Goal (₹)</Label>
                              <Input value={editGoalById[f.id] ?? ""} onChange={(e) => setEditGoalById({ ...editGoalById, [f.id]: e.target.value })} />
                            </div>
                            <div>
                              <Label>Raised (₹)</Label>
                              <Input value={editRaisedById[f.id] ?? ""} onChange={(e) => setEditRaisedById({ ...editRaisedById, [f.id]: e.target.value })} />
                            </div>
                            <div>
                              <Label>Donations</Label>
                              <Input value={editDonationsById[f.id] ?? ""} onChange={(e) => setEditDonationsById({ ...editDonationsById, [f.id]: e.target.value })} />
                            </div>
                            <div>
                              <Label>Days Left</Label>
                              <Input value={editDaysLeftById[f.id] ?? ""} onChange={(e) => setEditDaysLeftById({ ...editDaysLeftById, [f.id]: e.target.value })} />
                            </div>
                            <div className="flex items-end">
                              <Button onClick={() => handleUpdateFundraiser(f.id)} disabled={updatingId === f.id}>
                                {updatingId === f.id ? "Updating..." : "Update"}
                              </Button>
                            </div>
                            <div className="flex items-end">
                              <Button variant="destructive" onClick={async () => {
                                if (!confirm('Delete this fundraiser?')) return;
                                await supabase.from('fundraisers').delete().eq('id', f.id).eq('user_id', user!.id);
                                setMyFundraisers((prev) => prev.filter(x => x.id !== f.id));
                              }}>Delete</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;


