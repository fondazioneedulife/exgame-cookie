import { Button } from "@mui/joy";
import { useNavigate } from "react-router";
import Table from '@mui/joy/Table';
import Stack from '@mui/joy/Stack';

export const AddExam: React.FC = () => {
  const navigate=useNavigate()
  return (
    <div>
    <Button onClick={()=>navigate('/')}>Vai agli esami</Button>
    </div>
  );
};