
export interface Arena {
  id: string;
  name: string;
  address: string;
  main_image_url: string | null;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface ArenaWithDistance extends Arena {
  distance: number;
}
