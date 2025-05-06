import IProduct from "@/interfaces/IProduct";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getProductsDB(): Promise<IProduct[]> {

    try {
        const response = await fetch(`${APIURL}/products`,{
            next: {revalidate: 1200}
        })
        const products: IProduct[] = await response.json();
        return products;

    } catch (error:any) {
        throw new Error(error)
    }
}

export async function getProductsDyId(id: string): Promise<IProduct> {

    try {
        const products: IProduct[] = await getProductsDB()
        const filtroProducs = products.find((product) => product.id.toString() === id)
         if(!filtroProducs) throw new Error("Producto no encontrado")
            return filtroProducs
    } catch (error:any) {
        throw new Error(error)
    }
}
export async function getProductsByCategory(categoryId: string): Promise<IProduct[]> {
    try {
      const products: IProduct[] = await getProductsDB();
      const filteredProducts = products.filter((product) => product.categoryId.toString() === categoryId);

      return filteredProducts;
    } catch (error: any) {
      throw new Error(error.message || "Error fetching products by category");
    }
  }

  


