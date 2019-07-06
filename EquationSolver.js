// Equation Parser
class EquationParser {
    constructor() {
        // features needed for parser
        this.operators = {                      // operators and their priority
            '=' : 0,
            '+' : 1,
            '-' : 1,
            '*' : undefined,                    // for future implemenation
            '/' : undefined,
            '^' : undefined,
            '(' : undefined,
            ')' : undefined,
            '{' : undefined,
            '}' : undefined,
        };
        this.currNum  = 0;                      // current parsing item
        this.currSym  = "const";                // current symbol
        this.dotOcurr = false;                  // if the "dot" occurred for number
        this.dotDigit = 0;                      // for digits after the "dot"
        this.currSign = 1;                      // sign
        this.equalOcurr = false;                // if the "=" ocurred
        this.polynomial = {
            "const" : 0
        };                                      // current polynomial stack if parentheis occurs
    }

    reset() {
        this.dotOcurr = false;
        this.dotDigit = 0;
        this.dotSign = 1;
        if (this.equalOcurr) {
            this.currSign = -1;
        } else {
            this.currSign = 1;
        }
        this.currNum = 0;
        this.currSym = "const";
    }

    updatePolynomial() {
        if (this.currSym in this.polynomial) {
            this.polynomial[this.currSym] += (this.currNum * this.currSign);
        } else {
            this.polynomial[this.currSym] = (this.currNum * this.currSign);
        }
    }

    parse(equation) {
        for (let i = 0; i < equation.length; i++) {
            let curr = equation[i];
            // parse a number
            if (!isNaN(curr)) {
                if ("const" === this.currSym) {
                    if (!this.dotOcurr) {
                        this.currNum = this.currNum * 10 + parseFloat(curr);
                    } else {
                        this.currNum += Math.pow(10, this.dotDigit) * parseFloat(curr);
                        this.dotDigit -= 1;
                    }
                } else {
                    throw "number appear after symbol"
                }
            }
            // parse dot
            else if ('.' === curr) {
                if (this.dotOcurr) {
                    throw "replicate dot"
                }
                if (isNaN(curr)) {
                    this.currParse = 0;
                }
                this.dotOcurr = true;
                this.dotDigit = -1;
            }
            // parse operator
            else if (curr in this.operators) {
                if (undefined === this.operators[curr]) {
                    throw "undefined operator: " + curr;
                }

                // update current term to polynomial
                this.updatePolynomial()

                // reset for new term
                this.reset();

                // operator
                if ('-' === curr) {
                    this.currSign *= (-1);
                }
                if ('=' === curr) {
                    this.equalOcurr = true;
                    this.currSign = -1;
                }
            }
            // parse symbol
            else {
                if ("const" === this.currSym) {
                    this.currSym = curr;
                } else {
                    throw "high order symbol";
                }
                // for symbol without coefficient, by default set coefficient as 1
                if (0 === this.currNum) {
                    this.currNum = 1;
                }
            }
        }

        // update last term
        this.updatePolynomial();

        return this.polynomial;
    }
}

function EquationSolver(polynomial) {
    let syms = Object.keys(polynomial);
    let unknownNum = syms.length-1;
    if (0 === unknownNum) {
        throw "nothing to solve"
    } else {
        let rhs = -polynomial["const"];
        syms.forEach(s => {
            if (s !== "const") {
                if (1 === unknownNum) {
                    let solvedSym = rhs / polynomial[s];
                    console.log(s + " = " + String(solvedSym));
                } else {
                    // lazy implementation to random assign a number 
                    // if there is more than one unknown
                    // solve the last unknown once the rest of them are assigned
                    // with a number
                    let solvedSym = Math.floor(Math.random() * 10);
                    rhs -= (solvedSym * polynomial[s]);
                    console.log(s + " = " + String(solvedSym));
                    unknownNum -= 1;
                }
            }
        });
    }
}

// Equation solver CLI
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'EquationSolver>'
});

// Start the CLI for equation input
rl.prompt();
rl.on('line', (line) => {
    equationString = line.trim();
    parser = new EquationParser();
    try {
        polynomial = parser.parse(equationString);
        console.log(polynomial);
        EquationSolver(polynomial);
    } catch (err) {
        console.log(err);
    }  
    rl.prompt();
}).on('close', () => {
    console.log('Program Exits');
    process.exit(0);
});