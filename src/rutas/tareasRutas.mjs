import { Router } from "express";
import {obtenerTareas, enviarTareas, actualizarTareas, eliminarTareas} from "../controles/controlesTareas.mjs"

const router = Router();

router.route('/tarea')
.get(obtenerTareas)
.post(enviarTareas)
.put(actualizarTareas)
.delete(eliminarTareas);

export default router
