import express from "express";
import {
  create,
  deletar,
  show,
  showById,
  update,
} from "../controllers/financeiroController";

const router = express.Router();

router.get("/:id", showById);
router.get("/", show);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deletar);

export default router;
