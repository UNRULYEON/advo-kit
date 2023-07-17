import { FC, forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useDeck, {
  useCreateDeck,
  useDeleteDeck,
  useUpdateDeck,
} from "@/api/useDeck";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useSWRConfig } from "swr";
import z from "zod";
import CardsGrid from "@/components/CardsGrid";

const deckSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

type NewDeckInputs = {
  name: string;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type DeckDialogProps = {
  open: boolean;
  handleOnClose: () => void;
};

const DeckDialog: FC<DeckDialogProps> = ({ open, handleOnClose }) => {
  const { pathname } = useLocation();
  const isExistingDeck = pathname.includes("edit");
  const deckId = pathname.split("/")[2];

  const { mutate } = useSWRConfig();
  const { deck, isLoading } = useDeck(isExistingDeck ? deckId : undefined);
  const { createDeck, isCreatingDeck } = useCreateDeck();
  const { updateDeck, isUpdatingDeck } = useUpdateDeck();
  const { deleteDeck, isDeletingDeck } = useDeleteDeck();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof deckSchema>>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  useEffect(() => {
    if (deck) {
      setValue("name", deck.name);
    }
  }, [deck, setValue]);

  const onSubmit: SubmitHandler<NewDeckInputs> = (data) => {
    void new Promise<void>((resolve) => {
      if (isExistingDeck) {
        console.log("update deck");
        void updateDeck({
          id: deckId,
          payload: {
            name: data.name,
          },
        }).then(() => resolve());
      } else {
        console.log("create new deck");
        void createDeck({
          name: data.name,
        })
          .then(() => {
            handleOnClose();
            void mutate("/api/decks");
          })
          .then(() => resolve());
      }
    }).then(() => {
      handleOnClose();
      void mutate("/api/decks");
    });
  };

  const onDelete = () => {
    void deleteDeck({ id: deckId }).then(() => {
      handleOnClose();
      void mutate("/api/decks");
    });
  };

  const isMutatingOrLoading =
    isCreatingDeck || isUpdatingDeck || isDeletingDeck || isLoading;
  const isMutating = isCreatingDeck || isUpdatingDeck || isDeletingDeck;

  return (
    <Dialog
      onClose={() => {
        if (!isMutating) handleOnClose();
      }}
      open={open}
      fullScreen
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              if (!isMutating) handleOnClose();
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {!isExistingDeck && "New deck"}
            {deck && deck.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          width: "100%",
          height: "100%",
          padding: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "250px",
            gap: "12px",
          }}
          component={"form"}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h6" component="div" pb={1}>
            Deck details
          </Typography>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Name"
                error={!!errors.name}
                autoComplete="off"
                helperText={errors.name ? errors.name.message : ""}
                disabled={isMutatingOrLoading}
                {...field}
              />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isMutatingOrLoading}
          >
            {isExistingDeck ? "Save" : "Create"}
          </Button>
          {isExistingDeck && (
            <Button
              variant="contained"
              color="error"
              onClick={onDelete}
              disabled={isMutatingOrLoading}
            >
              Delete
            </Button>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
          }}
        >
          <Typography variant="h6">Cards</Typography>
          <CardsGrid />
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeckDialog;
