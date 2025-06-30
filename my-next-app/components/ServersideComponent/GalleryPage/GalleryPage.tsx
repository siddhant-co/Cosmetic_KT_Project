import Gallery from "@/components/ClientsideComponent/Gallery/Gallery";
import SectionHeader from "@/components/common/SectionHeader";


export const dynamic = 'force-dynamic'; // ensures fresh data, disables caching

const GalleryPage = async () => {
  const res = await fetch('https://ecom-ahj1.onrender.com/gallery', {
    cache: 'no-store',
  });

  const data = await res.json();
  const images = data.result.filter((img: any) => img.is_active);

  return (
    <div className="min-h-screen bg-white">
    <SectionHeader 
  title="Our Gallery" 
  subtitle="A glimpse into beauty, confidence, and satisfaction." 
/>
      <Gallery images={images} />
    </div>
  );
};

export default GalleryPage;
