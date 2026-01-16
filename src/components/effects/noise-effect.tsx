export function NoiseEffect() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url(/noise.png)`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
