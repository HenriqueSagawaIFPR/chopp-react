const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images/optimized');
const responsiveDir = path.join(__dirname, '../public/images/responsive');

// Criar diretório de imagens responsivas se não existir
if (!fs.existsSync(responsiveDir)) {
  fs.mkdirSync(responsiveDir, { recursive: true });
}

const imageFiles = [
  'pilsen.webp',
  'IPA.webp', 
  'weiss.webp',
  'stout.webp',
  'red.webp',
  'session.webp'
];

const sizes = [
  { name: 'small', width: 300, height: 225 },
  { name: 'medium', width: 400, height: 300 },
  { name: 'large', width: 600, height: 450 }
];

async function generateResponsiveImages() {
  console.log('🔄 Gerando imagens responsivas...');
  
  for (const filename of imageFiles) {
    const inputPath = path.join(imagesDir, filename);
    
    if (fs.existsSync(inputPath)) {
      for (const size of sizes) {
        const outputFilename = filename.replace('.webp', `-${size.name}.webp`);
        const outputPath = path.join(responsiveDir, outputFilename);
        
        try {
          await sharp(inputPath)
            .resize(size.width, size.height, { 
              fit: 'cover',
              position: 'center'
            })
            .webp({ 
              quality: 75,
              effort: 6
            })
            .toFile(outputPath);
          
          console.log(`✅ ${outputFilename} gerada`);
        } catch (error) {
          console.error(`❌ Erro ao gerar ${outputFilename}:`, error);
        }
      }
    }
  }
  
  console.log('🎉 Geração de imagens responsivas concluída!');
}

generateResponsiveImages(); 