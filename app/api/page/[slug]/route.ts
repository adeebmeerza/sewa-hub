import dbConnect from "@/lib/mongoDbConnect";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  try {
    await dbConnect();

    const category = await Category.findOne({ slug });
    const product = await Product.findOne({ slug });

    if (category || product) {
      return Response.json(category || product);
    }

    return new Response(null, { status: 404 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
