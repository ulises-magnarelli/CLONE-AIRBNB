import AlojamientoSlider from '@/components/AlojamientoSlider';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <AlojamientoSlider ciudad="Bariloche" />
      <AlojamientoSlider ciudad="Mendoza" />
      <AlojamientoSlider ciudad="Madrid" />
    </div>
  );
}
