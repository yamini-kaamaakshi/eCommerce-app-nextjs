const SingleProduct = ({ params }: { params: { id: string } }) => {
    const product = { id: params.id, name: "Product A", price: "$20", image: "/product1.jpg", description: "This is a great product." };

    return (
        <div className="container mx-auto py-10">
            <div className="flex gap-6">
                <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-lg"/>
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-700 mt-2">{product.price}</p>
                    <p className="mt-4">{product.description}</p>
                    <button className="bg-blue-500 text-white px-4 py-2 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
