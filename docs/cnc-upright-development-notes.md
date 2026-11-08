# CNC Upright Development Notes

These notes track engineering details that are not established in the public case study.

## Load development and ANSYS setup

- The 7.15g vertical, 4g lateral, and 2g braking values are confirmed CNC design assumptions. Their derivation is not in the available CNC records.
- The available hand calculations document the welded upright. Cornell benchmarking informed a later reconsideration of loading.
- Record any source equations, vehicle inputs, and the method used to convert the g-based assumptions into applied forces if those CNC records become available.
- Record the load directions and application regions, restraints, contacts, material assignment, mesh details, and result extraction method for each CNC ANSYS case.

## Geometry and interfaces

- Confirm which suspension and steering interface locations were required inputs, which were fixed, and which could be changed during the CNC design.
- Identify the steering-link connection in a clear CAD or drawing view before placing a visual callout.
- Record whether a steering sweep, wheel-envelope, or brake-to-wheel clearance check was performed and the geometry/angle used.
- The bearing record confirms an SKF bearing sourced through McMaster-Carr, a specified H7 fit, and an internal retaining ring. The part number, bore/groove dimensions, mating fit, and interference are not available.
- The lower control-arm CAD close-up is not assigned to a revision. Document the exact local geometry changes and alternatives only if the source CAD supports them.
- The preferred lower control-arm result is 274.05 MPa. The source for the initial 470.37 maximum omits its result title and units. Preserve that source limitation.
- Record the exact mesh-refinement settings and result comparison for the later approximately 295–296 MPa revision if available.
- For the separate caliper-tab iteration, record matching initial/revised CAD and FEA results, including load case, result type, units, displacement, and any documented decision to accept or continue revising.

## Manufacturing

- The confirmed process is external 3-axis CNC machining of 6061-T6 aluminum.
- Add supplier-specific stock, tool-access, setup, tolerance, or inspection constraints only if confirmed by a drawing, quote, or manufacturing feedback.
