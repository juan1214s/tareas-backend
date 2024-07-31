export default{
    getTareas: 'SELECT * FROM datos',
    actualizarTareas: 'UPDATE datos SET estado = ? WHERE id = ?',
    eliminarTarea: 'DELETE FROM datos WHERE id = ?',
    insertarTareas: 'INSERT INTO datos (id, texto, estado) Values (?, ?, ?)'
}

