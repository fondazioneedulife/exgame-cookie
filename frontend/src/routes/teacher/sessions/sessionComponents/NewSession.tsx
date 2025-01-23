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
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DataContext } from "../../TeacherContext";
import { config } from "../../../../config";
import { useFetch } from "../../../../lib/useFetch";
import { Session } from "../../../../../../api-types";
import dayjs from "dayjs";

type FormSession = Omit<Session, "_id" | "created_at" | "updated_at">;

export const NewSession = () => {
  const { id } = useParams();
  const { exams } = useContext(DataContext);
  const exam = exams?.find((exam) => exam._id === id);
  const navigate = useNavigate();
  const [studentClasses, setStudentClasses] = useState<string[]>([]);
  const [formState, setFormState] = useState<FormSession>({
      exam_id: id || "",
      student_class: "",
      start_date: "",
      start_time: "",
  });
  const fetch = useFetch();
  useEffect(() => {
 //  fetch('/url')
//      .then((response) => response.json())
//      .then((result) => setStudentClasses(result));
    // const response = await fetch('/url');
    // const result = await response.json();
    // setStudentClasses(result);
    Promise.resolve(["Pixel", "Cookies", "Suse", "Mouse", "Samba"]).then((response) => {
      setStudentClasses(response);
    })
  }, []);
  //const studentClasses = ["Pixel", "Cookies", "Suse", "Mouse", "Samba"];

  const save=()=>{
    fetch(`${config.API_BASEPATH}/sessions`, {
      method: "POST",
      body: JSON.stringify(formState),
     // }).then(() => navigate("/teacher/exams/"+id+"/sessions"));
    }).then(() => navigate(`/teacher/exam/${id}/sessions`));  }

  const options = studentClasses.map((studentClass) => {
    return (
      <Option value={studentClass}>
        {studentClass}
      </Option>
    );
  });

  console.log(formState);
  
  return (
    <Stack spacing={2}>
      <Typography level="h2">Nuova sessione di {exam?.name}</Typography>
      <FormControl>
        <FormLabel>Assegna alla classe:</FormLabel>
        <Select placeholder="Seleziona la classe" value={formState.student_class} onChange={(_e, new_value) => {
          //setFormState((formState) => ({ ...formState, student_class: e.target.value || ""}))
          setFormState({
            ...formState,
            student_class: new_value || "",
          });

        }}>{options}</Select>
      </FormControl>
      <FormControl>
        <FormLabel>Data della sessione:</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Basic date picker" value= {dayjs(formState.start_date)} onChange={(value) => {
              setFormState((formState) => ({ ...formState, start_date: value?.toString() || "" }));
            }} />
        </LocalizationProvider>{" "}
      </FormControl>
      <FormControl>
        <FormLabel>Ora di inizio:</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="Basic time picker" value={dayjs(formState.start_time)} onChange={(value) => {
              setFormState((formState) => ({ ...formState, start_time: value?.toString() || "" }));
            }}/>
        </LocalizationProvider>
      </FormControl>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button size="md" variant="soft" onClick={() => navigate(-1)}>
          Annulla
        </Button>
        <Button onClick={save}>Salva</Button>
      </Stack>
    </Stack>
  );
};
