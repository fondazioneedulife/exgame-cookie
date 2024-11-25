import { Box, Table } from "@mui/joy";
import { StudentSubscriptionRow } from "./StudentSubscriptionRow";

export const SessionReport: React.FC = () => {
  const student = [
    { first_name: "Marco", last_name: "Bosco", results: "6/10" },
    { first_name: "Anna", last_name: "Bosco", results: "6/10" },
    { first_name: "Yasmine", last_name: "Bosco", results: "6/10" },
  ];
  return (
    <>
      <h1>Storia: sessione del 24/10/2024</h1>
      <h2>Pixel</h2>

      <Box></Box>

      <Table>
        <tr>
          {student.map((value) => (
            <StudentSubscriptionRow
              first_name={value.first_name}
              last_name={value.last_name}
              results={value.results}
            ></StudentSubscriptionRow>
          ))}
        </tr>
      </Table>
    </>
  );
};
