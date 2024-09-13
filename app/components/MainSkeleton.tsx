import { Skeleton } from "@mui/material";

export function MainSkeleton() {
  return (
    <>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={200}
        height={100}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={300}
        height={50}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={500}
        height={150}
      />
    </>
  );
}
