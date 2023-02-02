import { Employee } from "models/employee.model";

export function getEmployeeFormValues(initialValues: any): Employee {
  const { employee_id, email, name, address, base_salary } = initialValues ?? {};

  const values: Employee = {
    employee_id: employee_id ?? "",
    email: email ?? "",
    name: name ?? "",
    address: address ?? "",
    base_salary: base_salary || 0,
  };

  return values;
}
