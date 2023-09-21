// a code that calculates the a quadratic eqn 




// solving for a quad with all values
function solveQuad(a, b, c) {
    const a = a;
    const b = b;
    const b2 = b * b;
    const c = c;

    let ac = 4 * a * c;
    let rootSec = Math.sqrt(b2 - ac);

    let positiveTop = -b + rootSec;
    let negativeTop = -b - rootSec;

    let positiveX = positiveTop / 2 * a;
    let negativeX = negativeTop / 2 * a;

    return (`when x is positive x = ${positiveX} and when x is negative x = ${negativeX}`);
}