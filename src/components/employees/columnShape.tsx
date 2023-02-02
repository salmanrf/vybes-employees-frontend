import { Small } from "components/Typography";

const IDRCurrencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

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
];

export default EmployeeListColumnShape;
