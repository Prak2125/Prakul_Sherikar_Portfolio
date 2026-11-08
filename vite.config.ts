import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore Node built-ins are available to Vite, but this project omits @types/node.
import { copyFile, mkdir, rm } from 'node:fs/promises'
// @ts-ignore Node built-ins are available to Vite, but this project omits @types/node.
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

const nativeCadFilename = 'dDYN0005_SteeringKnuckleRight_REV04_V02_Machinable Version C+.SLDPRT'

function blockNativeCadRequests(): Plugin {
  const middleware = (req: unknown, res: unknown, next: (error?: unknown) => void) => {
    let requestedPath = ''
    try {
      requestedPath = decodeURIComponent(((req as { url?: string }).url ?? '').split('?')[0])
    } catch {
      next()
      return
    }

    if (requestedPath === `/${nativeCadFilename}`) {
      const response = res as { statusCode: number; end: (body?: string) => void }
      response.statusCode = 404
      response.end('Not found')
      return
    }

    next()
  }

  return {
    name: 'block-native-cad-download',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

function excludeNativeCadFromBuild(): Plugin {
  let outputDirectory = ''
  return {
    name: 'exclude-native-cad-from-build-output',
    apply: 'build',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      if (outputDirectory) {
        await rm(resolve(outputDirectory, nativeCadFilename), { force: true })
      }
    },
  }
}

const directRoutes = [
  'projects',
  'projects/baja-upright',
  'projects/baja-upright/cnc-upright',
  'projects/baja-upright/welded-upright',
  'projects/baja-upright/portal-upright',
  'projects/cold-plate',
  'projects/sim-wheel',
  'projects/chessbot',
  'resume',
  'contact',
]

function emitStaticRoutePages(): Plugin {
  let outputDirectory = ''
  return {
    name: 'emit-static-route-pages',
    apply: 'build',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const indexPage = resolve(outputDirectory, 'index.html')
      await Promise.all(directRoutes.map(async (route) => {
        const routeDirectory = resolve(outputDirectory, route)
        await mkdir(routeDirectory, { recursive: true })
        await copyFile(indexPage, resolve(routeDirectory, 'index.html'))
      }))
      await copyFile(indexPage, resolve(outputDirectory, '404.html'))
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Prakul_Sherikar_Portfolio/' : '/',
  plugins: [react(), blockNativeCadRequests(), excludeNativeCadFromBuild(), emitStaticRoutePages()],
}))
