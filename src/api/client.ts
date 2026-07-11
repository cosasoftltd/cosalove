// src/api/client.ts
const API_URL = 'http://localhost:8000/api';

export async function request<T>(endpoint: string, method: string = 'GET', data?: any): Promise<T> {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Token ${token}` }),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  if (!response.ok) throw new Error('API Request Failed');
  return response.json() as Promise<T>;
}