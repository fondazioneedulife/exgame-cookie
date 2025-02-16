import * as React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import { useFetch } from "../../lib/useFetch";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { User } from "../../../../api-types";

export const EditUserProfile: React.FC = () => {
    const [first_name, setName] = useState("");
    const [last_name, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const fetch = useFetch();
    
    // user data
    const [currentUser, setCurrentUser] = useState<User>();
    
    useEffect(() => {
        fetch(`${config.API_BASEPATH}/users/me`)
        .then((res) => res?.json())
        .then((user: User) => {
            setCurrentUser(user);
            setName(user?.first_name);
            setlastName(user?.last_name);
            setEmail(user?.email);
        });
    }, [fetch]);

    

    interface StudentClassProps {
        studentClass?: string;
    }

    const StudentClass: React.FC<StudentClassProps> = ({ studentClass }) => {
        return(
            <>
                <Typography component="h5" sx={{ mb: 2 }}>
                    Classe: {studentClass}
                </Typography>
            </>
        );
    };

    interface TeacherClassProps {
        teacherClasses: string[];
    }

    const TeacherClasses: React.FC<TeacherClassProps> = ({ teacherClasses }) => {
        return(
            <>
                <Typography component="h5" sx={{ mb: 2 }}>
                    Classi: {teacherClasses.join(', ')}
                </Typography>
            </>
        );
    };

    interface TeacherSubjectsProps {
        teacherSubjects: string[];
    }

    const TeacherSubjects: React.FC<TeacherSubjectsProps> = ({ teacherSubjects }) => {
        return(
            <Typography component="h5" sx={{ mb: 2 }}>
                Materie: {teacherSubjects.join(', ')}
            </Typography>
        );
    };

    const handleSave = async () => {
        setIsSaving(true);

        try {
          const response = await fetch(`${config.API_BASEPATH}/users/${currentUser?._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ first_name, last_name, email }),
          });

          if (response.ok) {
            const result = await response.json();
            setIsSaving(false);
            navigate(`/user/${currentUser?._id}/profile/details`);
          } else {
            setError(true);
            setIsSaving(false);
          }
        } catch (error) {
          setError(true);
          setIsSaving(false);
        }
      };

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar src="" sx={{ width: 224, height: 224 }} />

                    <Box sx={{ ml: 6 }}>
                        <Stack sx={{ minWidth: 300 }}>
                            <label>Nome</label>
                            <Input
                                color="neutral"
                                size="sm"
                                value={first_name}
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                            />
                            <label>Cognome</label>
                            <Input
                                color="neutral"
                                size="sm"
                                value={last_name}
                                onChange={(e) => setlastName(e.target.value)}
                                variant="outlined"
                            />
                        </Stack>
                        <br />
                        <label>E-mail</label>
                        <Input
                            color="neutral"
                            size="sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                    <Box sx={{ ml: 2 }}>
                        <Typography component="h5" sx={{ mb: 2, mt: 2 }}>
                        Ruolo: {currentUser?.role}
                        </Typography>
                        { (currentUser?.role !== 'admin' && (
                                currentUser?.role === 'student' ? (
                                    <StudentClass studentClass={currentUser?.student_class}/>
                                ) : (currentUser?.role === 'teacher' && ((currentUser?.teacher_classes ?? []).length > 0)) ? (
                                    <TeacherClasses teacherClasses={currentUser?.teacher_classes || []}/>
                                ) : null
                            )
                        )}
                        {/* TODO: mostrare le materie elenco */}
                        { currentUser?.role === 'teacher' && ((currentUser?.subjects ?? []).length > 0)
                        ? 
                            (<TeacherSubjects teacherSubjects={currentUser?.subjects || []}/>)
                        :
                            '' 
                        }
                    </Box>
                </Box>

                <Stack sx={{ justifyContent: "center", alignItems: "flex-end", mt: 4 }}>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Salvando..." : "Salva"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};
