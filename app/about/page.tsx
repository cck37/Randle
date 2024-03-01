import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Logo from "../components/Logo";

const responsivePaper = {
  textAlign: "center",
  width: { xs: "90%", sm: "calc(50% - 20px)", md: "calc(33% - 20px)" },
};

export default function About() {
  return (
    <div className="page">
      <Grid>
        <Grid item xs={8}>
          <Paper elevation={10} sx={responsivePaper}>
            <Typography variant="h3">This is a thing</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Logo width={100} />
        </Grid>
      </Grid>
    </div>
  );
}
