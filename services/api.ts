import { Product } from '../types';

const DEFAULT_API_BASE_URL = 'http://localhost:8000/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

type FetchProductsOptions = {
  signal?: AbortSignal;
};

function normaliseProduct(raw: any): Product {
  return {
    id: String(raw?.id ?? ''),
    name: String(raw?.name ?? ''),
    description: String(raw?.description ?? ''),
    price: Number(raw?.price ?? 0),
    imageUrl: typeof raw?.image_url === 'string' ? raw.image_url : null,
    category: String(raw?.category ?? 'Uncategorised'),
    slug: typeof raw?.slug === 'string' ? raw.slug : undefined,
    stock: typeof raw?.stock === 'number' ? raw.stock : undefined,
  };
}

export async function fetchProducts(options: FetchProductsOptions = {}): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'GET',
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products (status: ${response.status})`);
  }

  const payload = await response.json();

  if (!payload || !Array.isArray(payload.products)) {
    return [];
  }

  return payload.products.map(normaliseProduct);
}

export async function fetchProduct(idOrSlug: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${idOrSlug}`);

  if (!response.ok) {
    throw new Error(`Product not found (status: ${response.status})`);
  }

  const payload = await response.json();

  if (!payload?.product) {
    throw new Error('Malformed product response');
  }

  return normaliseProduct(payload.product);
}
