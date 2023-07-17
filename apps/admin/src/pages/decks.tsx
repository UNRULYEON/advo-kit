import { FC, useEffect, useState } from "react";
import useDecks from "@/api/useDecks";
import { useDeleteDeck } from "@/api/useDeck";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeckDialog from "@/components/DeckDialog";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import styled from "@emotion/styled";

const tableHeaders = [
  <TableCell key={"name"}>Name</TableCell>,
  <TableCell key={"delete"} width={100} align="right"></TableCell>,
];

const Decks: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { decks, mutateDecks, isLoading, isError } = useDecks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { deleteDeck } = useDeleteDeck();

  const dialogShouldOpen =
    pathname.includes("new") || pathname.includes("edit");

  useEffect(() => {
    setIsDialogOpen(dialogShouldOpen);
  }, [pathname, setIsDialogOpen, dialogShouldOpen]);

  const handleOnClickNewDeck = () => {
    navigate("new");
  };

  const handleOnClickDeck = (id: string) => {
    navigate(`${id}/edit`);
  };
  const handleOnClickDeleteDeck = (id: string) => {
    void deleteDeck({ id }).then(() => {
      void mutateDecks();
    });
  };

  const handleOnCloseDialog = () => {
    navigate("/admin");
    setIsDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
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
          <Button startIcon={<AddRoundedIcon />} onClick={handleOnClickNewDeck}>
            New
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>{tableHeaders.map((header) => header)}</TableRow>
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
            {decks && decks.length === 0 && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={1}>No decks</TableCell>
              </TableRow>
            )}
            {decks &&
              decks
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((deck) => (
                  <TableRowStyled
                    hover
                    key={deck.id}
                    sx={{
                      cursor: "pointer",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => handleOnClickDeck(deck.id)}
                    >
                      {deck.name}
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="right"
                      id="delete-deck"
                      onClick={() => handleOnClickDeck(deck.id)}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOnClickDeleteDeck(deck.id);
                        }}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRowStyled>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeckDialog open={isDialogOpen} handleOnClose={handleOnCloseDialog} />
    </Box>
  );
};

const TableRowStyled = styled(TableRow)`
  > #delete-deck {
    opacity: 0;
    transition: 0.1s ease-in-out all;
  }

  :hover > #delete-deck {
    opacity: 1;
  }
`;

export default Decks;
