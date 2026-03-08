import axios from 'axios';
import type { DisciplineInterface, GroupInterface, StudentLinkInterface } from '../types/fromRequests';
// Наш бекендер ебень
axios.defaults.baseURL = import.meta.env.VITE_DOTENV_API_URL
const instance = axios.create({
    baseURL: import.meta.env.VITE_DOTNET_API_URL,
    timeout: 1000,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'key': localStorage.getItem("api_key")
    }
});

interface Response<T> {
    data: T;
}
export const getGroups = async () => {
    try {
        const result: Response<GroupInterface[]> = await instance.get("/api/group/all")
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const getDisciplines = async () => {
    try {
        const result: Response<DisciplineInterface[]> = await instance.get("/api/discipline/all")
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const getDisciplinesByGroup = async (groupId: number) => {
    try {
        const result: Response<DisciplineInterface[]> = await instance.get(`/api/discipline?groupid=${groupId}`)
        return result.data
    } catch (error) {
        console.log(error)
    }
}


export const getStudentLink = async (groupId:number, disciplineId: number) => {
    try {
        const result: Response<StudentLinkInterface[]> = await instance.get(`/api/kay/shared?groupid=${groupId}&disciplineid=${disciplineId}`)
        return result.data

    } catch (error){
        console.log(error)
    }
}