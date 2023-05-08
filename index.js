const http = require('http')
const formidavel = require('formidable')
const fs = require('fs')
porta = 443



function listarArquivos (diretorio, enviodearquivo) {
if (!enviodearquivo)
  enviodearquivo = [];
   let listagemArquivos = fs.readdirSync(diretorio)
   console.log(listagemArquivos)
}

listarArquivos('./enviodearquivo')


const servidor = http.createServer((req, res) => {
    if (req.url != '/enviodearquivo') {
       const file = fs.readFileSync('pagina.html')
        res.writeHead(200, { 'Content-Type': 'text/html'})
       res.write(file)
        res.write('<form action = "enviodearquivo" method = "post" enctype = "multipart/form-data">')
        res.write('<input type = "file" name = "filetoupload"><br>')
        res.write('<input type = "submit" value = "Enviar">')
        res.write('</form>')
        res.end()

    }
else {
    const form = new formidavel.IncomingForm()
    form.parse(req, (erro, campos, arquivos) => {
        const urlAntiga = arquivos.filetoupload.filepath
        const urlNova = './enviodearquivo/' + arquivos.filetoupload.originalFilename
        var rawData = fs.readFileSync(urlAntiga)
        fs.writeFile(urlNova, rawData, function(err) {
            if (err) console.log(err)
            res.write('<h1>Arquivo Enviado com sucesso!</h1>')
            res.end()
        })
    })
}
})
servidor.listen(porta, () => {console.log('servidor rodando')})