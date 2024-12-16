import { useState, PropsWithChildren } from "react";
import { Exam, Session, Subscription } from "../../../../api-types";
import React from "react";
import { TTeacherDatasContext } from "../../../types/TTeacherDataContext";

export const DataContext = React.createContext<TTeacherDatasContext>(
  {} as TTeacherDatasContext,
);

const useData = (): [Exam[], Session[], Subscription[]] => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const getAllExams = async () => {
    const response = await fetch("${config.API_BASEPATH}/exams");
    const result = await response.json();
    setExams(result);
  };

  const getAllSessions = async () => {
    const response = await fetch("${config.API_BASEPATH}/sessions/:examId");
    const result = await response.json();
    setSessions(result);
  };

  const getAllSubscriptions = async () => {
    const response = await fetch(
      "${config.API_BASEPATH}/subscriptions/:sessionId",
    );
    const result = await response.json();
    setSubscriptions(result);
  };

  return [exams, sessions, subscriptions];
};

export const TeacherContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [exams, sessions, subscriptions] = useData();

  return (
    <DataContext.Provider
      value={{
        exams,
        sessions,
        subscriptions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
