
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface ArenaImageCarouselProps {
  images: string[];
  arenaName: string;
}

export const ArenaImageCarousel = ({ images, arenaName }: ArenaImageCarouselProps) => {
  return (
    <div className="mb-6">
      <Carousel className="w-full">
        <CarouselContent>
          {images?.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-video w-full">
                <img
                  src={image}
                  alt={`${arenaName} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};
