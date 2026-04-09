import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const LiquidParticles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        particles: {
          color: { value: "#ffffff" },
          move: {
            enable: true,
            speed: 0.6, // Very slow movement
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          number: {
            value: 40, // Low density for "sleek" look
            density: { enable: true, area: 800 },
          },
          opacity: {
            value: { min: 0.05, max: 0.15 }, // Subtle "frosted" look
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 4 }, // Varying sizes for depth
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default LiquidParticles;