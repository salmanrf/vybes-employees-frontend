import { CreateEmployeeDto, Employee, FindEmployeeDto } from "models/employee.model";
import { create } from "zustand";
import {
  createEmployee,
  deleteEmployee,
  findEmployees,
  findOneEmployee,
  updateEmployee,
} from "../../apis/employees-api";

export interface EmployeeState {
  list_loading: boolean;
  actions_loading: boolean;
  current_employee: Employee;
  data: {
    items: Employee[];
    page: number;
    limit: number;
    sort_field: string;
    sort_order: string;
    total_items: number;
    total_pages: number;
  };
  findEmployees: (params: FindEmployeeDto) => Promise<any>;
  findOneEmployee: (employee_id: string) => Promise<Employee>;
  createEmployee: (params: CreateEmployeeDto) => Promise<Employee>;
  updateEmployee: (employee_id: string, params: CreateEmployeeDto) => Promise<Employee>;
  deleteEmployee: (employee_id: string) => Promise<Employee>;
}

const initialValues: Employee = {
  employee_id: "",
  email: "",
  name: "",
  address: "",
  base_salary: 0,
};

export const useEmployeeStore = create<EmployeeState>((set) => ({
  current_employee: { ...initialValues },
  actions_loading: false,
  list_loading: false,
  data: {
    items: [],
    limit: 10,
    page: 1,
    sort_field: "created_at",
    sort_order: "DESC",
    total_items: 0,
    total_pages: 1,
  },
  findEmployees: async (params: FindEmployeeDto) => {
    try {
      set((state: EmployeeState) => ({ ...state, list_loading: true }));

      const res = await findEmployees(params);

      const {
        data: { data },
      } = res;

      if (data) {
        set((state: EmployeeState) => ({
          ...state,
          data: { ...(data as any) },
        }));
      }

      return data;
    } catch (error) {
      throw error;
    } finally {
      set((state: EmployeeState) => ({ ...state, list_loading: false }));
    }
  },
  findOneEmployee: async (employee_id: string) => {
    try {
      set((state: EmployeeState) => ({ ...state, actions_loading: true }));

      const res = await findOneEmployee(employee_id);

      const {
        data: { data },
      } = res;

      set((state: EmployeeState) => ({ ...state, current_employee: data }));

      return data as any;
    } catch (error) {
      throw error;
    } finally {
      set((state: EmployeeState) => ({ ...state, actions_loading: false }));
    }
  },
  createEmployee: async (params: CreateEmployeeDto) => {
    try {
      set((state: EmployeeState) => ({ ...state, actions_loading: true }));

      const res = await createEmployee(params);

      const {
        data: { data },
      } = res;

      return data as any;
    } catch (error) {
      throw error;
    } finally {
      set((state: EmployeeState) => ({ ...state, actions_loading: false }));
    }
  },
  updateEmployee: async (employee_id: string, params: CreateEmployeeDto) => {
    try {
      set((state: EmployeeState) => ({ ...state, actions_loading: true }));

      const res = await updateEmployee(employee_id, params);

      const {
        data: { data },
      } = res;

      return data as any;
    } catch (error) {
      throw error;
    } finally {
      set((state: EmployeeState) => ({ ...state, actions_loading: false }));
    }
  },
  deleteEmployee: async (employee_id: string) => {
    try {
      set((state: EmployeeState) => ({ ...state, actions_loading: true }));

      const res = await deleteEmployee(employee_id);

      const {
        data: { data },
      } = res;

      return data as any;
    } catch (error) {
      throw error;
    } finally {
      set((state: EmployeeState) => ({ ...state, actions_loading: false }));
    }
  },
}));
