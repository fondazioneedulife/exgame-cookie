import { Button } from "@mui/joy"

export const SessionsDone: React.FC<{
    teacherClass: string
    date: string
}> = ({teacherClass, date}) => {
     return (
        <>
      <tr>
        <th>{date}</th>
        <th>{teacherClass}</th>
        <th>
        <Button size="sm">visualizza</Button>
        </th>
      </tr>
    </>
     )
}