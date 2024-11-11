import { EditButton } from "./examsButtons/EditButton"
import { SessionsButton } from "./examsButtons/SessionsButton"
import classes from "./exam.module.css"

export const ExamRow: React.FC <{title: string; studentClass: string | undefined}>= ({title, studentClass}) => {

    return (
        <>
        <tr>
            <th>
                {title}
            </th>
            <th>
                {studentClass}
            </th>
            <th>
                <div className={classes.buttonsGap}>
                <EditButton />
                <SessionsButton />
                </div>
            </th>
        </tr>
        </>
    )

}