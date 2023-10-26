import { Product } from "@/models/Product";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while fetching products:', error);
    throw error;
  }
}