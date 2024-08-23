const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { encode, decode } = require('gpt-3-encoder');

async function fragmentPDF(inputPath, outputDir) {
  // Crear la carpeta si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfBuffer = fs.readFileSync(inputPath);
  const pdfData = await pdfParse(pdfBuffer);
  const fullText = pdfData.text;

  const tokens = encode(fullText);
  const tokenLimit = 1000;
  let fragment = [];
  let fragmentIndex = 0;

  for (let i = 0; i < tokens.length; i++) {
    fragment.push(tokens[i]);
    if (fragment.length >= tokenLimit || i === tokens.length - 1) {
      const decodedFragment = fragment.map(token => decode([token])).join('');
      fs.writeFileSync(path.join(outputDir, `fragment_${fragmentIndex + 1}.txt`), decodedFragment);
      fragment = [];
      fragmentIndex++;
    }
  }

  console.log('Fragmentación completada.');
}

fragmentPDF('./public/pdf/mi_informacion.pdf', './public/pdf/fragments');