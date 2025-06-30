'use client';

type GalleryImage = {
  id: number;
  image: string;
  sequence_number: string;
};

const Gallery = ({ images }: { images: GalleryImage[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 h-[500px]">
      {images.map((img, index) => {
        // Apply special spans to selected items for visual variety
        const isLarge = index === 0 || index === 3;

        return (
          <div
            key={img.id}
            className={`overflow-hidden rounded-lg relative ${
              isLarge ? 'md:col-span-2 md:row-span-2' : ''
            }`}
          >
            <img
              src={img.image}
              alt={`Gallery ${img.id}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
