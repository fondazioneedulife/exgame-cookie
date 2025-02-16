import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/joy";
import { useState } from "react";
import { Answer } from "../../../../../api-types/socketIo-types";
import { useSocketIoContext } from "../SocketContext";

export const Questions: React.FC = () => {
  const { socketIo } = useSocketIoContext();
  const [state, setState] = useState({
    domanda1: "",
    domanda2: "",
    domanda3: "",
    domanda4: "",
  });

  const handleResponse =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [key]: e.target.value });
      socketIo.current?.emit("response", {
        questionId: key,
        answer: e.target.value,
      } as Answer);
    };

  return (
    <Box>
      <Divider sx={{ mt: 2, mb: 2 }} />

      <FormControl>
        <FormLabel>
          Domanda 1. Di che colore era il cavallo bianco di Napoleone?
        </FormLabel>
        <RadioGroup
          value={state.domanda1}
          onChange={handleResponse("domanda1")}
        >
          <Radio value="bianco" label="bianco" />
          <Radio value="nero" label="nero" />
          <Radio value="a macchie" label="a macchie" />
          <Radio value="marrone" label="marrone" />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <FormControl>
        <FormLabel>Domanda 2. Quanti erano i sette nani?</FormLabel>
        <RadioGroup
          value={state.domanda2}
          onChange={handleResponse("domanda2")}
        >
          <Radio value="3" label="3" />
          <Radio value="7" label="7" />
          <Radio value="a macchie" label="a macchie" />
          <Radio value="8" label="8" />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <FormControl>
        <FormLabel>
          Domanda 3. Qual è la differenza tra una tigre e un leopardo?
        </FormLabel>
        <RadioGroup
          value={state.domanda3}
          onChange={handleResponse("domanda3")}
        >
          <Radio
            value="La tigre ha le strisce, il leopardo ha i pois"
            label="La tigre ha le strisce, il leopardo ha i pois"
          />
          <Radio
            value="La tigre è più grande, il leopardo è più piccolo"
            label="La tigre è più grande, il leopardo è più piccolo"
          />
          <Radio
            value="La tigre vive in Asia, il leopardo vive in Africa"
            label="La tigre vive in Asia, il leopardo vive in Africa"
          />
          <Radio value="Tutte le precedenti" label="Tutte le precedenti" />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <FormControl>
        <FormLabel>
          Domanda 4. Qual è l'animale più potente del mondo?
        </FormLabel>
        <RadioGroup
          value={state.domanda4}
          onChange={handleResponse("domanda4")}
        >
          <Radio value="L'elefante" label="L'elefante" />
          <Radio value="Il leone" label="Il leone" />
          <Radio
            value="Il piccione perché conquista ogni città senza combattere"
            label="Il piccione perché conquista ogni città senza combattere"
          />
          <Radio
            value=" Il bradipo perché nessuno lo vede arrivare"
            label=" Il bradipo perché nessuno lo vede arrivare"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
