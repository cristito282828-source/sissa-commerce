import LevelLadder from "../../components/LevelLadder";

export default function Page() {
  return (
    <LevelLadder
      eyebrow="nuestra red"
      title="Súmate al nivel que te acompañe."
      subtitle="Escoge el ritmo de crecimiento que mejor te encaje, con beneficios claros y una comunidad que te acompaña."
      levels={[
        {
          name: "Cliente",
          requirement: "1 compra",
          benefits: [
            "Acceso a productos premium",
            "Descuentos preferenciales",
            "Atención cercana y personalizada",
          ],
        },
        {
          name: "Revendedora",
          requirement: "Desde 3 pedidos",
          benefits: [
            "Comisiones por recomendación",
            "Kit de bienvenida",
            "Soporte para vender con confianza",
          ],
        },
        {
          name: "Líder",
          requirement: "Equipo activo",
          benefits: [
            "Bonos por crecimiento de red",
            "Mentoría y estrategia",
            "Recompensas por volumen y liderazgo",
          ],
        },
      ]}
      cta={{ label: "Quiero entrar", href: "/tienda" }}
    />
  );
}
