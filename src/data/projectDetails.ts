import { sitePath } from '../sitePath'

export interface ProjectDetailContent {
  problem: string
  approach: string
  designFocus: string[]
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
    problem: 'I designed the front upright to connect the wheel bearing and rotating wheel-end to the suspension, steering, and brakes while balancing structural loading, steering clearance, packaging, mass, and manufacturing constraints.',
    approach: 'I developed the CNC geometry, evaluated separate lower control-arm and brake-tab revisions with FEA, and incorporated manufacturing feedback. The CNC hardware was manufactured and installed on the vehicle. I am developing the spindle-based welded backup separately.',
    designFocus: [
      'I developed the CNC geometry and design-load assumptions, then used FEA to guide separate geometry iterations.',
      'I worked through bearing interfaces, brake packaging, fits, and manufacturing feedback for the CNC upright.',
      'I am developing a welded backup with a different bearing arrangement and fabrication path.',
    ],
    bajaUpright: {
      loadCases: [
        { label: 'Vertical', value: '7.15g' },
        { label: 'Lateral', value: '4g' },
        { label: 'Braking', value: '2g' },
      ],
      loadCaseRationale: 'I used Excel calculations that included weight transfer to determine wheel loads, then selected a severe combined CNC design case based on 7.15g vertical, 4g lateral, and 2g braking assumptions. I used this scenario to assess structural response and guide geometry changes; it is not a proven worst-case envelope or measured competition loading. The later handwritten steady-state cornering calculations belong to the welded upright.',
      ansysLoadApplication: 'The reported setup identifies three load application locations: the bearing bore, brake-caliper mounting bolt holes, and steering tie-rod bolt holes. The upper and lower control-arm pickup bolt holes were restrained, and the directional loads were applied together in the reported analysis sequence. The available setup record does not map each force direction to an individual application location or specify the ANSYS support type or degrees of freedom.',
      cncManufacturing: 'The CNC-machined upright uses 6061-T6 aluminum and an externally performed 3-axis CNC process.',
      lowerCArm: {
        initialStress: 'Approximately 470 MPa',
        revisedStress: '274.05 MPa selected · 317.61 MPa rejected',
        status: 'Owner-confirmed revision sequence',
        geometryNote: 'The thicker-wall revision increased peak stress; local refinement around that model produced an approximately similar peak. I rejected it and returned to the reinforced geometry.',
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
    problem: 'I evaluated cold-plate cooling at a 150 W applied heat input while balancing heat transfer and coolant pressure drop.',
    approach: 'I used SolidWorks, Ansys Fluent, and Python postprocessing to compare candidate channel geometries and flow rates and calculate thermal resistance from the CFD outputs.',
    designFocus: [
      'I compared coolant flow through candidate channel geometries.',
      'I evaluated heat transfer under the 150 W applied heat input.',
      'I weighed pressure drop against thermal performance.',
    ],
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
        'I modeled the cold plate in SolidWorks and compared candidate designs in Ansys Fluent.',
        'I used Python postprocessing to calculate thermal resistance from CFD outputs.',
        'I specified water properties at 25 °C and applied a constant heat flux at the heat-source face.',
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
      selectionNote: 'I selected pin-fin as the preferred simulated geometry: approximately 25% lower thermal resistance (about 0.0756 °C/W) and 1.7% higher pressure drop than the optimized straight-channel baseline. The serpentine case showed similar thermal improvement with a much larger pressure-drop increase. Results are simulation-based; experimental testing has not been completed.',
      heatBalanceNote: 'Using the mass-weighted outlet temperature, the CFD energy-balance check was 149.7 W against 150 W applied, an approximately 0.2% discrepancy. This is a numerical consistency check of the simulation energy accounting.',
      images: [
        { src: sitePath('/assets/projects/cold-plate/flow-rate-resistance-chart.png'), alt: 'Reported cold-plate thermal resistance plotted against water flow rate', caption: 'Report figure · baseline thermal resistance across the tested flow-rate sweep.' },
        { src: sitePath('/assets/projects/cold-plate/pin-fin-temperature-contour.png'), alt: 'Ansys Fluent temperature contour for the pin-fin cold-plate geometry', caption: 'Ansys Fluent temperature contour · pin-fin geometry · report-reported peak source temperature: 36.342 °C.' },
        { src: sitePath('/assets/projects/cold-plate/serpentine-temperature-contour.png'), alt: 'Ansys Fluent temperature contour for the serpentine-channel cold-plate geometry', caption: 'Ansys Fluent temperature contour · serpentine geometry · report-reported peak source temperature: 36.759 °C.' },
      ],
    },
  },
  'sim-wheel': {
    problem: 'I designed a custom sim-racing steering wheel inspired by the Porsche 963 and used a fit check to guide the next iteration.',
    approach: 'I modeled Version 1 in CAD and 3D printed it. The fit check surfaced a thumb-reach issue for Version 2.',
    designFocus: [
      'CAD development of the custom wheel',
      'Physical prototyping with a 3D-printed Version 1',
      'Ergonomic fit feedback and thumb reach',
      'Iteration planning for Version 2',
    ],
  },
  chessbot: {
    problem: 'I improved the mechanical arrangement of a chess-playing robot gantry and its motion components.',
    approach: 'I redesigned the gantry around a CoreXY arrangement and refined the electromagnet casing, cartridge, and pulley system.',
    designFocus: [
      'CoreXY gantry arrangement',
      'Electromagnet casing and cartridge refinement',
      'Pulley-system refinement',
    ],
  },
}

