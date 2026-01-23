import { projectId, publicAnonKey } from '@/utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-554e7d35`;

export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/products`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  const data = await response.json();
  return data.products || [];
}

export async function getProductsByPage(page: string) {
  const response = await fetch(`${BASE_URL}/products/${page}`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products for page: ${page}`);
  }
  
  const data = await response.json();
  return data.products || [];
}

export async function createProduct(product: any, accessToken: string) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to create product');
  }
  
  return response.json();
}

export async function updateProduct(id: string, updates: any, accessToken: string) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to update product');
  }
  
  return response.json();
}

export async function deleteProduct(id: string, accessToken: string) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to delete product');
  }
  
  return response.json();
}
