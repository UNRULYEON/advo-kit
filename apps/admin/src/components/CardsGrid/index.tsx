import { FC, forwardRef, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { motion, AnimatePresence, useAnimation, Variants } from "framer-motion";
import { IconButton, Tooltip } from "@mui/material";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {
  CARD_TYPE,
  useCreateCard,
  useDeckCards,
  useDeleteCard,
  useUpdateCard,
} from "@/api/useCards";
import { mutate } from "swr";

const CardsGrid: FC = () => {
  const { pathname } = useLocation();
  const isExistingDeck = pathname.includes("edit");
  const deckId = pathname.split("/")[2];

  const { deckCards, mutateDeckCards, isLoadingDeckCards, isDeckCardsError } =
    useDeckCards(isExistingDeck ? deckId : undefined);
  const { createCard } = useCreateCard();
  const [newCardContent, setNewCardContent] = useState<string | null>(null);

  const handleOnCreateNewCard = () =>
    setNewCardContent("Create your card here!");

  const handleOnChangeNewCardContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setNewCardContent(e.target.value);

  const handleOnSaveNewCard = () => {
    if (!newCardContent) return;

    void createCard({
      deckId,
      content: newCardContent,
      type: CARD_TYPE.NORMAL,
    }).then(() => {
      setNewCardContent(null);
      void mutateDeckCards();
    });
  };

  const handleOnDeleteNewCard = () => setNewCardContent(null);

  const sortedDeckCards =
    deckCards?.sort((a, b) =>
      Date.parse(a.createdAt) - Date.parse(b.createdAt) > 0 ? -1 : 1
    ) || [];

  return (
    <>
      <Typography>{deckCards?.length || 0} card(s) in this deck</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <CardContainer>
          <NewCardStyled>
            <IconButton onClick={handleOnCreateNewCard}>
              <AddRoundedIcon />
            </IconButton>
          </NewCardStyled>
        </CardContainer>
        <AnimatePresence mode="popLayout">
          {newCardContent && (
            <Card
              deckId={deckId}
              id="123"
              content={newCardContent || ""}
              onContentChange={handleOnChangeNewCardContent}
              onSave={handleOnSaveNewCard}
              onDelete={handleOnDeleteNewCard}
              selected
            />
          )}
          {sortedDeckCards.map(({ id, content }) => (
            <Card key={id} deckId={deckId} id={id} content={content} />
          ))}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default CardsGrid;

type CardProps = {
  deckId: string;
  id: string;
  content: string;
  selected?: boolean;
  onContentChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave?: () => void;
  onDelete?: () => void;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      deckId,
      id,
      content: originalContent,
      selected,
      onContentChange,
      onSave,
      onDelete,
    },
    ref
  ) => {
    const [content, setContent] = useState<string>(originalContent);
    const [hasFocus, setHasFocus] = useState<boolean>(selected || false);
    const cardRef = useRef<HTMLDivElement>(null);
    const cardControls = useAnimation();
    const cardActionsControls = useAnimation();

    const { updateCard } = useUpdateCard();
    const { deleteCard } = useDeleteCard();
    useOnClickOutside(ref || cardRef, () => setHasFocus(false));

    const cardVariants: Variants = {
      unfocused: {
        scale: 1,
      },
      focused: {
        scale: 1.1,
      },
    };

    const cardControlsVariants: Variants = {
      hidden: {
        opacity: 0,
        scale: 1,
        y: 0,
        zIndex: -1,
        transitionEnd: {
          // Sometimes the controls are still clickable after it's hidden
          // This is a workaround to prevent that
          zIndex: -1,
        },
      },
      visible: {
        opacity: 1,
        scale: 1.1,
        y: -54,
        transitionEnd: {
          zIndex: 1,
        },
      },
    };

    useEffect(() => {
      void cardControls.start(hasFocus ? "focused" : "unfocused");
      void cardActionsControls.start(hasFocus ? "visible" : "hidden");
    }, [hasFocus, cardControls, cardActionsControls]);

    const handleOnChangeContent = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => setContent(event.target.value);

    const handleOnSave = () => {
      void updateCard({
        id,
        payload: {
          content,
        },
      }).then(() => {
        void mutate(`/api/deck/${deckId}/cards`);
      });
    };

    const handleOnDelete = () => {
      void deleteCard({ id }).then(() => {
        void mutate(`/api/deck/${deckId}/cards`);
      });
    };

    const contentChanged = content !== originalContent;

    return (
      <CardContainer onClick={() => setHasFocus(true)} ref={ref || cardRef}>
        <CardStyled
          initial="unfocused"
          animate={cardControls}
          variants={cardVariants}
          transition={{
            type: "spring",
            duration: 0.4,
          }}
        >
          <InputStyled
            value={onContentChange ? originalContent : content}
            onChange={onContentChange || handleOnChangeContent}
          />
        </CardStyled>
        <CardControls
          initial="hidden"
          animate={cardActionsControls}
          variants={cardControlsVariants}
          transition={{
            type: "spring",
            duration: 0.4,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <ButtonGroup variant="contained">
              <Tooltip title="Save changes">
                <Button
                  size="small"
                  disabled={!contentChanged}
                  onClick={onSave || handleOnSave}
                >
                  <SaveRoundedIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Delete card">
                <Button size="small" onClick={onDelete || handleOnDelete}>
                  <DeleteRoundedIcon />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </div>
        </CardControls>
      </CardContainer>
    );
  }
);

const CardContainer = styled(motion.div)`
  position: relative;
  width: fit-content;
  height: 200px;
  aspect-ratio: 2/3;
  z-index: 0;
`;

const InputStyled = styled.textarea`
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  padding: 12px;
  margin: 0;
  border: none;
  background-color: transparent;

  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: bold;
  font-size: 16px;

  text-align: center;
  vertical-align: middle;

  resize: none;

  :focus {
    outline: none;
  }
`;

const BaseCard = styled(motion.div)`
  height: 100%;
  border-radius: 8px;
`;

const CardStyled = styled(BaseCard)`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  color: black;
`;

const NewCardStyled = styled(BaseCard)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dashed white;
`;

const CardControls = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  left: 0;

  > div {
    height: 32px;
    background-color: black;
    border-radius: 4px;
  }
`;
