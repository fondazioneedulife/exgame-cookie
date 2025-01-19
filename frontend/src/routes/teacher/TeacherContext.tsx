import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { Exam, Session, Subscription } from "../../../../api-types";
import { TTeacherDatasContext } from "../../../types/TTeacherDataContext";
import { config } from "../../config";

export const DataContext = React.createContext<TTeacherDatasContext>(
  {} as TTeacherDatasContext,
);

const useData = (): [Exam[], Session[], Subscription[], () => void] => {
  const location = useLocation();
  const [exams, setExams] = useState<Exam[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const getAllExams = async () => {
    const response = await fetch(`${config.API_BASEPATH}/exams`);
    const result = await response.json();
    setExams(result);
  };

  const getAllSessions = async () => {
    const response = await fetch(`${config.API_BASEPATH}/sessions/:examId`);
    const result = await response.json();
    setSessions(result);
  };

  const getAllSubscriptions = async () => {
    const response = await fetch(
      `${config.API_BASEPATH}/subscriptions/:sessionId`,
    );
    const result = await response.json();
    setSubscriptions(result);
  };

  useEffect(() => {
    // reaload all data when location changes
    // TODO check if this is the best way
    getAllExams();
    getAllSessions();
    getAllSubscriptions();
  }, [location.pathname]);

  const reload = () => {
    getAllExams();
    getAllSessions();
    getAllSubscriptions();
  };

  return [exams, sessions, subscriptions, reload];
};

export const TeacherContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [exams, sessions, subscriptions, reload] = useData();

  const value = useMemo(
    () => ({
      exams,
      sessions,
      subscriptions,
      reload,
    }),
    [exams, sessions, subscriptions],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
