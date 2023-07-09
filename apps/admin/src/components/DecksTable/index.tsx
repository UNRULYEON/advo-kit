"use client";

import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useDecks from "@/hooks/useDecks";
import Loader from "@/components/Loader";

const headers = [
  <TableCell width={40} align="right">
    🃏
  </TableCell>,
  <TableCell>Name</TableCell>,
];

const DecksTable: FC = () => {
  const { decks, loading, error } = useDecks();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>{headers.map((header) => header)}</TableHead>
        <TableBody>
          {loading && (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell colSpan={headers.length}>
                <div className="flex justify-center">
                  <Loader />
                </div>
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell colSpan={headers.length}>
                Error: {error.message}
              </TableCell>
            </TableRow>
          )}
          {decks &&
            decks.map((deck) => (
              <TableRow
                key={deck.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {deck.emoji}
                </TableCell>
                <TableCell>{deck.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DecksTable;
