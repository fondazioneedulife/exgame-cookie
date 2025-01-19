import { Button } from "@mui/joy";
import { useNavigate } from "react-router";

export const AddExam: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/")}>Vai agli esami</Button>
    </div>
  );
};
