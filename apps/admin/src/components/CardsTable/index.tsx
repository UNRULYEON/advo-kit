import { FC, useEffect, useState } from "react";
import { CARD_TYPE, Card, useDeckCards } from "@/api/useDeck";
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
import Button from "@mui/material/Button";

import { alpha } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";

type HeadCell = {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
};

const headCells: HeadCell[] = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
];

type EnhancedTableHeadProps = {
  numSelected: number;
  // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // order: Order;
  // orderBy: string;
  rowCount: number;
};

const EnhancedTableHead: FC<EnhancedTableHeadProps> = ({
  numSelected,
  onSelectAllClick,
  rowCount,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
            // active={orderBy === headCell.id}
            // direction={orderBy === headCell.id ? order : 'asc'}
            // onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type EnhancedTableToolbarProps = {
  numSelected: number;
  handleOnClickNewCard: () => void;
};

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({
  numSelected,
  handleOnClickNewCard,
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Cards
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Create card">
          <IconButton onClick={handleOnClickNewCard}>
            <AddRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const CardsTable: FC = () => {
  const { pathname } = useLocation();
  const isExistingDeck = pathname.includes("edit");
  const deckId = pathname.split("/")[2];

  const { deckCards, mutateDeckCards, isLoadingDeckCards, isDeckCardsError } =
    useDeckCards(isExistingDeck ? deckId : undefined);
  // const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>("name");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [composedCards, setComposedCards] = useState<Card[]>(deckCards || []);

  useEffect(() => {
    if (deckCards) setComposedCards(deckCards);
  }, [deckCards]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (composedCards.length === 0) return;

    if (event.target.checked) {
      const newSelected = composedCards.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleOnClickNewCard = () => {
    setComposedCards((c) => [
      {
        id: Date.now().toString(),
        content: "",
        cardType: CARD_TYPE.NORMAL,
        createdAt: "",
        updatedAt: "",
      },
      ...c,
    ]);
    console.log("new card");
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flexGrow: 1,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleOnClickNewCard={handleOnClickNewCard}
          />
          <TableContainer>
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                // order={order}
                // orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                // onRequestSort={handleRequestSort}
                rowCount={composedCards?.length || 0}
              />
              <TableBody>
                {composedCards.length === 0 && (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={headCells.length + 1}>
                      No decks
                    </TableCell>
                  </TableRow>
                )}
                {composedCards.map((card, index) => {
                  const isItemSelected = isSelected(card.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, card.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={card.id}
                      selected={isItemSelected}
                      sx={{
                        height: "75px",
                        cursor: "pointer",
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <TextField value={card.content} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default CardsTable;
