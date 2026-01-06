import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoriesOfHope from "@/components/StoriesOfHope";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const ImpactPage = () => {
  const thematicImages = [
  "https://framerusercontent.com/images/4ENsLobHt2KhJfTNysuTYVOkQ.png?scale-down-to=512",
  "https://framerusercontent.com/images/KSCIgmdqBlMKR5OaENcE42OtYMk.png",
  "https://framerusercontent.com/images/sGXeLud1w1uC490VFSlHl8Qz1LM.jpg?scale-down-to=1024",
  ];
  
  
  return (
  // hide horizontal overflow site-wide for this page to prevent the bottom scrollbar
  <div className="min-h-screen bg-background relative overflow-x-hidden">
  <Header />

      {/* Edge shadows fixed to viewport edges so they always touch the extreme edges.
          If your page background isn't white, replace rgba(255,255,255,1) with the page bg color or hex. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 w-12 md:w-16 z-40"
        style={{
          background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 right-0 w-12 md:w-16 z-40"
        style={{
          background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />

      <main className="py-10 md:py-14">
        <div className="container mx-auto px-4 space-y-16">
          {/* full-bleed wrapper: negative margins to span outside container, but overflow hidden
              so nothing creates a horizontal scrollbar */}
          <div className="relative -mx-4 md:-mx-6 overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              loop={true}
              slidesPerView="auto"
              speed={8000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              allowTouchMove={false}
              className="relative"
            >
              {[
                [
                  "https://framerusercontent.com/images/G31FsYSGuQ2VsYC2cF0VGmJk7M.jpg",
                  "https://framerusercontent.com/images/sGXeLud1w1uC490VFSlHl8Qz1LM.jpg?scale-down-to=1024",
                ],
                ["https://framerusercontent.com/images/oDABdNvVd3Mjab9Enk3ykE20mQA.jpg?scale-down-to=1024"],
                ["https://framerusercontent.com/images/4KvqOEWONDz5XWNaSbiXMVwCx5c.png", "https://framerusercontent.com/images/a4NTAiQGTMOmE6FVWczcsZ42X8.jpg?scale-down-to=512"],
                ["https://framerusercontent.com/images/Vr8hB39wnkGdkhTInLWIh6Bfo2c.png"],
                [
                  "https://framerusercontent.com/images/hThQ1J62UC45NtHnriEkEtS5WWY.png",
                  "https://framerusercontent.com/images/g36y0T5dT9MczuqSDzgtQOhcPI.jpg?scale-down-to=1024",
                ],
                ["https://framerusercontent.com/images/kpexJ9AxRha2iS9S1aqFucVtzbE.png?scale-down-to=1024"],
                ["https://framerusercontent.com/images/4Ta3EVxFcEHFYSc6O17z4MHMO8k.png?scale-down-to=1024", "https://framerusercontent.com/images/TKxKFsCUaPrf6ElDHTQytywvFE.png?scale-down-to=512"],
                ["https://framerusercontent.com/images/x3HntuvqW9m5Ljp1bfg5lHctU.jpg?scale-down-to=512"],
              ].map((group, i) => (
                <SwiperSlide key={i} className="!w-auto">
                  <div className="flex gap-5 items-start">
                    {group.length === 2 ? (
                      // stacked images — use transform for vertical offset (doesn't affect layout height)
                      <div className="flex flex-col">
                        <img
                          src={group[0]}
                          alt=""
                          className="block w-44 h-56 md:w-52 md:h-64 object-cover rounded-lg"
                        />
                        <img
                          src={group[1]}
                          alt=""
                          className="block w-44 h-56 md:w-52 md:h-64 object-cover rounded-lg transform translate-y-6"
                        />
                      </div>
                    ) : (
                      // single image — transform translate instead of relative top
                      <img
                        src={group[0]}
                        alt=""
                        className={`block w-52 h-72 md:w-60 md:h-80 object-cover rounded-lg transform ${
                          group[0].includes("600x900") ? "translate-y-24" : "translate-y-6"
                        }`}
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ...rest of page unchanged... */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Our impact spanned India</h2>
              <p className="text-text-secondary">21 states & 2 union territories</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <img src="https://framerusercontent.com/images/eG71tT9ruUcw3tYxTOtO2QDmYBc.svg" alt="India map" className="w-full max-w-md" />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-text-primary mb-2">With the greatest impact in these states</h3>
                    <ul className="text-sm text-text-secondary list-disc pl-5 space-y-1">
                      <li>Delhi — Education, healthcare & inclusion</li>
                      <li>Punjab — Children, environment & livelihoods</li>
                      <li>Maharashtra — Women empowerment & disaster relief</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-text-primary mb-2">Lives impacted</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-white border">
                        <div className="text-2xl font-bold text-text-primary">54.9%</div>
                        <div className="text-text-secondary">Children</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white border">
                        <div className="text-2xl font-bold text-text-primary">21.4%</div>
                        <div className="text-text-secondary">Health</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="space-y-6">
<h3 className="text-center text-xl md:text-2xl font-bold text-text-primary">Among them, we championed these</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{[
{ title: "Children", img: thematicImages[0] },
{ title: "Social Protection", img: thematicImages[1] },
{ title: "Animals", img: thematicImages[2] },
].map((block, i) => (
<Card key={i}>
<CardContent className="p-6 space-y-2">
<img src={block.img} alt={block.title} className="w-full aspect-video object-cover rounded-lg" />
<h4 className="font-semibold text-text-primary">{block.title}</h4>
<ul className="text-sm text-text-secondary list-decimal pl-5 space-y-1">
<li>Key metric or outcome goes here</li>
<li>Another highlight of impact</li>
<li>Beneficiaries who received support</li>
</ul>
</CardContent>
</Card>
))}
</div>
</section>


<section>
<h3 className="text-center text-xl md:text-2xl font-bold text-text-primary mb-6">Stories of Change</h3>
<StoriesOfHope />
</section>


<section className="space-y-6">
<h3 className="text-center text-xl md:text-2xl font-bold text-text-primary">Goals for next year</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{[
"Care better for every child",
"Partner with more NGOs",
"Bring tech-driven transparency",
].map((t, i) => (
<Card key={i}>
<CardContent className="p-6">
<h4 className="font-semibold text-text-primary">{t}</h4>
<p className="text-sm text-text-secondary">We are scaling our reach by expanding partnerships and improving last-mile delivery.</p>
</CardContent>
</Card>
))}
</div>
</section>
</div>
</main>
<Footer />
</div>
);
};


export default ImpactPage;