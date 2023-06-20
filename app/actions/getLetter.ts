import axios from "axios";

export const getLetter = async (letterId: string) => {
    try {
        const response = await axios.get(`/api/letters/${letterId}`, {
            params: {
                letterId: letterId 
            },
        });       
        return response.data
    } catch (err) {
        console.error("Error fetching ketter:", err);
    }
}