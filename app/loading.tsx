import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Loading() {
  return (
    <Box sx={{ width: 1000 }}>
      <Skeleton />
      <h1>??????</h1>
    </Box>
  );
}
