function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let stack = [];
    let out = [];
    let pos = 0;
    while (pos < expr.length) {
        let ch = '';
        let last;
        switch (expr[pos]) {
            case ' ':
                while (pos < expr.length && expr[pos] == ' ') {
                    pos++;
                }
                break;
            case '+':
            case '-':
                while (stack.length > 0 && (stack[stack.length - 1] == '*' || stack[stack.length - 1] == '/')) {
                    out.push(stack.pop());
                }
                if (stack.length > 0) {
                    last = stack[stack.length - 1];
                    if (last == '-' || last == '+') {
                        out.push(stack.pop());
                    }
                }
                stack.push(expr[pos]);
                pos++;
                break;
            case '*':
            case '/':
                last = stack[stack.length - 1];
                if (last == '/' || last == '*') {
                    out.push(stack.pop());
                }
                stack.push(expr[pos]);
                pos++;
                break;
            case ')':
                while (stack.length > 0 && stack[stack.length - 1] != '(') {
                    out.push(stack.pop());
                }
                if (stack[stack.length - 1] == '(') {
                    stack.pop();
                } else {
                    throw "ExpressionError: Brackets must be paired";
                }
                pos++;
                break;
            case '(':
                stack.push('(');
                pos++;
                break;
            default:
                while (expr.charCodeAt(pos) >= 48 && expr.charCodeAt(pos) <= 57 && pos < expr.length) {
                    ch += expr[pos]; pos++;
                }
                if (ch.length > 0) {
                    out.push(parseInt(ch));
                } else {
                    pos++;
                }
                break;
        }

    }
    if (stack.indexOf('(') >= 0) {
        throw "ExpressionError: Brackets must be paired";
    }
    out = out.concat(stack.reverse());
    console.log(out.join(' '));
    stack = [];
    for (let i = 0; i < out.length; i++) {
        if (Number.isInteger(out[i])) {
            stack.push(out[i]);
        } else {
            if (stack.length > 1) {
                let b = stack.pop();
                let a = stack.pop();
                switch (out[i]) {
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        if (b != 0) {
                            stack.push(a / b);
                        } else {
                            throw "TypeError: Division by zero.";
                        }
                        break;
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                }
            }
        }
    }
    let result = stack.pop();
    return result;

}

module.exports = {
    expressionCalculator
}