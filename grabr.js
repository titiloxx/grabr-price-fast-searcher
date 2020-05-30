const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Valor base del producto en grabr: `, (valorProducto) => {
readline.question(`Plata que cobra el importador: `, (valorImportador) => {
      const impuestos=parseInt(valorProducto*0.09)
      //QUIERO GANAR UN 9%
      const total=Math.round(parseInt(valorImportador)*1.1)
      const envio=Math.round(total-parseInt(valorProducto)-impuestos)
      console.log(`
      
Hola como andas? 

Te puedo cobrar lo que me sale el iphone en la tienda oficial + ${envio} dolares del envío.

Seria el total ${valorProducto} + ${impuestos} de impuestos + ${envio} de envío = ${total} usd

Si te interesa avisame, estoy volviendo el 20 de noviembre a Argentina

Saludos

`)
  readline.close()
})
})