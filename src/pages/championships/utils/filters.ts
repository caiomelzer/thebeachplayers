
import { addDays, isBefore, isAfter, parseISO } from "date-fns";

interface Championship {
  id: string;
  title: string;
  date: string;
  category: string;
  status?: string;
  price?: string;
  logo: string;
  isDisabled?: boolean;
  isRegistered?: boolean;
}

export const filterUpcomingChampionships = (championships: Championship[]) => {
  if (!championships || championships.length === 0) return [];
  
  const today = new Date();
  const fifteenDaysFromNow = addDays(today, 15);
  
  return championships.filter(championship => {
    const championshipDate = parseISO(championship.date);
    return isAfter(championshipDate, today) && isBefore(championshipDate, fifteenDaysFromNow);
  });
};

export const filterRegisteredChampionships = (championships: Championship[]) => {
  if (!championships || championships.length === 0) return [];
  
  return championships.filter(championship => championship.isRegistered);
};

export const applyChampionshipFilters = (
  championships: Championship[], 
  activeFilter: 'all' | 'soon' | 'registered',
  searchTerm: string
) => {
  if (!championships || championships.length === 0) return [];
  
  let filtered = [...championships];
  
  // Apply search filter
  if (searchTerm) {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(championship =>
      championship.title.toLowerCase().includes(lowercaseSearchTerm)
    );
  }

  // Apply active filter
  switch (activeFilter) {
    case 'soon':
      filtered = filterUpcomingChampionships(filtered);
      break;
    case 'registered':
      filtered = filterRegisteredChampionships(filtered);
      break;
    default:
      // 'all' case - no additional filtering needed
      break;
  }

  return filtered;
};
