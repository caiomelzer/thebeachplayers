
import { Phone, Globe, Instagram } from "lucide-react";

interface ArenaContactInfoProps {
  phone: string;
  instagram?: string;
  website?: string;
}

export const ArenaContactInfo = ({ phone, instagram, website }: ArenaContactInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <a href={`tel:${phone}`} className="flex items-center justify-center bg-zinc-900 rounded-lg p-4 text-center">
          <Phone size={20} className="mr-2" />
          <span>Ligar</span>
        </a>
        {instagram && (
          <a
            href={`https://instagram.com/${instagram?.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-zinc-900 rounded-lg p-4 text-center"
          >
            <Instagram size={20} className="mr-2" />
            <span>Instagram</span>
          </a>
        )}
      </div>

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-zinc-900 rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center">
            <Globe size={20} className="mr-2" />
            <span>Visitar site</span>
          </div>
        </a>
      )}
    </div>
  );
};
