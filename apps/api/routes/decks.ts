import express from "express";
import { createId } from "@paralleldrive/cuid2";
import prisma from "../prisma";
import authMiddleware from "../middleware/auth";
import validateBody from "../middleware/validate";
import { z } from "zod";

const router = express.Router();

router.get("/decks", async (_, res) => {
  const decks = await prisma.deck.findMany();

  res.send(decks);
});

router.get("/deck/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).send();

  const deck = await prisma.deck.findUnique({
    where: { id },
  });

  if (!deck) return res.status(404).send();

  res.send(deck);
});

router.get("/deck/:id/cards", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send();

    const cards = await prisma.card.findMany({
      where: { deckId: id },
    });

    res.send(cards);
  } catch (e) {
    res.status(500).send(e);
  }
});

const newDeckSchema = z.object({
  name: z.string(),
});

router.post("/deck", authMiddleware, async (req, res) => {
  try {
    const { name } = await validateBody(newDeckSchema, req);

    const deck = await prisma.deck.create({
      data: {
        id: createId(),
        name: name,
      },
    });

    res.send(deck);
  } catch (e) {
    res.status(500).send(e);
  }
});

const updateDeckSchema = newDeckSchema.deepPartial();

router.patch("/deck/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send();

    const { name } = await validateBody(updateDeckSchema, req);

    const deck = await prisma.deck.update({
      where: { id },
      data: { name },
    });

    res.send(deck);
  } catch (e: any) {
    if (
      e.name === "PrismaClientKnownRequestError" &&
      e.message.includes("does not exist")
    )
      return res.sendStatus(404);

    res.status(500).send(e);
  }
});

router.delete("/deck/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send();

    await prisma.deck.delete({
      where: { id },
    });

    res.send();
  } catch (e: any) {
    if (
      e.name === "PrismaClientKnownRequestError" &&
      e.message.includes("does not exist")
    )
      return res.sendStatus(404);

    res.status(500).send(e);
  }
});

export default router;
