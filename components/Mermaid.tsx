import fs from 'fs'
import path from 'path'
import { getMermaidHash, normalizeMermaidCode } from '@/lib/mermaid/getMermaidHash'
import MermaidDynamic from './MermaidDynamic'

interface MermaidProps {
  code: string
}

export default function Mermaid({ code }: MermaidProps) {
  // Normalize and hash the code
  const normalizedCode = normalizeMermaidCode(code)
  const hash = getMermaidHash(normalizedCode)
  const svgPath = `/mermaid-cache/${hash}.svg`
  const svgFilePath = path.join(process.cwd(), 'public', 'mermaid-cache', `${hash}.svg`)
  const hasSvg = fs.existsSync(svgFilePath)

  if (!hasSvg) {
    return <MermaidDynamic code={normalizedCode} />
  }

  return (
    <div className="relative my-6">
      <img
        src={svgPath}
        alt="Mermaid diagram"
        className="max-w-full h-auto mx-auto"
        loading="lazy"
      />
    </div>
  )
}
