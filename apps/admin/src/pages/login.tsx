import useMe from "@/api/useMe";
import styled from "@emotion/styled";
import { Paper, Box, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import useSWR from "swr";

type Provider = {
  name: string;
  url: string;
};

const Login = () => {
  const { data, error, isLoading } = useSWR<Provider[], null>(
    "/api/auth/providers"
  );
  const { me, isLoading: isMeLoading, isError: isMeError } = useMe();

  if (!isMeLoading && !isMeError && me) return <Navigate to="/admin" />;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const providers = data?.map((provider) => {
    if (import.meta.env.DEV) {
      return { ...provider, url: `https://localhost:3000${provider.url}` };
    }

    return provider;
  });

  return (
    <Container>
      <Paper elevation={1}>
        <Box p={2} flexDirection={"column"}>
          {providers &&
            providers.map(({ name, url }) => (
              <a href={url} key={name}>
                <Button>{name}</Button>
              </a>
            ))}
        </Box>
      </Paper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Login;
