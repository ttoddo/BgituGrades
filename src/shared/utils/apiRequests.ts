import axios from 'axios';
import type { DisciplineInterface, GroupInterface, TableSample } from '../types/fromRequests';
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

interface Response<T> {
    data: T;
}

export const getVisitsTable = async (groupId: number, disciplineId: number) => {
    try {
        let data: Response<TableSample> = await instance.get(`/api/class/presenceGrade?groupId=${groupId}&disciplineId=${disciplineId}`);
        return data.data
        } catch (error) {
        console.error(error);
    }
}

export const getGroups = async () => {
    try {
        let result: Response<GroupInterface[]> = await instance.get("/api/group/all")
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const getDisciplines = async () => {
    try {
        let result: Response<DisciplineInterface[]> = await instance.get("/api/discipline/all")
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const getDisciplinesByGroup = async (groupId: number) => {
    try {
        let result: Response<DisciplineInterface[]> = await instance.get(`/api/discipline?groupid=${groupId}`)
        return result.data
    } catch (error) {
        console.log(error)
    }
}