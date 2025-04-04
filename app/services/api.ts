export const backendConfig = {
    BASE_URL: "https://neubaitics-fullstack-ai-backend.vercel.app"
}


const fetchProducts = async() => {
    const endPoint = "/api/products/get-products"
    const res = await fetch(`${backendConfig.BASE_URL}${endPoint}`,{
        method: "GET"
    })
    if(!res.ok){
        throw new Error("Failed to fetch Products");
    }

    const data = await res.json()

    return data.products
    
}

export default fetchProducts