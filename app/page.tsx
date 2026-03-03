import { supabase } from "@/lib/supabase";

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen p-10 bg-white">
      <h1 className="text-3xl font-semibold mb-8">
        atozbhutan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-60 object-cover rounded"
            />

            <h2 className="mt-4 text-lg font-medium">
              {product.name}
            </h2>

            <p className="text-gray-600">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}