import { ImageResponse } from 'next/og'

// Configurações da imagem (Tamanho padrão para favicons modernos)
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Geração do Ícone
export default function Icon() {
  return new ImageResponse(
    (
      // Este JSX será convertido em uma imagem PNG
      <div
        style={{
          fontSize: 22,     // Tamanho da letra
          background: '#4A2C21', // Cor do fundo (Coffee)
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FDFBF7', // Cor da letra (Soft/Off-white)
          borderRadius: '50%', // Transforma o quadrado em um círculo
          fontWeight: 700,  // Negrito para ficar visível
          // Usamos uma fonte sans-serif genérica que se aproxima da Josefin Sans
          // (Carregar a fonte exata aqui seria complexo e desnecessário para este tamanho)
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        E
      </div>
    ),
    // Options
    {
      ...size,
    }
  )
}