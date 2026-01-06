import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthContext";
import { Wallet, Bitcoin } from "lucide-react";
import { Copy } from "lucide-react"; // 👈 add this import at top

// inside PaymentPage component:


const useQuery = () => new URLSearchParams(useLocation().search);

const PaymentPage = () => {
  const query = useQuery();
  const campaign = query.get("campaign") || "no-child-orphaned";
  const amount = parseInt(query.get("amount") || "0");
  const { user } = useContext(AuthContext);

  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [method, setMethod] = useState<"upi" | "crypto">("upi");

  // CoinGecko price state
  const [prices, setPrices] = useState<{ usdt?: number; sol?: number; btc?: number }>({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=tether,solana,bitcoin&vs_currencies=inr"
        );
        const data = await res.json();
        setPrices({
          usdt: data.tether?.inr,
          sol: data.solana?.inr,
          btc: data.bitcoin?.inr,
        });
      } catch (err) {
        console.error("Failed to fetch prices", err);
      }
    };
    fetchPrices();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      let receipt_url: string | null = null;
      if (screenshotFile && user) {
        const path = `${user.id}/${Date.now()}-${screenshotFile.name}`;
        const { error: uploadErr } = await supabase.storage
          .from("receipts")
          .upload(path, screenshotFile, {
            upsert: false,
            contentType: screenshotFile.type,
          });
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from("receipts").getPublicUrl(path);
        receipt_url = urlData.publicUrl;
      }

      const draftRaw = localStorage.getItem("donationDraft");
      let donor_name: string | null = null;
      let donor_email: string | null = null;
      let donor_mobile: string | null = null;
      let anonymous = false;
      if (draftRaw) {
        try {
          const draft = JSON.parse(draftRaw);
          if (draft && draft.campaign === campaign) {
            donor_name = draft.isAnonymous ? null : draft.fullName || null;
            donor_email = draft.isAnonymous ? null : draft.email || null;
            donor_mobile = draft.isAnonymous ? null : draft.mobile || null;
            anonymous = !!draft.isAnonymous;
          }
        } catch {}
      }

      const { error } = await supabase.from("manual_payments").insert({
        user_id: user?.id ?? null,
        campaign,
        amount,
        receipt_url,
        donor_name,
        donor_email,
        donor_mobile,
        anonymous,
        status: "pending",
        method,
      });
      if (error) throw error;
      setMessage("Submitted. Awaiting admin approval.");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err: any) {
      setMessage(err.message || "Failed to submit payment");
    } finally {
      setLoading(false);
    }
  };

  // Load UPI/bank settings from DB
  const [upiId, setUpiId] = useState<string>("");
  const [bankLine, setBankLine] = useState<string>("");
  const [qrUploadedUrl, setQrUploadedUrl] = useState<string>("");
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('payment_settings')
        .select('upi, bank, account, ifsc, qr_url')
        .eq('id', 1)
        .maybeSingle();
      const upi = data?.upi || '';
      const bank = data?.bank || '';
      const account = data?.account || '';
      const ifsc = data?.ifsc || '';
      setUpiId(upi);
      setBankLine(`${bank}${bank && account ? ", " : ""}${account ? `A/C ${account}` : ''}${(bank||account) && ifsc ? ", " : ""}${ifsc ? `IFSC ${ifsc}` : ''}`);
      setQrUploadedUrl(data?.qr_url || '');
    };
    load();
  }, []);

  const fallbackUpi = upiId || 'example@upi';
  const qrFallback = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
    "upi://pay?pa=" + fallbackUpi + "&pn=DonateNow&am=" + amount
  )}`;
  const qrSrc = qrUploadedUrl || qrFallback;
  
  const [copied, setCopied] = useState<string | null>(null);

const handleCopy = (text: string, label: string) => {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  });
};

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col lg:flex-row gap-6">
          {/* Switcher (compact) */}
          <div className="lg:w-40 w-full lg:h-60 flex lg:flex-col gap-3">
            <Button
              variant={method === "upi" ? "default" : "outline"}
              className="flex-1 flex items-center justify-center gap-2 py-3"
              onClick={() => setMethod("upi")}
            >
              <Wallet className="w-5 h-5" /> UPI
            </Button>
            <Button
              variant={method === "crypto" ? "default" : "outline"}
              className="flex-1 flex items-center justify-center gap-2 py-3"
              onClick={() => setMethod("crypto")}
            >
              <Bitcoin className="w-5 h-5" /> Crypto
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Manual Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-sm text-text-secondary">You are donating</div>
                  <div className="text-xl font-semibold">
                    ₹{amount.toLocaleString()} to {campaign}
                  </div>
                </div>

                {/* UPI Section */}
                {method === "upi" && (
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Wallet className="w-5 h-5" /> Pay via UPI
                    </h3>
                <div className="space-y-2 text-sm text-text-secondary">
                  <div className="flex items-center gap-2">
                    <span>UPI: {upiId}</span>
                    <Button variant="outline" size="sm" onClick={() => navigator.clipboard?.writeText(upiId)}>Copy</Button>
                  </div>
                  <div className="flex items-center gap-2">
                  <span className="font-mono break-words whitespace-normal">
  Bank:{" "}
  {bankLine.split(",").map((item, index) => (
    <>
      {item.trim()}
      <br />
    </>
  ))}
</span>

                    <Button variant="outline" size="sm" onClick={() => navigator.clipboard?.writeText(bankLine)}>Copy</Button>
                  </div>
                      <div>Note: Use your email as payment note.</div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="bg-white border rounded p-2 flex items-center justify-center">
                        <img
                          src={qrSrc}
                          alt="UPI QR"
                          className="w-72 h-72 object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = qrFallback;
                          }}
                        />
                      </div>
                      <div className="text-sm text-text-secondary">
                        Scan this QR to pay via UPI. Ensure the amount matches ₹
                        {amount.toLocaleString()}.
                        <div className="mt-4">
                          <Button asChild>
                            <a
                              href={`upi://pay?pa=${upiId}&pn=DonateNow&am=${amount}`}
                            >
                              Pay Now
                            </a>
                          </Button>
                        </div>  
                      </div>
                    </div>
                  </div>
                )}

                {/* Crypto Section */}
{method === "crypto" && (
  <div className="p-4 border rounded-lg space-y-4">
    <h3 className="font-semibold mb-2 flex items-center gap-2">
      <Bitcoin className="w-5 h-5" /> Pay with Crypto
    </h3>
    <div className="space-y-3 text-sm text-text-secondary">

      {/* USDT */}
      <div className="flex items-center gap-2 flex-wrap">
        <img
          src="https://assets.coingecko.com/coins/images/325/large/Tether-logo.png"
          className="w-6 h-6"
        />
        <span className="font-semibold">USDT (TRC20):</span>
        <span className="font-mono break-all max-w-[200px] sm:max-w-[400px]">
          TELME5PCo4eJdXiMDGjhbbfwbMa1Vpg8Zo
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleCopy("TELME5PCo4eJdXiMDGjhbbfwbMa1Vpg8Zo", "usdt")}
          className="ml-2 p-1"
        >
          <Copy className="w-4 h-4" />
        </Button>
        {copied === "usdt" && <span className="text-green-600">Copied!</span>}
        {prices.usdt && (
          <span className="ml-auto">
            ≈ {(amount / prices.usdt).toFixed(2)} USDT
          </span>
        )}
      </div>

      {/* BTC */}
      <div className="flex items-center gap-2 flex-wrap">
        <img
          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
          className="w-6 h-6"
        />
        <span className="font-semibold">BTC (BEP20):</span>
        <span className="font-mono break-all max-w-[200px] sm:max-w-[400px]">
          0x9ba2786c73f3bc9e3e74069dcabdb8c7466355a7
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            handleCopy("0x9ba2786c73f3bc9e3e74069dcabdb8c7466355a7", "btc")
          }
          className="ml-2 p-1"
        >
          <Copy className="w-4 h-4" />
        </Button>
        {copied === "btc" && <span className="text-green-600">Copied!</span>}
        {prices.btc && (
          <span className="ml-auto">
            ≈ {(amount / prices.btc).toFixed(6)} BTC
          </span>
        )}
      </div>
    </div>
  </div>
)}

                {/* Upload + Submit */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="receipt">Upload payment screenshot (optional)</Label>
                    <Input
                      id="receipt"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  {message && (
                    <div
                      className={`text-sm ${
                        message.includes("Submitted")
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                  <Button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit for Verification"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
