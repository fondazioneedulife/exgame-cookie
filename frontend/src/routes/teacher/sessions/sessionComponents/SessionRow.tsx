import { Button } from "@mui/joy"

export const SessionRow: React.FC<{
    teacherClass: string
    date: string
}> = ({teacherClass, date}) => {
     return (
        <>
      <tr>
        <th>{date}</th>
        <th>{teacherClass}</th>
        <th>
        <Button size="sm">inizia</Button>
        </th>
      </tr>
    </>
     )
}