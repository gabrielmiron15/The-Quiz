import axios from "axios";

export const getQuestions = async (params: object) => {
    const response = await axios.get('https://opentdb.com/api.php', {
        params
    });
    return response.data;
}