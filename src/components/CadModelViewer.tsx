import { createElement, useEffect, useRef, useState } from 'react'
import '@google/model-viewer'
import { sitePath } from '../sitePath'

const modelUrl = sitePath('/Front%20Upright%20GLB%20MODEL.glb')
const fallbackImage = sitePath('/Upright%20CAD%20Isometric%20Image.jpg')

export function CadModelViewer() {
  const viewerRef = useRef<HTMLElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    const onLoad = () => {
      const model = (viewer as HTMLElement & {
        model?: { materials?: Array<{ pbrMetallicRoughness: {
          setBaseColorFactor: (rgba: [number, number, number, number]) => void
          setMetallicFactor: (value: number) => void
          setRoughnessFactor: (value: number) => void
        } }> }
      }).model
      model?.materials?.forEach((material) => {
        material.pbrMetallicRoughness.setBaseColorFactor([0.44, 0.46, 0.48, 1])
        material.pbrMetallicRoughness.setMetallicFactor(0.28)
        material.pbrMetallicRoughness.setRoughnessFactor(0.62)
      })
      setLoaded(true)
      setFailed(false)
    }
    const onError = () => setFailed(true)

    viewer.addEventListener('load', onLoad)
    viewer.addEventListener('error', onError)
    return () => {
      viewer.removeEventListener('load', onLoad)
      viewer.removeEventListener('error', onError)
    }
  }, [])

  return (
    <div className={`cad-viewer${failed ? ' cad-viewer--failed' : ''}`}>
      {!failed ? createElement('model-viewer', {
        ref: viewerRef,
        src: modelUrl,
        alt: 'Interactive 3D model of the complete CNC-machined front upright',
        'camera-controls': '',
        'camera-orbit': '35deg 70deg auto',
        'camera-target': 'auto',
        'field-of-view': '30deg',
        'interaction-prompt': 'none',
        'touch-action': 'pan-y',
        'shadow-intensity': '0.28',
        exposure: '0.82',
        'tone-mapping': 'neutral',
        loading: 'eager',
        'disable-tap': '',
        class: 'cad-viewer__model',
      } as Record<string, unknown>) : null}
      {failed && <img className="cad-viewer__fallback" src={fallbackImage} alt="Isometric CAD rendering of the complete front upright" />}
      {failed && <p className="cad-viewer__error" role="status">Could not load <code>{modelUrl}</code>. Confirm the GLB exists in the public folder and is a valid GLB export. The isometric CAD rendering is shown instead.</p>}
      {!loaded && !failed && <div className="cad-viewer__loading" role="status">Loading interactive model…</div>}
      {!failed && <p className="cad-viewer__hint">Drag to rotate · Scroll or pinch to zoom · Right-click or two-finger drag to pan</p>}
    </div>
  )
}
