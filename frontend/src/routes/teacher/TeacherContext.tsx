import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { Exam } from "../../../../api-types";
import { TTeacherDatasContext } from "../../../types/TTeacherDataContext";
import { config } from "../../config";

export const DataContext = React.createContext<TTeacherDatasContext>(
  {} as TTeacherDatasContext,
);

const useData = (): {
  exams: Exam[];
  reload: () => void;
} => {
  const location = useLocation();
  const [exams, setExams] = useState<Exam[]>([]);

  const getAllExams = async () => {
    const response = await fetch(`${config.API_BASEPATH}/exams`);
    const result = await response.json();
    setExams(result);
  };

  useEffect(() => {
    // reaload all data when location changes
    // TODO check if this is the best way
    getAllExams();
  }, [location.pathname]);

  const reload = () => {
    getAllExams();
  };

  return { exams, reload };
};

export const TeacherContext: React.FC<PropsWithChildren> = ({ children }) => {
  const { exams, reload } = useData();

  const value = useMemo(
    () => ({
      exams,
      reload,
    }),
    [exams],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
