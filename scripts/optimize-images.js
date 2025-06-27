const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const optimizedDir = path.join(__dirname, '../public/images/optimized');

// Criar diretório de imagens otimizadas se não existir
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

const imageFiles = [
  'pilsen.webp',
  'IPA.webp', 
  'weiss.webp',
  'stout.webp',
  'red.webp',
  'session.webp'
];

async function optimizeImages() {
  console.log('🔄 Otimizando imagens...');
  
  for (const filename of imageFiles) {
    const inputPath = path.join(imagesDir, filename);
    const outputPath = path.join(optimizedDir, filename);
    
    if (fs.existsSync(inputPath)) {
      try {
        await sharp(inputPath)
          .resize(400, 300, { 
            fit: 'cover',
            position: 'center'
          })
          .webp({ 
            quality: 80,
            effort: 6
          })
          .toFile(outputPath);
        
        console.log(`✅ ${filename} otimizada`);
      } catch (error) {
        console.error(`❌ Erro ao otimizar ${filename}:`, error);
      }
    }
  }
  
  console.log('🎉 Otimização concluída!');
}

optimizeImages(); 