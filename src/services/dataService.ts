import { ProductQuery } from '../types/productQuery.type'
const URL = 'http://localhost:5000'

export const getData = async (endpoint: string, params: ProductQuery = {}) => {
  try {
    const query = new URLSearchParams(
      Object.entries(params).reduce(
        (acc, [key, value]) => {
          acc[key] = value !== undefined ? String(value) : ''
          return acc
        },
        {} as Record<string, string>
      )
    ).toString()
    const url = query ? `${URL}/${endpoint}?${query}` : `${URL}/${endpoint}`
    console.log(url)
    const response = await fetch(url)
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
