import { sitePath } from '../sitePath'

export interface ProjectDetailContent {
  problem: string
  approach: string
  designFocus: string[]
  evidencePrompt: string
  bajaUpright?: {
    loadCases: { label: string; value: string }[]
    loadCaseRationale: string
    ansysLoadApplication: string
    cncManufacturing: string
    lowerCArm: { initialStress: string; revisedStress: string; status: string; geometryNote: string }
    caliperIteration: { title: string; description: string }[]
    welded: { heading: string; text: string }[]
    preliminaryLoad: string
  }
  coldPlate?: {
    requirements: { label: string; value: string }[]
    method: string[]
    meshStudy: { label: string; globalSize: string; elementCount: string; maxTemperature: string; pressureDrop: string; thermalResistance: string; change: string }[]
    flowSweep: { flow: string; maxTemperature: string; pressureDrop: string; thermalResistance: string }[]
    geometryComparison: { design: string; maxTemperature: string; pressureDrop: string; thermalResistance: string; reportedTradeoff: string }[]
    selectionNote: string
    heatBalanceNote: string
    images: { src: string; alt: string; caption: string }[]
  }
}

export const projectDetails: Record<string, ProjectDetailContent> = {
  'baja-upright': {
    problem: 'Develop upright designs for the Baja vehicle around suspension loads, wheel clearance, weight, strength, and practical manufacturing constraints.',
    approach: 'The current work brings two related paths together: CNC-machined uprights and welded backup uprights. The designs are being developed with load cases, FEA iteration, interfaces, and fabrication needs in mind.',
    designFocus: [
      'CNC machining constraints, bearing interfaces, tolerances, and fit considerations',
      'Suspension load-case development and FEA-guided design iteration',
      'Weld access, joint design, and fixturing for the backup upright approach',
      'Packaging and weight, strength, and manufacturability trade-offs',
    ],
    evidencePrompt: 'Selected control-arm CAD and FEA screenshots from the supplied PDF are shown on the CNC upright page. Their revision mapping and matching analysis conditions remain unconfirmed; caliper-tab plots and source calculations are not available. No validation claim is made.',
    bajaUpright: {
      loadCases: [
        { label: 'Vertical', value: '7.15g' },
        { label: 'Lateral', value: '4g' },
        { label: 'Braking', value: '2g' },
      ],
      loadCaseRationale: 'An Excel calculation sheet supported the selected CNC design inputs: 7.15g vertical, 4g lateral, and 2g braking. These assumptions guided the upright analysis; they are not a proven worst-case operating envelope. The later handwritten steady-state cornering calculations belong to the welded upright, and Cornell benchmarking informed a separate reconsideration of loading.',
      ansysLoadApplication: 'The lower control-arm study combined the vertical, lateral, and braking assumptions in a design analysis case. The available screenshots do not document their force equivalents, load directions and application surfaces, restraints, or iteration-specific solver setup.',
      cncManufacturing: 'The CNC-machined upright uses 6061-T6 aluminum and an externally performed 3-axis CNC process.',
      lowerCArm: {
        initialStress: 'Source case not assigned',
        revisedStress: 'Source case not assigned',
        status: 'Source figures available · setup matching unverified',
        geometryNote: 'ANSYS FEA indicated that the upright’s lower C-arm pickup region was at risk under the analyzed load case. The screenshots provide geometry and result context; the source-label limits and unconfirmed relationships between separate runs are preserved on the CNC case-study page.',
      },
      caliperIteration: [
        { title: '01 / Initial CAD', description: 'The initial upright geometry included pockets around the brake-caliper mounting-tab region.' },
        { title: '02 / Initial ANSYS FEA', description: 'The first analysis identified the upright’s brake-caliper mounting tabs as a critical region. The caliper body itself was not the failing component.' },
        { title: '03 / Geometry revision', description: 'Additional material was added within the pockets around the mounting tabs.' },
        { title: '04 / Updated ANSYS FEA', description: 'The revised iteration showed qualitatively lower peak stress and smaller displacement than the earlier iteration. Numerical results have not yet been supplied.' },
      ],
      welded: [
        { heading: 'Bearing orientation & steering clearance', text: 'During the previous season, the spherical bearings interfered with the upright’s upper C-arm and limited steering clearance. Those articulation limitations informed this backup concept: the weld-cup circular opening is oriented in a vertical plane. The design-stage geometry indicates a theoretical maximum steering angle of 46°; this has not been physically demonstrated or checked across the full suspension-travel envelope.' },
        { heading: 'Spindle-based design & manufacturing', text: 'The backup concept uses 1/8-inch sheet metal around a spindle. Fabrication is planned around available in-house equipment. Spindle or bearing-interface machining may be outsourced because of dimensional requirements; the split between in-house and external work is not finalized.' },
      ],
      preliminaryLoad: 'Preliminary vertical-load calculations indicate approximately 6g. Further structural calculations and bearing-capacity calculations are in progress.',
    },
  },
  'cold-plate': {
    problem: 'Study cooling for a 150 W power-electronics heat input while considering coolant flow, heat transfer, and pressure drop.',
    approach: 'Use SolidWorks and Ansys Fluent to compare candidate channel geometries and flow rates. Python postprocessing calculates thermal resistance from CFD outputs. The results support a simulation-based geometry selection; experimental validation is not documented.',
    designFocus: [
      'Coolant flow through candidate channel geometries',
      'Heat transfer under the stated 150 W applied heat input',
      'Pressure-drop and thermal-performance trade-offs',
      'Simulation-based comparison; no experimental validation is documented',
    ],
    evidencePrompt: 'Additional CAD and boundary-condition setup images may clarify the simulation setup. The reported energy balance is a numerical consistency check, not experimental validation.',
    coldPlate: {
      requirements: [
        { label: 'Plate envelope', value: '120 × 120 × 15 mm' },
        { label: 'Heat source', value: '40 × 40 × 4 mm' },
        { label: 'Applied heat input', value: '150 W' },
        { label: 'Coolant / inlet', value: 'Water · 25 °C' },
        { label: 'Thermal target', value: '≤ 0.4 °C/W' },
        { label: 'Pressure-drop target', value: '≤ 5 kPa baseline' },
      ],
      method: [
        'CAD in SolidWorks; CFD in Ansys Fluent.',
        'Python postprocessing calculated thermal resistance from the CFD outputs.',
        'Water properties specified at 25 °C; a constant heat flux was applied at the heat-source face.',
        'The report describes a mass-flow inlet (also noted as a pressure inlet) and a pressure outlet at 0 gauge. The inlet wording is retained as reported because the exact Fluent boundary-condition setup is not otherwise shown.',
        'A mesh-independence comparison reported unchanged displayed peak temperature, pressure drop, and thermal resistance between its fine and extra-fine cases.',
      ],
      meshStudy: [
        { label: 'Fine', globalSize: '2 mm', elementCount: '553,650', maxTemperature: '45.551 °C', pressureDrop: '14.194183 Pa', thermalResistance: '0.136 °C/W', change: 'Reference case' },
        { label: 'Extra fine', globalSize: '1.5 mm', elementCount: '815,824', maxTemperature: '45.551 °C', pressureDrop: '14.194183 Pa', thermalResistance: '0.136 °C/W', change: '0% change reported' },
      ],
      flowSweep: [
        { flow: '0.15 L/min', maxTemperature: '53.955 °C', pressureDrop: '5.02237 Pa', thermalResistance: '0.1930 °C/W' },
        { flow: '0.30 L/min', maxTemperature: '44.127 °C', pressureDrop: '9.70905 Pa', thermalResistance: '0.1275 °C/W' },
        { flow: '0.75 L/min', maxTemperature: '41.020 °C', pressureDrop: '63.3024 Pa', thermalResistance: '0.1068 °C/W' },
        { flow: '1.25 L/min', maxTemperature: '37.188 °C', pressureDrop: '146.984 Pa', thermalResistance: '0.08125 °C/W' },
        { flow: '1.75 L/min', maxTemperature: '35.736 °C', pressureDrop: '254.463 Pa', thermalResistance: '0.07157 °C/W' },
      ],
      geometryComparison: [
        { design: 'Optimized straight channel', maxTemperature: '40.133 °C', pressureDrop: '56.3404 Pa', thermalResistance: '0.10088 °C/W', reportedTradeoff: 'Comparison baseline' },
        { design: 'Pin fin', maxTemperature: '36.342 °C', pressureDrop: '57.2898 Pa', thermalResistance: '0.0756 °C/W', reportedTradeoff: '25% lower thermal resistance; 1.7% higher ΔP' },
        { design: 'Serpentine channel', maxTemperature: '36.759 °C', pressureDrop: '284.459 Pa', thermalResistance: '0.07839 °C/W', reportedTradeoff: '22% lower thermal resistance; 405% higher ΔP' },
      ],
      selectionNote: 'The report identifies pin-fin as the preferred simulated geometry: approximately 25% lower thermal resistance (about 0.0756 °C/W) and 1.7% higher pressure drop than the optimized straight-channel baseline. The serpentine case showed similar thermal improvement with a much larger pressure-drop increase. These are simulation results, not experimental validation.',
      heatBalanceNote: 'Using the mass-weighted outlet temperature, the CFD energy-balance check was 149.7 W against 150 W applied, an approximately 0.2% discrepancy. This is a numerical consistency check of the simulation energy accounting, not experimental validation.',
      images: [
        { src: sitePath('/assets/projects/cold-plate/flow-rate-resistance-chart.png'), alt: 'Reported cold-plate thermal resistance plotted against water flow rate', caption: 'Report figure · baseline thermal resistance across the tested flow-rate sweep.' },
        { src: sitePath('/assets/projects/cold-plate/pin-fin-temperature-contour.png'), alt: 'Ansys Fluent temperature contour for the pin-fin cold-plate geometry', caption: 'Ansys Fluent temperature contour · pin-fin geometry · report-reported peak source temperature: 36.342 °C.' },
        { src: sitePath('/assets/projects/cold-plate/serpentine-temperature-contour.png'), alt: 'Ansys Fluent temperature contour for the serpentine-channel cold-plate geometry', caption: 'Ansys Fluent temperature contour · serpentine geometry · report-reported peak source temperature: 36.759 °C.' },
      ],
    },
  },
  'sim-wheel': {
    problem: 'Design a custom sim-racing steering wheel inspired by the Porsche 963, with a fit check informing the next iteration.',
    approach: 'Version 1 was modeled in CAD and 3D printed. A fit check surfaced a thumb-reach issue to address in Version 2.',
    designFocus: [
      'CAD development of the custom wheel',
      'Physical prototyping with a 3D-printed Version 1',
      'Ergonomic fit feedback and thumb reach',
      'Iteration planning for Version 2',
    ],
    evidencePrompt: 'Add genuine Version 1 CAD, print and fit-check photos, and Version 2 revisions when available.',
  },
  chessbot: {
    problem: 'Improve the mechanical arrangement of a chess-playing robot gantry and its related motion components.',
    approach: 'Redesigned the gantry around a CoreXY arrangement and refined the electromagnet casing and cartridge along with the pulley system.',
    designFocus: [
      'CoreXY gantry arrangement',
      'Electromagnet casing and cartridge refinement',
      'Pulley-system refinement',
    ],
    evidencePrompt: 'Add actual robot, gantry, electromagnet, and pulley-system photos or CAD images when available.',
  },
}

