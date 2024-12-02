import { Table } from "@mui/joy";


export const StudentQuestions: React.FC = () => {
    return(
        <>
            
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: "40%" }}>Esami</th>
                        <th style={{ width: "40%" }}>Classi</th>
                        <th style={{ width: "40%" }}>Azioni</th>
                    </tr>
                </thead>
            </Table>
        
        </>
    )
}