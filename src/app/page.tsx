import { Button, Stack } from "@mui/material";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl mt-36 text-center font-lora font-bold">Pixora</h1>
      <div>
        <Stack spacing={2} direction="row">
          <Button
            sx={{
              backgroundColor: "#FF5722",
              color: "white",
              "&:hover": {
                backgroundColor: "#E64A19",
              },
            }}
          >
            Click Me
          </Button>
        </Stack>
      </div>
    </div>
  );
}
