import { sitePath } from '../sitePath'

export type ProjectStatus = 'Current' | 'Analysis study' | 'Completed' | 'In progress' | 'Upcoming'

export interface Project {
  id: string
  number: string
  category: string
  title: string
  summary: string
  role: string
  status: ProjectStatus
  disciplines: string[]
  metrics?: { value: string; label: string }[]
  metricContext?: string
  visualNote: string
  visualImage?: { src: string; alt: string; width?: number; height?: number }
  featured?: boolean
  workstreams?: { title: string; summary: string }[]
  relatedWork?: { title: string; summary: string; status: ProjectStatus }
}

export const projects: Project[] = [
  {
    id: 'baja-upright',
    number: '01',
    category: 'Vehicle dynamics · Structural design',
    title: 'Longhorn Baja SAE',
    summary: 'I designed the front upright, incorporated FEA and manufacturing feedback, and delivered CNC hardware installed on the vehicle. The welded backup remains in development.',
    role: 'Unsprung Lead · Front Upright Design',
    status: 'Current',
    disciplines: ['SolidWorks', 'FEA', 'Design iteration'],
    metrics: [
      { value: '15% lower', label: 'front-upright mass vs. original design' },
      { value: '7.15g · 4g · 2g', label: 'vertical, lateral, and braking load assumptions' },
    ],
    visualNote: 'Vehicle portrait · golden trees',
    visualImage: {
      src: sitePath('/assets/projects/baja/vehicle-golden-trees.jpg'),
      alt: 'Longhorn Baja vehicle in a grassy clearing with golden autumn trees behind it',
      width: 1600,
      height: 1017,
    },
    featured: true,
    workstreams: [
      {
        title: 'CNC-machined upright',
        summary: 'I designed and delivered the CNC front upright installed on the vehicle, incorporating FEA iterations and manufacturing feedback.',
      },
      {
        title: 'Welded backup upright',
        summary: 'I am developing a spindle-based welded backup around bearing orientation, steering clearance, and fabrication constraints.',
      },
    ],
    relatedWork: {
      title: 'Baja portal uprights',
      summary: 'Separate portal-upright research track.',
      status: 'Upcoming',
    },
  },
  {
    id: 'cold-plate',
    number: '02',
    category: 'Thermal systems · CFD',
    title: 'Liquid Cold Plate CFD Analysis',
    summary: 'I compared pin-fin with the optimized straight-channel design at 150 W: 25% lower thermal resistance with 1.7% higher pressure drop in CFD.',
    role: 'Thermal analysis and optimization',
    status: 'Analysis study',
    disciplines: ['Ansys Fluent', 'CFD', 'Thermal analysis'],
    metrics: [
      { value: '25% lower', label: 'thermal resistance' },
      { value: '+1.7%', label: 'pressure drop' },
    ],
    metricContext: 'Pin-fin vs. optimized straight-channel baseline',
    visualNote: 'Ansys Fluent CFD temperature contour for pin-fin cold-plate geometry',
    visualImage: {
      src: sitePath('/assets/projects/cold-plate/pin-fin-temperature-contour.png'),
      alt: 'Ansys Fluent temperature contour from the pin-fin cold-plate simulation',
    },
    featured: true,
  },
  {
    id: 'sim-wheel',
    number: '03',
    category: 'Personal project · Ergonomics',
    title: 'Custom sim-racing steering wheel',
    summary: 'I designed and 3D printed V1 of a Porsche 963-inspired sim-racing wheel. The fit check surfaced a thumb-reach issue for V2.',
    role: 'Personal design project',
    status: 'In progress',
    disciplines: ['CAD', 'Ergonomics', '3D printing'],
    visualNote: 'V1 · 3D-printed steering wheel',
  },
  {
    id: 'chessbot',
    number: '04',
    category: 'Robotics · Motion systems',
    title: 'IEEE RAS Chessbot',
    summary: 'I redesigned a chess-playing robot’s gantry around a CoreXY arrangement and refined its electromagnet casing, cartridge, and pulley system.',
    role: 'Mechanical design contributor',
    status: 'Completed',
    disciplines: ['Mechanism design', 'CAD', 'Prototyping'],
    metrics: [{ value: '4 → 2 s', label: 'reported cycle time per move' }],
    visualNote: 'CoreXY gantry · electromagnet system',
  },
]

