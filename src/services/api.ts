export const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        return response.json();
    } catch (error) {
        return error;
    }
};
