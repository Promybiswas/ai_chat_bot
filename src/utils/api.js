const handle = async (res) => {
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('carechat_token')}`
})

export const api = {
  get:    (path)       => fetch(`/api${path}`, { headers: headers() }).then(handle),
  post:   (path, body) => fetch(`/api${path}`, { method: 'POST',   headers: headers(), body: JSON.stringify(body) }).then(handle),
  put:    (path, body) => fetch(`/api${path}`, { method: 'PUT',    headers: headers(), body: JSON.stringify(body) }).then(handle),
  delete: (path)       => fetch(`/api${path}`, { method: 'DELETE', headers: headers() }).then(handle),
}
