import app from "./app.mjs"

console.clear()

app.listen(app.get('port'),()=>{
})

console.log('EL puerto que se esta ecuchando es', app.get('port'));
