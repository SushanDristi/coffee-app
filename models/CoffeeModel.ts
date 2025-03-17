export interface CoffeeItem {
  _id: string;
  id: number;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: string;
  flavor_profile: string;
  grind_option: string;
  roast_level: string;
  image_url: string;
}

export interface FetchResponse {
  success: boolean;
  data?: CoffeeItem[];
  error?: string;
}

export async function fetchCoffees(): Promise<FetchResponse> {
  try {
    const response = await fetch(
      "https://fake-coffee-brand-api.vercel.app/api?limit=10"
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data: CoffeeItem[] = await response.json();

    return { success: true, data };
  } catch (error: any) {
    console.error("Error fetching coffee items:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
}
