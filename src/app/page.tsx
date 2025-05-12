import Image from 'next/image';
import FeaturedPropertiesCarousel from './FeaturedPropertiesCarousel';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black p-8 font-sans">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/images/logo.png"
          alt="Mayano Properties Logo"
          width={220}
          height={220}
          priority
          className="mb-4"
        />
      </div>
      <FeaturedPropertiesCarousel />
    </main>
  );
}
