import { pool } from "../database/conexion.mjs"
import querys from "../database/consultas.mjs"

export const consultaDatabase = () => {
    return new Promise((resolve, reject) => {
        const consulta = querys.getTareas;
        pool.query(consulta, (error, results) => {
            if (error) {
                console.log('Hubo un error en la consulta: ', error.message);
                reject({ error: 'Error en la consulta en la base de datos' })
            } else {
                resolve(results);
            }
        })
    })
}

export async function obtenerTareas(req, res) {
    let conexion;
    try {
        const resultadoConsultaDatabase = await consultaDatabase();
        res.json({ recorset: resultadoConsultaDatabase })
    } catch (error) {
        console.log('Error en obtener las tareas:', error);
        res.status(500).json(error);
    }finally{
        if (conexion) {
            conexion.release();
        }
        
    }
};

export async function actualizarTareas(req, res) {
    let conexion;
    try {
        const { id, estado  } = req.body

        if (!id || !estado) {
            return res.json({ mensaje: 'No se enviaron los parametros necesarios para cambiar el estado' });
        }

        const poolInstace = pool;

        const consulta = await poolInstace.query(querys.actualizarTareas, [estado,id]);
        console.log(consulta)

        res.json({ message: 'Actualizado correctamente' })
    } catch (error) {
        console.log('Hubo un error al intentar actualizar el pedido')
        res.status(500).json({ message: 'Error al actualizar el estado en la base de datos' });
    }finally{
        if (conexion) {
            conexion.release();
        }
        
    }
};

export async function eliminarTareas(req, res) {
    let conexion;
    try {
        const { id } = req.body;

    if (id === undefined) {
        return res.status(400).json({
            message: 'No se detecto el id'
        })
    }

    const poolInstace = pool;

    const eliminarTarea = await poolInstace.query(querys.eliminarTarea, [id]);

    console.log(eliminarTarea);

    res.json({message: 'Se elimino correctamente'});

    } catch (error) {
        console.log('No se pudo eliminar correctamente la tarea');
        res.json(400).json({message: 'Error al intentar eliminar la tarea'})
    }finally{
        if (conexion) {
            conexion.release();
        }
        
    }
    
}

export async function enviarTareas(req, res) {
    let conexion;
    try {
        const { id, texto, estado } = req.body;

        if (id === undefined || texto === undefined || estado ) {
            return res.status(400).json({ message: 'Todos los campos deben estar presentes' });
        }

        const poolInstace = pool;

        // Utilizar async/await para manejar la operación asíncrona
        const insertTareas = await poolInstace.query(querys.insertarTareas, [id, texto, estado]);
        
        console.log(`El resultado de la inserción de datos es:`, insertTareas);

        res.json({ message: 'Nuevo producto insertado' });
    } catch (error) {
        console.error('Error al insertar tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }finally{
        if (conexion) {
            conexion.release();
        }
        
    }
}
