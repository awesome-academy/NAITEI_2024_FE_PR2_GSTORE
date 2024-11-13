export const getData = async (endpoint: string) => {
  try {
    const response = await fetch(`http://localhost:5000/${endpoint}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error)
    return []
  }
}
