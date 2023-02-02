import { Box, Button, Modal, styled, Typography } from "@mui/material";
import CustomTable from "components/employees/CustomTable";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { Small } from "components/Typography";
import { Formik } from "formik";
import useTitle from "hooks/useTitle";
import { Employee } from "models/employee.model";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployeeStore } from "stores/employees/employee.store";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  width: "100%",
  [theme.breakpoints.down(500)]: {
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const IDRCurrencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const EmployeeList: FC = () => {
  // change navbar title
  useTitle("Daftar Karyawan");

  const navigate = useNavigate();
  const handleAddEmployee = () => navigate("/employees/new");

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const [searchParams, setSearchParams] = useState({
    email: "",
    name: "",
    base_salary_start: null,
    base_salary_end: null,
  });

  const { findEmployees, items, list_loading } = useEmployeeStore((state) => ({
    list_loading: state.list_loading,
    items: state.items,
    findEmployees: state.findEmployees,
  }));

  useEffect(() => {
    findEmployees({
      ...searchParams,
      base_salary_start: searchParams.base_salary_start || null,
      base_salary_end: searchParams.base_salary_end || null,
    });
  }, [searchParams]);

  const EmployeeListColumnShape = [
    {
      Header: "Email",
      accessor: "email",
      minWidth: 200,
      Cell: ({ value }: any) => (
        <Small
          sx={{
            borderRadius: 10,
            padding: ".2rem 1rem",
            color: "background.paper",
            backgroundColor: "#A798FF",
          }}
        >
          {value}
        </Small>
      ),
    },
    {
      Header: "Nama",
      accessor: "name",
      minWidth: 150,
    },
    {
      Header: "Alamat",
      accessor: "address",
      minWidth: 150,
    },
    {
      Header: "Gaji Pokok",
      accessor: "base_salary",
      minWidth: 200,
      Cell: ({ value }: any) => (
        <Small
          sx={{
            borderRadius: 10,
            padding: ".2rem 1rem",
            color: "background.paper",
            backgroundColor: "#A798FF",
          }}
        >
          {IDRCurrencyFormatter.format(value)}
        </Small>
      ),
    },
    {
      Header: "Aksi",
      accessor: "employee_id",
      minWidth: 200,
      Cell: ({ row, value }: any) => {
        return (
          <FlexBox>
            <Button
              variant="contained"
              onClick={() => navigate(`/employees/${value}/edit`)}
              style={{ marginRight: "0.5em" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() => setEmployeeToDelete({ ...row.values })}
              color={"error"}
              style={{ color: "white" }}
            >
              Delete
            </Button>
          </FlexBox>
        );
      },
    },
  ];

  return (
    <Box pt={2} pb={4}>
      <Modal
        open={Boolean(employeeToDelete)}
        onClose={() => setEmployeeToDelete(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <StyledFlexBox>
        <Formik
          initialValues={{
            ...searchParams,
          }}
          onSubmit={(values) => {
            setSearchParams((prev) => ({ ...prev, ...values }));
          }}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <StyledFlexBox>
              <SearchInput
                name="name"
                placeholder="Nama Karyawan..."
                value={values.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
                style={{ marginBottom: "1em" }}
              />
              <SearchInput
                name="email"
                placeholder="Email Karyawan..."
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                style={{ marginBottom: "1em" }}
              />
              <SearchInput
                name="base_salary_start"
                placeholder="Gaji pokok mulai dari, ex 12000000"
                value={values.base_salary_start ?? ""}
                onChange={(e) => setFieldValue("base_salary_start", e.target.value)}
                style={{ marginBottom: "1em" }}
              />
              <SearchInput
                name="base_salary_end"
                placeholder="Gaji pkok sampai dengan 25000000"
                value={values.base_salary_end ?? ""}
                onChange={(e) => setFieldValue("base_salary_end", e.target.value)}
                style={{ marginBottom: "1em" }}
              />
              <Button
                type="button"
                variant="contained"
                color="info"
                style={{ color: "white" }}
                onClick={handleSubmit as any}
              >
                Cari Karyawan
              </Button>
            </StyledFlexBox>
          )}
        </Formik>
      </StyledFlexBox>
      <StyledFlexBox style={{ width: "100%", justifyContent: "end" }}>
        <Button variant="contained" onClick={handleAddEmployee}>
          Tambahkan Karyawan
        </Button>
      </StyledFlexBox>

      <CustomTable columnShape={EmployeeListColumnShape} data={items} />
    </Box>
  );
};

export default EmployeeList;
