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

export const getProductById = async (id) => {
    try{
        // backenddeki @GetMapping("/{id}") pointe request at.
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ürün detayı çekilirken hata oluştu:", error);
        throw error;
    }
};

/**
 * 3. YENİ: Hızlı Arama (Autocomplete/Suggestions) Protokolü
 * Bu fonksiyon sadece Header'daki dropdown için hafif bir sorgu atar.
 */
export const searchProductsQuickly = async (searchTerm = "") => {
    try {
        // Mülakat Notu: Gereksiz network trafiğini önlemek için kısa aramaları engelliyoruz.
        if (!searchTerm || searchTerm.trim().length < 2) return []; 
        
        const response = await axios.get(`${API_URL}/search`, { 
            params: {
                name: searchTerm, // Backend'de @RequestParam String name bekleyen bir metod olmalı
                size: 5           // Sadece en alakalı 5 sonucu getir (Performans optimizasyonu)
            }
        });

        // Backend Page objesi dönüyorsa response.data.content, liste dönüyorsa response.data
        return response.data.content || response.data; 
    } catch (error) {
        console.error("Hızlı arama sırasında hata:", error);
        return []; // Hata durumunda uygulamayı bozmamak için boş dizi dönüyoruz
    }
};