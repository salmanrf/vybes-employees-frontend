import { Box, Card, Grid } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H6, Small } from "components/Typography";
import useAuth from "hooks/useAuth";
import { FC, MouseEvent, useState } from "react";

const Profile: FC = () => {
  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);
  const { user } = useAuth();

  return (
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <Card>
          <Box padding={3}>
            <FlexBox alignItems="center" mt={1.5}>
              <H6 marginLeft={1}>
                <Small>Username: </Small>
              </H6>
              <H6 marginLeft={1}>
                <Small>{user?.username}</Small>
              </H6>
            </FlexBox>
            <FlexBox alignItems="center" mt={1.5}>
              <H6 marginLeft={1}>
                <Small>Name: </Small>
              </H6>
              <H6 marginLeft={1}>
                <Small>{user?.full_name}</Small>
              </H6>
            </FlexBox>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
