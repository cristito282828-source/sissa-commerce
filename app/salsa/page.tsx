import Hero from "../../components/Hero";

export default function Page() {
  return (
    <Hero
      eyebrow="naturismo · cuidado · bienestar"
      title={
        <>
          Cuidar el <span className="font-belleza italic text-emerald-200">cuerpo</span> es un acto de <span className="font-belleza italic text-emerald-200">amor</span>
        </>
      }
      subtitle="Productos y rituales naturales para nutrir la piel, el cuerpo y el bienestar integral."
      primaryCta={{ label: "Quiero saber más", href: "#productos" }}
      secondaryCta={{ label: "Ver catálogo", href: "/tienda" }}
      slides={[
        { src: "/img/calle-salsa-noche.jpg", alt: "La calle de la salsa de noche, Cali" },
        { src: "/img/gracias-cali.jpg", alt: "El grupo en Cali" },
        { src: "/img/grupo-mural-sanantonio.jpg", alt: "El grupo frente al mural de San Antonio" },
      ]}
    />
  );
}
