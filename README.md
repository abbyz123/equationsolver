# equationsolver
This is a node.js implementation on symbolic implementaton solver.

Usage:
node EquationSolver.js

A commandline prompt will show up to ask user to input an equation (no space is allowed for now):
EquationSolver>4x+3=7
parsed polynomial object: 
{ const: -4, x: 4 }
x = 1[SOLVED]

The program will parse the equation as an object and solve the equation with a simple in-house equation solver.

Current feature:
1. the unknown term can appear anywhere in the equation:
EquationSolver>x+1-7x=8x-9
parsed polynomial object: 
{ const: 10, x: -14 }
x = 0.7142857142857143[SOLVED]

2. If there is multiple unknowns, the program can still parse the equation, but it will only solve one unknown. The rest are assigned with a random number from 0 to 10 (TODO: will solve linear equation system for multiple unknowns in the future)
EquationSolver>3x+5y-7m-9n+6z=5p-8q-10
parsed polynomial object: 
{ const: 10, x: 3, y: 5, m: -7, n: -9, z: 6, p: -5, q: 8 }
x = 0 [RANDOM]
y = 8 [RANDOM]
m = 2 [RANDOM]
n = 5 [RANDOM]
z = 3 [RANDOM]
p = 7 [RANDOM]
q = 3.25[SOLVED]

3. Only +, - and = operator are supported for now (will update other operators in the future). If unsupported operators are used, the command line will output error message and move on to the next equation
EquationSolver>7*x-8
undefined operator: *

