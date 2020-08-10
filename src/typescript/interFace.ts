import { close } from "fs";

// 接口初探
function test (labelObj: { label: string }) {
    console.log(labelObj.label);
}
let myObj = { label: '123' };
test(myObj);
interface labelValue {
    label: string;
}

function printLabel (lableObj: labelValue) {
    console.log(lableObj.label);
}
let mylebel = {
    label: '456',
    size: 10
}
printLabel(mylebel);

// 接口可选属性
interface liveParams {
    videoId: string,
    videoType: number,
    videoTools?: Array<number>,
}

function startLive (liveInfo: liveParams) {
    console.log(liveInfo.videoId);
}
let liveParamsObj = {
    videoId: 'kx0001',
    videoType: 2,
    videoTools: [3, 4]
}
startLive(liveParamsObj);

// 接口只读属性
// readonly vs const const针对单一变量有效，对于对象属性无效，readonly对于对象 变量 都有效；
interface pttParams {
    readonly pttId: string | number,
    readonly pttType: string | number,
    name?: string
}
function startPtt (pttInfo: pttParams) {
    console.log(pttInfo.pttId);
    if (pttInfo && pttInfo.name) {
        console.log('存在有名称的ptt');
    }
    console.log(pttInfo.name);
}
let pttInfoObj = {
    pttId: 1001,
    pttType: 2
};
startPtt(pttInfoObj);

const listArr = [1,2,3,4,5];
let readOnlyArr: ReadonlyArray<number> = [6,7,8,9,10];
// readOnlyArr.push(11);
console.log(readOnlyArr);
const listArrObj = {
    'one': 1,
    'two': 2,
    'three': 3
}
listArrObj['one'] = 2;
console.log(listArrObj);
// listArr = [2,3,4,6];  //error
listArr.push(6);
console.log(listArr);


//额外的属性检查
interface SquareConfig {
    color?: string;
    width?: number;
    // [propName: string]: any; //允许额外得参数
}
function createSquare (config: SquareConfig) {
    console.log(config.color);
}
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);

//接口定义准则：尽量保持最严格得类型检查，这样会使得项目不容易出错，像上面一样的简单代码里，你可能不应该去绕开这些检查。 对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大部额外属性检查错误是真正的bug。 就是说你遇到了额外类型检查出的错误，比如“option bags”，你应该去审查一下你的类型声明。 在这里，如果支持传入 color或colour属性到createSquare，你应该修改SquareConfig定义来体现出这一点

// 函数类型：接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
interface SearchFunc {
    (source: string, subString?: Readonly<string>) :boolean;
}
let mySearch: SearchFunc = function (source: string, subString: Readonly<string>) {
    let result = source.search(subString);
    return result> -1;
}
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子
let mySearchs: SearchFunc;
mySearchs = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}

/** 
 * @TypeScript 支持两种索引签名：字符串和数字
 * @description 可索引得类型  TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
 * @author zengya
 * @date 2020-05-13
 * @interface StringArray
 */
interface StringArray {
    [index:number]: string;
}
let myArray: StringArray;
myArray = ['BOb', 'Fred'];

let myString: string = myArray[0];
console.log(myString);
console.log()

class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
    // [x: number]: Animal;
    [x: string]: Dog;
}

interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

// 实现接口

/**
 * @description 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。
 * @author zengya
 * @date 2020-05-13
 * @interface ClockInterface
 */
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void; // 一定要加上void 不然默认隐式返回any类型
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
let clock = new Clock(1,2);
let date = new Date();
clock.setTime(date)
console.log(clock.setTime(date));

interface CarConstructor {
    new (name: string , type: number) : CarInterface;
}
interface CarInterface {
    start():void;
}
function createCar(car: CarConstructor, name: string, type: number) : CarInterface {
    return new car(name, type);
}
// 类静态部分与实例部分的区别
class Suv implements CarInterface {
    private n:string;
    constructor(n:string, t:number) {
        this.n = n;
    }
    start() {
        console.log(this.n + 'start !!')
    }
}
class coupe implements CarInterface {
    private n:string;
    constructor(n:string, t:number) {
        this.n = n;
    }
    start() {
        console.log(this.n + 'start !!')
    }
}
class sportCar {
    private n :string;
    constructor(n:string, t:number) {
        this.n = n;
    }
    public start() {
        console.log(this.n + 'start !!')
    }
}

let audi = createCar(Suv,'Q5', 0);
audi.start();
let BMW = createCar(coupe,'M3',1);
let linkco = new sportCar('Linkco', 3);
linkco.start();
BMW.start();

//继承接口 和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
    [propsName: string]: any;
}

let square = <Square> {};
square.color = "blue";
square.sideLength = 10;
square.name = 1;

// 一个接口可以继承多个接口，创建出多个接口的合成接口。

// interface Shape {
//     color: string;
// }

// interface PenStroke {
//     penWidth: number;
// }

// interface Square extends Shape, PenStroke {
//     sideLength: number;
// }

// let square = <Square>{};
// square.color = "blue";
// square.sideLength = 10;
// square.penWidth = 5.0;

// 混合类型

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 接口继承类

class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

interface Person {
    name: string;
    running (d:string):void;
}
class Man implements Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    running (place: string) {
        console.log(this.name + ' running to ' + place);
    }
}
let liujie  = new Man('liujie');
liujie.running('suzhou');