import express from "express";
import { createId } from "@paralleldrive/cuid2";
import prisma from "../prisma";
import authMiddleware from "../middleware/auth";
import validateBody from "../middleware/validate";
import { z } from "zod";

const router = express.Router();

router.get("/cards", async (_, res) => {
  const cards = await prisma.card.findMany();

  res.send(cards);
});

router.get("/card/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).send();

  const card = await prisma.card.findUnique({
    where: { id },
  });

  if (!card) return res.status(404).send();

  res.send(card);
});

const newCardSchema = z.object({
  deckId: z.string(),
  content: z.string(),
  type: z.enum(["NORMAL"]),
});

router.post("/card", authMiddleware, async (req, res) => {
  try {
    const { deckId, content, type } = await validateBody(newCardSchema, req);

    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
    });

    if (!deck) return res.status(404).send();

    const card = await prisma.card.create({
      data: {
        id: createId(),
        deckId: deck.id,
        content,
        cardType: type,
      },
    });

    res.send(card);
  } catch (e) {
    res.status(500).send(e);
  }
});

const updateCardSchema = newCardSchema.deepPartial();

router.patch("/card/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send();

    const { deckId, content, type } = await validateBody(updateCardSchema, req);

    const card = await prisma.card.update({
      where: { id },
      data: {
        deckId,
        content,
        cardType: type,
      },
    });

    res.send(card);
  } catch (e: any) {
    if (
      e.name === "PrismaClientKnownRequestError" &&
      e.message.includes("does not exist")
    )
      return res.sendStatus(404);

    res.status(500).send(e);
  }
});

router.delete("/card/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send();

    await prisma.card.delete({
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
