import { Button } from "@mui/joy";
import { useNavigate } from "react-router";

export const StudentSubscriptionRow: React.FC<{
  first_name: string;
  last_name: string;
  results: string;
}> = ({ first_name, last_name, results }) => {
  const navigate = useNavigate();
  return (
    <>
      <tr>
        <th>
          {first_name} {last_name}
        </th>
        <th>{results}</th>
        <th>
          <Button
            size="sm"
            onClick={() => navigate("/teacher/subscriptions/:date/:id")}
          >
            Risultati
          </Button>
        </th>
      </tr>
    </>
  );
};
