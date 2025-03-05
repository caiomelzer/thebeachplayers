
export interface Arena {
  id: string;
  name: string;
  address: string;
  logo: string | null;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface ArenaWithDistance extends Arena {
  distance: number;
}
