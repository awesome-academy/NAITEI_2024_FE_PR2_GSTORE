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

export const postData = async (endpoint: string, data: unknown) => {
  try {
    const url = `${URL}/${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Failed to post data to ${endpoint}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error)
    return null
  }
}

export const putData = async (endpoint: string, data: unknown) => {
  try {
    const url = `${URL}/${endpoint}`
    const response = await fetch(url, {
      method: 'PUT', // Đặt method là 'PUT' để cập nhật dữ liệu
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // Dữ liệu cần cập nhật
    })

    if (!response.ok) {
      throw new Error(`Failed to update data at ${endpoint}`)
    }

    const result = await response.json() // Đọc kết quả trả về từ server
    return result
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error)
    return null
  }
}
