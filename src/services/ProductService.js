import axios from 'axios';

const API_URL = 'https://lootdrop-backend.onrender.com/api/products';

// size parametresini de ekledik
export const getProducts = async (categories, page = 0, size = 12) => {
    try {
        const params = {
            page: page,
            size: size
        };

        // Eğer kategoriler dizisi doluysa, virgülle birleştirip gönderiyoruz
        // Örn: categories=Figures,Lighting
        if (categories && categories.length > 0) {
            params.categories = categories.join(',');
        }

        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Ürünler yüklenirken hata oluştu:", error);
        throw error;
    }
};