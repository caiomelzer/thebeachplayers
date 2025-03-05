
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface ArenaImageCarouselProps {
  images: string;
  arenaName: string;
}

export const ArenaImageCarousel = ({ images, arenaName }: ArenaImageCarouselProps) => {
  console.log('ArenaImageCarousel render');
  console.log('images:', images);
  return (
    <div className="mb-6">
      <div className="aspect-video w-full">
        <img
          src={images}
          alt={arenaName}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
