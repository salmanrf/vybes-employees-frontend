import { alpha, Box, Button, Card, Grid, styled } from "@mui/material";
import LightTextField from "components/LightTextField";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import { Employee } from "models/employee.model";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployeeStore } from "stores/employees/employee.store";
import * as Yup from "yup";
import { getEmployeeFormValues } from "./UIHelpers";

// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[200]
      : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[400]
      : alpha(theme.palette.background.paper, 0.9),
}));

const SwitchWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 10,
}));

const AddNewEmployee: FC = () => {
  const { employee_id } = useParams();
  const navigate = useNavigate();

  useTitle(employee_id ? "Edit Karyawan" : "Tambahkan Karyawan");

  const { findOneEmployee, createEmployee, updateEmployee, current_employee, actions_loading } =
    useEmployeeStore();

  const validationSchema = Yup.object().shape({
    email: Yup.string().min(5).email().required("Email wajib diisi!"),
    name: Yup.string().min(3).required("Name wajib diisi!"),
    address: Yup.string().min(4).required("Address wajib diisi!"),
    base_salary: Yup.number().moreThan(0).required("Base Salary wajib diisi!"),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: getEmployeeFormValues(current_employee),
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values: Employee) => {
      try {
        const { employee_id: _, ...params } = values;

        params.base_salary = +params.base_salary;

        if (employee_id) {
          const _ = await updateEmployee(employee_id, params);

          return navigate(0);
        }

        const newEmployee = await createEmployee(params);

        navigate(`/employees`);
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  useEffect(() => {
    if (employee_id) {
      findOneEmployee(employee_id);
    }
  }, [employee_id]);

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="email"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="base_salary"
                      placeholder="Base Salary"
                      type={"number"}
                      value={values.base_salary}
                      onChange={handleChange}
                      error={Boolean(touched.base_salary && errors.base_salary)}
                      helperText={touched.base_salary && errors.base_salary}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      multiline
                      fullWidth
                      name="address"
                      placeholder="Address"
                      value={values.address}
                      onChange={handleChange}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" style={{ marginRight: "0.5em" }}>
                      {employee_id ? "Save" : "Create Employee"}
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      color="secondary"
                      onClick={() => navigate(-1)}
                    >
                      Kembali
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AddNewEmployee;
