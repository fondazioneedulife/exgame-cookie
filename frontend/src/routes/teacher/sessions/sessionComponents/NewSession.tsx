import {
  Button,
  FormControl,
  FormLabel,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { DataContext } from "../../TeacherContext";

export const NewSession = () => {
  const { id } = useParams();
  const { exams } = useContext(DataContext);
  const exam = exams?.find((exam) => exam._id === id);
  const navigate = useNavigate();

  const studentClasses = ["Pixel", "Cookies", "Suse", "Mouse", "Samba"];

  const options = studentClasses.map((studentClass) => {
    return (
      <Option value={studentClass}>
        <div>{studentClass}</div>
      </Option>
    );
  });

  return (
    <Stack spacing={2}>
      <Typography level="h2">Nuova sessione di {exam?.name}</Typography>
      <FormControl>
        <FormLabel>Assegna alla classe:</FormLabel>
        <Select placeholder="Seleziona la classe">{options}</Select>
      </FormControl>
      <FormControl>
        <FormLabel>Data della sessione:</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Basic date picker" />
          </DemoContainer>
        </LocalizationProvider>{" "}
      </FormControl>
      <FormControl>
        <FormLabel>Ora di inizio:</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker label="Basic time picker" />
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button size="md" variant="soft" onClick={() => navigate(-1)}>
          Annulla
        </Button>
        <Button>Salva</Button>
      </Stack>
    </Stack>
  );
};
