import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useDeck, {
  useCreateDeck,
  useDeleteDeck,
  useUpdateDeck,
} from "@/api/useDeck";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSWRConfig } from "swr";
import z from "zod";

const deckSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

type NewDeckInputs = {
  name: string;
};

type DeckDialogProps = {
  open: boolean;
  handleOnClose: () => void;
};

const DeckDialog: FC<DeckDialogProps> = ({ open, handleOnClose }) => {
  const { pathname } = useLocation();
  const isExistingDeck = pathname.includes("edit");
  const deckId = pathname.split("/")[3];

  const { mutate } = useSWRConfig();
  const { deck, isLoading, isError } = useDeck(
    isExistingDeck ? deckId : undefined
  );
  const { createDeck, isCreatingDeck, creatingDeckError } = useCreateDeck();
  const { updateDeck, isUpdatingDeck, updatingDeckError } = useUpdateDeck();
  const { deleteDeck, isDeletingDeck, deletingDeckError } = useDeleteDeck();

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

  console.log(errors);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  useEffect(() => {
    if (deck) {
      setValue("name", deck.name);
    }
  }, [deck]);

  const onSubmit: SubmitHandler<NewDeckInputs> = (data) => {
    new Promise<void>((resolve) => {
      if (isExistingDeck) {
        console.log("update deck");
        updateDeck({
          id: deckId,
          payload: {
            name: data.name,
          },
        }).then(() => resolve());
      } else {
        console.log("create new deck");
        createDeck({
          name: data.name,
        })
          .then(() => {
            handleOnClose();
            mutate("/api/decks");
          })
          .then(() => resolve());
      }
    }).then(() => {
      handleOnClose();
      mutate("/api/decks");
    });
  };

  const onDelete = () => {
    deleteDeck({ id: deckId }).then(() => {
      handleOnClose();
      mutate("/api/decks");
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
    >
      {!isExistingDeck && <DialogTitle>New deck</DialogTitle>}
      {deck && <DialogTitle>{deck.name}</DialogTitle>}
      <Box
        p={3}
        pt={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
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
    </Dialog>
  );
};

export default DeckDialog;
