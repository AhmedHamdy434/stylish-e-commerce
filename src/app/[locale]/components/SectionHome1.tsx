import HeroCarousel from "@/components/molecules/HeroCarousel";
import Home1 from "@/assets/home1.png";
import Home2 from "@/assets/home2.png";
import Home3 from "@/assets/home3.png";

const SectionHome1 = () => {
  const slides = [
    { src: Home1, alt: "Men’s Collection" },
    { src: Home2, alt: "Women’s Collection" },
    { src: Home3, alt: "Kids’ Collection" },
  ];

  return (
    <section className="container md:px-8! 2xl:px-16! mx-auto">
      <HeroCarousel images={slides} />
    </section>
  );
};

export default SectionHome1;
