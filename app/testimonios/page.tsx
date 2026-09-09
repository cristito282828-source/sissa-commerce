import Testimonials from "../../components/Testimonials";

export default function Page() {
  return (
    <Testimonials
      eyebrow="testimonios reales"
      title="Lo que dicen quienes ya los probaron."
      subtitle="clientas satisfechas · revendedoras que confían en nosotros"
      googleRating={{
        score: 4.9,
        href: "https://maps.google.com/?cid=xxxxxxxxxxxxxxxxxxx",
      }}
      testimonials={[
        {
          name: "Nombre Apellido",
          role: "Cliente desde 2023",
          tag: "Clienta",
          avatar: "/testimonio1.jpg",
          rating: 5,
          quote:
            "Empecé a usar los productos por recomendación de una amiga y la diferencia se nota desde las primeras semanas. Son 100% naturales, se siente en la piel y en el bienestar general. Ya no compro nada más.",
          source: "Reseña publicada en Google",
        },
        {
          name: "Otro Nombre",
          role: "Revendedora oficial · 2 años",
          tag: "Revendedora",
          avatar: "/testimonio2.jpg",
          rating: 5,
          quote:
            "Empecé como clienta y acabé metida de lleno como revendedora. El soporte del equipo es constante, los productos se venden solos porque la gente repite, y el margen me permite tener un ingreso extra serio, no un hobby.",
          source: "Reseña publicada en Google",
        },
        {
          name: "Tercer Nombre",
          role: "Cliente desde 2022",
          tag: "Clienta",
          avatar: "/testimonio3.jpg",
          rating: 5,
          quote:
            "Probé muchas marcas antes de llegar aquí y esta es la única que no me generó ninguna reacción. El servicio de atención cuando tuve dudas fue rápido y cercano.",
          source: "Reseña publicada en Google",
        },
        {
          name: "Cuarto Nombre",
          role: "Revendedor oficial · 8 meses",
          tag: "Revendedor",
          avatar: "/testimonio1.jpg",
          rating: 5,
          quote:
            "Lo que más valoro es la transparencia: sé exactamente qué llevo, cuánto gano y cómo crecer mi cartera de clientas. En 8 meses ya tengo una base fija que repite pedido cada mes.",
          source: "Reseña publicada en Google",
        },
      ]}
      closingNote="Reseñas reales de clientas y revendedoras publicadas en Google. Verlas en Google."
    />
  );
}
