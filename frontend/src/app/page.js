import AlojamientoSlider from '@/components/AlojamientoSlider';

export default function Home() {
  return (
    <div className="max-w-5/6 mx-auto py-4">
      <AlojamientoSlider ciudad="Bariloche" />
      <AlojamientoSlider ciudad="Mendoza" />
      <AlojamientoSlider ciudad="Madrid" />
      <AlojamientoSlider ciudad="Buenos Aires" />

    </div>
  );
}
