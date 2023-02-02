import { CreateEmployeeDto, Employee, FindEmployeeDto } from "models/employee.model";
import axios from "utils/axios";
import { ApiResponse, API_URL } from "./api";

export const EMPLOYEE_API_URL = `${API_URL}/employees`;

export function findEmployees(params: FindEmployeeDto) {
  return axios.get<ApiResponse<{ items: Employee[] }>>(EMPLOYEE_API_URL, { params });
}

export function findOneEmployee(employee_id: string) {
  return axios.get<ApiResponse<Employee>>(`${EMPLOYEE_API_URL}/${employee_id}`);
}

export function createEmployee(params: CreateEmployeeDto) {
  return axios.post<ApiResponse<Employee>>(EMPLOYEE_API_URL, params);
}

export function updateEmployee(employee_id: string, params: CreateEmployeeDto) {
  return axios.put<ApiResponse<Employee>>(`${EMPLOYEE_API_URL}/${employee_id}`, params);
}

export function deleteEmployee(employee_id: string) {
  return axios.delete<ApiResponse<Employee>>(`${EMPLOYEE_API_URL}/${employee_id}`);
}
