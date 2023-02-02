export interface Employee {
  employee_id: string;
  email: string;
  name: string;
  address: string;
  base_salary: number;
}

export interface FindEmployeeResponse {
  total_items: number;
  total_pages: number;
  page: number;
  limit: number;
  sort_field: string;
  sort_order: string;
  items: Employee[];
}

export interface CreateEmployeeDto {
  email: string;
  name: string;
  address: string;
  base_salary: number;
}

export interface FindEmployeeDto {
  name?: string;
  email?: string;
  base_salary_start?: number | null;
  base_salary_end?: number | null;
}
