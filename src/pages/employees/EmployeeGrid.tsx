import { Box, Button, Grid, styled } from "@mui/material";
import EmployeeCard from "components/employees/EmployeeCard";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import useTitle from "hooks/useTitle";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const EmployeeGrid: FC = () => {
  // change navbar title
  useTitle("Employee Grid");

  const navigate = useNavigate();
  const handleAddEmployee = () => navigate("/dashboard/add-Employee");

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search Employee..." />
        <Button variant="contained" onClick={handleAddEmployee}>
          Add New Employee
        </Button>
      </StyledFlexBox>

      <Grid container spacing={3}>
        {EmployeeList.map((Employee, index) => (
          <Grid item md={4} sm={6} xs={12} key={index}>
            <EmployeeCard Employee={Employee} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const EmployeeList = [
  {
    cover: "/static/cover/cover-1.png",
    avatar: "/static/avatar/001-man.svg",
    name: "Natalie Dormer",
    position: "Marketing Manager",
    post: 121,
    follower: 575,
    following: 632,
  },
  {
    cover: "/static/cover/cover-4.png",
    avatar: "/static/avatar/002-girl.svg",
    name: "Selena Gomez",
    position: "Font End Developer",
    post: 121,
    follower: 575,
    following: 632,
  },
  {
    cover: "/static/cover/cover-3.png",
    avatar: "/static/avatar/005-man-1.svg",
    name: "Mark Dhoner",
    position: "UI Designer",
    post: 121,
    follower: 575,
    following: 632,
  },
  {
    cover: "/static/cover/cover-4.png",
    avatar: "/static/avatar/014-man-3.svg",
    name: "Tom Hardy",
    position: "Marketing Manager",
    post: 121,
    follower: 575,
    following: 632,
  },
  {
    cover: "/static/cover/cover-5.png",
    avatar: "/static/avatar/023-man-6.svg",
    name: "Logan Paul",
    position: "Font End Developer",
    post: 121,
    follower: 575,
    following: 632,
  },
  {
    cover: "/static/cover/cover-6.png",
    avatar: "/static/avatar/027-man-7.svg",
    name: "Tom Holland",
    position: "UI Designer",
    post: 121,
    follower: 575,
    following: 632,
  },
];

export default EmployeeGrid;
