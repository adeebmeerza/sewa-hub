import { IProduct } from "@/models/Product";

type Props = {
  data: IProduct;
};

const ProductDetails = ({ data }: Props) => {
  return <div>ProductDetails: {data.name}</div>;
};

export default ProductDetails;
