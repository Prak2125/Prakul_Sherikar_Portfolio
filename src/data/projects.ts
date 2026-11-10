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
    summary: 'Unsprung Lead with a specific contribution to front-upright design, analysis iterations, wheel-end interfaces, and a welded backup concept in development.',
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
        summary: 'Developing suspension load cases and FEA iterations while working through bearing fits, tolerances, machining constraints, and packaging trade-offs.',
      },
      {
        title: 'Welded backup upright',
        summary: 'Developing an alternative around fabrication access, joint design, fixturing, and practical manufacturing trade-offs.',
      },
    ],
    relatedWork: {
      title: 'Baja portal uprights',
      summary: 'Planned future research extension; requirements and approach have not yet been defined.',
      status: 'Upcoming',
    },
  },
  {
    id: 'cold-plate',
    number: '02',
    category: 'Thermal systems · CFD',
    title: 'Liquid Cold Plate CFD Analysis',
    summary: 'At 150 W applied heat input, CFD compared pin-fin against the optimized straight-channel design: 25% lower thermal resistance with 1.7% higher pressure drop. Simulated results; experimental validation is not documented.',
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
    summary: 'A custom wheel inspired by the Porsche 963. V1 has been CADed and 3D printed; the first fit check surfaced a thumb-reach issue to solve in V2.',
    role: 'Personal design project',
    status: 'In progress',
    disciplines: ['CAD', 'Ergonomics', '3D printing'],
    visualNote: 'V1 baseplate photos and CAD to be added',
  },
  {
    id: 'chessbot',
    number: '04',
    category: 'Robotics · Motion systems',
    title: 'IEEE RAS Chessbot',
    summary: 'Redesigned a chess-playing robot’s gantry around a CoreXY arrangement and refined the electromagnet casing and cartridge, along with the pulley system.',
    role: 'Mechanical design contributor',
    status: 'Completed',
    disciplines: ['Mechanism design', 'CAD', 'Prototyping'],
    metrics: [{ value: '4 → 2 s', label: 'reported cycle time per move' }],
    visualNote: 'Robot prototype and gantry images to be added',
  },
]

