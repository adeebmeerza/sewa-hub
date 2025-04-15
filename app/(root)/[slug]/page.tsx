import { fetchPageData } from "@/lib/fetchPageData";
import { PageType } from "@/enums";
import ProductDetails from "@/components/ProductDetails";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const data = await fetchPageData(slug);

  return (
    <>{data.type === PageType.PRODUCT && <ProductDetails data={data} />}</>
  );
};

export default Page;
