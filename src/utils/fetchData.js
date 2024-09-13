export const fetchData = async (apiUrl, fallbackPath) => {
    try {
      const response = await fetch(apiUrl, { mode: 'cors' }); // Fetch from API with CORS mode
      if (!response.ok) throw new Error('Failed to fetch from API');
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn(`Fetching from API failed: ${error.message}, falling back to local JSON file`);
      const fallbackData = await import(`../backend/${fallbackPath}`);
      return fallbackData.default;
    }
  };