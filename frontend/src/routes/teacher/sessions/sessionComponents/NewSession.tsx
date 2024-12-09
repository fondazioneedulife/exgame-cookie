import { Select, Option } from "@mui/joy";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export const NewSession = () => {
  return (
    <>
      <h1>Nuova sessione di</h1>
      <p>Assegna alla classe:</p>
      <Select placeholder="Choose one…">
        <Option value="dog"></Option>
      </Select>
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
    </>
  );
};
