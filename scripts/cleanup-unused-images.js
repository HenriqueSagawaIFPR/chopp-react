const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

// Imagens que estão sendo utilizadas no projeto
const usedImages = [
  // Imagens do menu (otimizadas)
  'optimized/pilsen.webp',
  'optimized/IPA.webp',
  'optimized/weiss.webp',
  'optimized/stout.webp',
  'optimized/red.webp',
  'optimized/session.webp',
  
  // Imagens responsivas do menu
  'responsive/pilsen-small.webp',
  'responsive/pilsen-medium.webp',
  'responsive/pilsen-large.webp',
  'responsive/IPA-small.webp',
  'responsive/IPA-medium.webp',
  'responsive/IPA-large.webp',
  'responsive/weiss-small.webp',
  'responsive/weiss-medium.webp',
  'responsive/weiss-large.webp',
  'responsive/stout-small.webp',
  'responsive/stout-medium.webp',
  'responsive/stout-large.webp',
  'responsive/red-small.webp',
  'responsive/red-medium.webp',
  'responsive/red-large.webp',
  'responsive/session-small.webp',
  'responsive/session-medium.webp',
  'responsive/session-large.webp',
  
  // Imagens de eventos
  'evento1.webp',
  'evento2.webp',
  'evento3.webp',
  
  // Imagem sobre nós
  'sobrenos.webp'
];

// Imagens originais que podem ser removidas (já foram otimizadas)
const originalImagesToRemove = [
  'pilsen.webp',
  'pilsen.jpg',
  'IPA.webp',
  'IPA.jpg',
  'weiss.webp',
  'weiss.jpg',
  'stout.webp',
  'stout.jpg',
  'red.webp',
  'red.jpg',
  'session.webp',
  'session.jpg'
];

async function cleanupUnusedImages() {
  console.log('🧹 Iniciando limpeza de imagens não utilizadas...');
  
  let removedCount = 0;
  let totalSizeRemoved = 0;
  
  // Remover imagens originais grandes
  for (const filename of originalImagesToRemove) {
    const filePath = path.join(imagesDir, filename);
    
    if (fs.existsSync(filePath)) {
      try {
        const stats = fs.statSync(filePath);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        fs.unlinkSync(filePath);
        console.log(`🗑️  Removido: ${filename} (${fileSizeInMB}MB)`);
        removedCount++;
        totalSizeRemoved += stats.size;
      } catch (error) {
        console.error(`❌ Erro ao remover ${filename}:`, error.message);
      }
    }
  }
  
  // Verificar se há outras imagens não utilizadas
  const allFiles = fs.readdirSync(imagesDir, { withFileTypes: true });
  
  for (const file of allFiles) {
    if (file.isFile()) {
      const filename = file.name;
      const isUsed = usedImages.some(usedImage => 
        usedImage === filename || 
        usedImage.includes(filename.replace('.webp', '')) ||
        usedImage.includes(filename.replace('.jpg', ''))
      );
      
      if (!isUsed && !filename.startsWith('.')) {
        const filePath = path.join(imagesDir, filename);
        try {
          const stats = fs.statSync(filePath);
          const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
          
          fs.unlinkSync(filePath);
          console.log(`🗑️  Removido: ${filename} (${fileSizeInMB}MB) - não utilizado`);
          removedCount++;
          totalSizeRemoved += stats.size;
        } catch (error) {
          console.error(`❌ Erro ao remover ${filename}:`, error.message);
        }
      }
    }
  }
  
  const totalSizeRemovedMB = (totalSizeRemoved / (1024 * 1024)).toFixed(2);
  
  console.log('\n📊 Resumo da limpeza:');
  console.log(`✅ ${removedCount} arquivos removidos`);
  console.log(`💾 ${totalSizeRemovedMB}MB liberados`);
  console.log('🎉 Limpeza concluída!');
}

cleanupUnusedImages(); 