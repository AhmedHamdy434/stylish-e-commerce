import { getProductById } from "@/firebase/firestore";
import ProductDetail from "./components/ProductDetail";
import SimilarProducts from "./components/SimilarProducts";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getProductById(id);

  return (
    <div className="container px-3 mx-auto py-8 min-h-screen space-y-25">
      <ProductDetail data={data} />
      <SimilarProducts category={data.category} id={id} />
    </div>
  );
};

export default page;
