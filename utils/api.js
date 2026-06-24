const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'API request failed')
  }

  return res.json()
}

export const api = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return fetchAPI(`/api/products${query ? `?${query}` : ''}`)
  },
  getProduct: id => fetchAPI(`/api/products/${id}`),
  createOrder: orderData =>
    fetchAPI('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  getOrder: id => fetchAPI(`/api/orders/${id}`),
}
