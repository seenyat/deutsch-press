import { createSignal, onCleanup } from "solid-js";

const slides = [
  {
    title: "Steigende Pegel in Brandenburg",
    content:
      "Die Wasserstände steigen rapide an. 25 Biber wurden zum Schutz der Hochwasserschutzanlagen erschossen.",
    bgImage:
      "https://wvr.fra1.cdn.digitaloceanspaces.com/img-8DLOCY4WlS05sbEPmlA43.jpg",
    centerImage:
      "https://images.bild.de/66f2e47016186823b4bd1b61/e4f94a6f4272d164c1277146603b2b48,7d4b694c?w=992",
  },
  {
    title: "Bibergefahr für Deiche",
    content:
      "Biber können tiefe Löcher in Deiche graben. Dies gefährdet die Stabilität der Hochwasserschutzstrukturen.",
    bgImage:
      "https://wvr.fra1.cdn.digitaloceanspaces.com/img-8DLOCY4WlS05sbEPmlA43.jpg",
    centerImage: "/api/placeholder/800/600",
  },
  {
    title: "Notfallmaßnahmen",
    content:
      "Alarmstufe 3 von 4 wurde ausgerufen. Tausende Sandsäcke wurden vorsorglich vorbereitet.",
    bgImage:
      "https://wvr.fra1.cdn.digitaloceanspaces.com/img-8DLOCY4WlS05sbEPmlA43.jpg",
  },
  {
    title: "Höchste Alarmstufe",
    content:
      "Der Landkreis Oder-Spree hat die höchste Alarmstufe ausgerufen. Die Situation wird weiterhin genau beobachtet.",
    bgImage:
      "https://wvr.fra1.cdn.digitaloceanspaces.com/img-8DLOCY4WlS05sbEPmlA43.jpg",
  },
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = createSignal(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "ArrowRight") {
      nextSlide();
    } else if (event.code === "ArrowLeft") {
      prevSlide();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  const calculateOpacity = () => {
    const progress = (currentSlide() + 1) / slides.length;
    return 0.5 + progress * 0.5; // Opacity scales from 0.5 to 1
  };

  return (
    <div class="h-full font-['Century751_BT'] w-full bg-red-200">
      <div
        class="flex flex-col  items-center justify-start pt-24  h-screen w-full bg-cover bg-center p-8 text-center relative"
        style={{
          "background-image": `url(${slides[currentSlide()].bgImage})`,
        }}
      >
        <div
          class="absolute inset-0 bg-slate-600 mix-blend-multiply"
          style={{ opacity: calculateOpacity() }}
        ></div>
        {slides[currentSlide()].centerImage ? (
          <div class="relative z-10 w-full max-w-2xl">
            <div class="text-5xl font-bold mb-8 text-white">
              {slides[currentSlide()].title}
            </div>
            <img
              src={slides[currentSlide()].centerImage}
              alt="Center Image"
              class="max-w-full bg-red-500 h-[35vh] w-3/4 max-h-[60vh] mx-auto mb-8"
            />
            <p class="text-3xl text-white">{slides[currentSlide()].content}</p>
          </div>
        ) : (
          <div class="relative z-10 w-full max-w-4xl mb-8">
            <h2 class="text-5xl font-bold mb-8 text-white">
              {slides[currentSlide()].title}
            </h2>
            <p class="text-3xl mt-16 text-white">
              {slides[currentSlide()].content}
            </p>
          </div>
        )}
        <div class="text-sm font-mono text-white absolute bottom-4 z-10">
          <div class="text-3xl tracking-wide mb-6 font-bold text-white">
            https://kik.cat/<span class="text-yellow-500">biber</span>
          </div>
          <div class="opacity-50 ">
            Folie {currentSlide() + 1} von {slides.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
