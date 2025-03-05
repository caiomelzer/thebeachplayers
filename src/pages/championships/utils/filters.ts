
// Function to apply filters to championships list
export const applyChampionshipFilters = (
  championships: any[],
  activeFilter: 'all' | 'soon' | 'registered',
  searchTerm: string
) => {
  if (!championships || championships.length === 0) return [];
  
  // First apply text search if any
  let filtered = [...championships];
  
  if (searchTerm && searchTerm.length > 0) {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(championship => 
      championship.title.toLowerCase().includes(lowercaseSearchTerm)
    );
  }
  
  // Then apply category filter
  switch (activeFilter) {
    case 'soon':
      // Get upcoming championships (next 30 days)
      const now = new Date();
      const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      return filtered.filter(championship => {
        const championshipDate = new Date(championship.occurs || championship.date || "");
        return championshipDate >= now && championshipDate <= thirtyDaysLater;
      });
      
    case 'registered':
      // Get championships where user is registered
      return filtered.filter(championship => championship.isRegistered);
      
    case 'all':
    default:
      return filtered;
  }
};
