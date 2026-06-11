export const fetchCats = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/cat");
    if (!response.ok) {
      throw new Error("HTTP error ! status: ${response.status}");
    } else {
      console.log("Cats fetched from backend :>");
    }
    const catData = await response.json();
    return catData;
  } catch (error) {
    console.log("Failed to fetch the data from the backend", error);
    return [];
  }
};
