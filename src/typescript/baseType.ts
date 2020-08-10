// 基础声明

let isDone: boolean = false;
let sum: number = 0;
let username: string = "bob";
let list:number[] = [1, 2, 3];
let typeList: Array<number> = [4, 5, 6];
let Tuple: [string, number] = ['123', 1];
let actions = function () {
    let a = 0;
    return () => {
        console.log(a);
        return a;
    }
};
console.log(actions()());
const obj = {
    name: 'zengya',
    age: 25,
    phone: '18262283940'
};
obj.name = 'yangfan';
// 枚举
enum messagerType {
    text = 1,
    img = 2,
    file = 3,
    video = 5,
    audio = 8
}
enum userType {
    normal,
    vip,
    svip,
    admin
}
// 类型断言
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

let strsLength: number = (someValue as string).length;
console.log(obj);
console.log('Tuple',Tuple);
console.log('typeList', typeList);
console.log('messagerType', messagerType);
console.log(messagerType[2]);
console.log(messagerType.audio);
console.log(userType);
let a = {
    1: 'normal',
    2: 'vip',
    3: 'svip',
    4: 'admin',
    normal: 1,
    vip: 2,
    svip: 3,
    admin: 4
};
console.log('a', a);
console.log(a[2]);
console.log(a.admin);