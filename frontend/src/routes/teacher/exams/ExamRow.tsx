import { EditButton } from "./examsButtons/EditButton";
import { SessionsButton } from "./examsButtons/SessionsButton";
import classes from "./exam.module.css";

export const ExamRow: React.FC<{
  title: string;
  teacherClasses: string | undefined;
}> = ({ title, teacherClasses }) => {
  return (
    <>
      <tr>
        <th>{title}</th>
        <th>{teacherClasses}</th>
        <th>
          <div className={classes.buttonsGap}>
            <EditButton />
            <SessionsButton />
          </div>
        </th>
      </tr>
    </>
  );
};
