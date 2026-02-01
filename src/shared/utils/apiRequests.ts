import axios from 'axios';
// Наш бекендер ебень
axios.defaults.baseURL = import.meta.env.VITE_DOTENV_API_URL
const instance = axios.create({
    baseURL: import.meta.env.VITE_DOTNET_API_URL,
    timeout: 1000,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});


export const getVisitsTable = async (groupId: number, disciplineId: number) => {
    try {
        let data:JSON = await instance.get(`/api/class/presenceGrade?groupId=${groupId}&disciplineId=${disciplineId}`);
        console.log(data)
        return data
        } catch (error) {
        console.error(error);
    }
}

export const getGroups = async () => {
    try {
        let result: JSON = await instance.get("/api/group/all")
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getDisciplines = async () => {
    try {
        let result: JSON = await instance.get("/api/discipline")
        return result
    } catch (error) {
        console.log(error)
    }
}

