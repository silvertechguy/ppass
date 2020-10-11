import React, { useState } from "react";
import Container from "../../components/Container/Container.style";
import { Section, Headline, Status, CountSection } from "./Home.style";
import Form from "./Form";
import { endpoint } from "../../API";
import { APIStatus, Counter } from "../../types";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { IDLE, LOADING, RESOLVED } = APIStatus;

  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<string>(IDLE);
  const [cache, setCache] = useState<any>({});

  const onSearch = async (password: string): Promise<void> => {
    if (cache[password]) {
      setStatus(LOADING);
      const counter = cache[password];
      setCount(counter);
      setStatus(RESOLVED);
    } else {
      setStatus(LOADING);
      const url: string = `${endpoint}api/v1/ppass?password=${password}`;
      const response: Response = await fetch(url);
      const res: Counter = await response.json();
      setCount(res.counter);
      setStatus(RESOLVED);
      setCache((state: any) => ({ ...state, [password]: res.counter }));
    }
  };

  return (
    <Container>
      <Section>
        <Headline>Have i been compromised in a data breach ?</Headline>

        <Form onSearch={onSearch} />
      </Section>

      {status === LOADING && <Status>Is loading</Status>}
      {status === RESOLVED && (
        <CountSection>
          {count && count > 0
            ? `Your password was found ${count} times... you should probably change your password!`
            : `Your password was NOT found. Carry on!`}
        </CountSection>
      )}
    </Container>
  );
};

export default Home;
