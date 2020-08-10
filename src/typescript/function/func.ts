function add(x: number, y: number) :number {
    return x + y;
}

let myAdd: (x: number, y: number) => number = function(x: number, y: number): number { return x + y; };

let A = myAdd(3, 4);
console.log(A);