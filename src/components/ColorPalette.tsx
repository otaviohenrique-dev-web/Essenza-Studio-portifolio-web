interface Color {
  name?: string;
  hex: string;
}

export default function ColorPalette({ colors }: { colors: Color[] }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-poiret text-2xl text-essenza-clay tracking-widest">
        Paleta Sugerida
      </h3>
      <div className="flex flex-wrap gap-6">
        {colors.map((color, idx) => (
          <div key={idx} className="group relative flex flex-col items-center gap-3">
            
            {/* A Bolinha de Cor (Aumentei para w-16 h-16 no desktop) */}
            <div 
              className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md border-2 border-white ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
              style={{ backgroundColor: color.hex }}
              title={color.hex}
            />
            
            {/* Texto (Aumentei a fonte) */}
            <div className="text-center">
              <span className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-essenza-coffee">
                {color.name || "Cor"}
              </span>
              <span className="block text-[9px] md:text-[10px] font-mono text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {color.hex}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}