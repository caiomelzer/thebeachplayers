
import { supabase } from "@/integrations/supabase/client";
import { Arena } from "../types";

export const fetchArenas = async () => {
  const { data, error } = await supabase
    .from('arenas')
    .select('*')
    .eq('status', 'active');

  if (error) {
    throw error;
  }

  return data.map(arena => ({
    id: arena.id,
    name: arena.name,
    address: arena.address,
    main_image_url: arena.main_image_url,
    coordinates: {
      latitude: arena.latitude,
      longitude: arena.longitude
    }
  }));
};
