import { FC } from "react";
import useDecks from "@/api/useDecks";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const tableHeaders = ["Name"];

const Decks: FC = () => {
  const { decks, isLoading, isError } = useDecks();

  console.log(decks);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        paddingBottom: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Decks</Typography>
        <Box>
          <Button startIcon={<AddRoundedIcon />}>New</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={1}>Loading...</TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={1}>Couldn't get decks</TableCell>
              </TableRow>
            )}
            {decks &&
              decks.map((deck) => (
                <TableRow
                  key={deck.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {deck.name}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Decks;
