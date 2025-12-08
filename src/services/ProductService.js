import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

// size parametresini de ekledik
export const getProducts = async (category, page = 0, size = 12) => {
    try {
        const params = {
            page: page,
            size: size
        };

        if (category && category !== 'All') {
            params.category = category;
        }

        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error when items loading:", error);
        throw error;
    }
};