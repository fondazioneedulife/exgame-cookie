import { Select, Option, Button } from "@mui/joy";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export const NewSession = () => {
  const studentClasses = ["Pixel", "Cookies", "Suse", "Mouse", "Samba"];

  const options = studentClasses.map((studentClass) => {
    return (
      <Option value={studentClass}>
        <div>{studentClass}</div>
      </Option>
    );
  });

  return (
    <>
      <h1>Nuova sessione di</h1>
      <p>Assegna alla classe:</p>
      <Select placeholder="Seleziona la classe">{options}</Select>
      <p>Data della sessione:</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker label="Basic date picker" />
        </DemoContainer>
      </LocalizationProvider>{" "}
      <p>Ora di inizio:</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker label="Basic time picker" />
        </DemoContainer>
      </LocalizationProvider>
      <Button style={{ marginTop: "10rem", marginLeft: "66rem" }}>
        Assegna
      </Button>
    </>
  );
};
