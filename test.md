## TypeScript的类型系统

TypeScript给JavaScript增加了一套静态类型系统，通过 TS Compiler 编译为 JS，编译的过程做类型检查。

它并没有改变 JavaScript 的语法，只是在 JS 的基础上添加了类型语法，所以被叫做 JavaScript 的超集。

JavaScript 的标准在不断的发展，TypeScript 的类型系统也在不断完善，因为“超集”的设计理念，这两者可以很好的融合在一起，是不会有冲突的。

静态类型编程语言都有自己的类型系统，从简单到复杂可以分为 3 类：

### 简单类型系统\n\n变量、函数、类等都可以声明类型，编译器会基于声明的类型做类型检查，类型不匹配时编译器会报错。\n\n这是最基础的类型系统，能保证类型安全，但有些死板。\n\n比如一个 `identify` 函数，我们希望这个函数传入什么值可以原封不动的返回，如果我们想要传入的类型为 `number`或者`string`的话，我们需要这样写：\n\n```\nfunction identify(x: number | string): \n  number | string {\n  return x;\n}\n\nconst res123 = identify(1);\n```\n\n如果我们还想传入`boolean`类型的话：\n\n```\nfunction identify(x: number | string | boolean): \n  number | string | boolean {\n  return x;\n}\n\nconst res123 = identify(false);\n```\n\n这样的话就会出现一个问题：每次传入一个新的类型就必须得重新修改函数的参数与返回值类型。\n\n如果类型能传参数就好了，传入`number`就会返回`number`，传入`string`就返回`string`。\n\n所以有了第二种类型系统。\n\n### 支持泛型的类型系统\n\n泛型的英文是Generic Type，译为‘通用的类型’，它可以表示任何一种类型，也可以叫**类型参数**。\n\n比如上面的例子，有了泛型之后我们可以这样写：\n\n```\nfunction identify(x: T): T {\n  return x;\n}\n\nidentify(true);\nidentify(3.1415926);\nidentify('我不是string');\n```\n\n**声明时把会变化的类型声明成泛型（也就是类型参数），在调用的时候再确定类型。**\n\n很多语言，类如Java、Dart等用的就是这种类型系统，泛型确实是一个可以很好地增加类型系统灵活性的特性。\n\n但是，这种类型系统的灵活性对于 JavaScript 来说还不够，因为 JavaScript 太过灵活了。\n\n比如，在 Java 里，对象都是由类 new 出来的，你不能凭空创建对象，但是 JavaScript 却可以，它支持对象字面量。\n\n那如果是一个返回对象某个属性值的函数，类型该怎么写呢？\n\n```\nfunction getPropValue(obj: T, key: string) {\n    return obj[key];\n}\n\nconst res = getPropValue({a: 1, b: 2}, 'a');\n```\n\n![泛型](https://pan.udolphin.com/files/image/2022/3/812c6e73b37924038d7515279133b741.png)\n\n我们可以看到类型返回值为`any`。\n\n好像拿到了`T`也拿不到它的属性值与属性值，如果我们可以对类型参数`T`做一些处理就好了。\n\n所以，有了第三种类型系统。\n\n### 支持类型编程的类型系统\n\n在 Java 里面，拿到了对象的类型就能找到它的类，进一步拿到各种信息，所以类型系统支持泛型就足够了。\n\n但是在 JavaScript 里面，对象可以字面量的方式创建，还可以灵活的增删属性，拿到对象并不能确定什么，所以要支持对传入的类型参数做进一步的处理。\n\n对传入的类型参数（泛型）做各种逻辑运算，产生新的类型，这就是类型编程。\n\n比如上面那个 getProps 的函数，类型可以这样写：\n\n```\nfunction getPropValue<T exrtends object, Key extends keyof T>(\n  obj: T, key: Key): T[Key] {\n    return obj[key];\n}\n\nconst res1 = getPropValue({a: 1, b: 2}, 'a');\n```\n\n![类型编程](https://pan.udolphin.com/files/image/2022/3/d326adb00540b1e26c7f6d4bc7cc035f.png)\n\n这里我们成功地拿到了返回值的类型！\n\n这里的 `keyof T`、`T[Key]` 就是对类型参数 `T` 的类型运算。\n\nTypeScript 的类型系统就是第三种，支持对类型参数做各种逻辑处理，可以写很复杂的类型逻辑。\n\n### 类型逻辑能有多复杂？\n\n> 类型逻辑是对类型参数的各种处理，可以实现很多强大的功能。\n\n比如这个 `ParseQueryString` 的类型：\n\n![ParseQueryString](https://pan.udolphin.com/files/image/2022/3/04f6d4a9ae4181d2b6a995fa52a50d86.png)\n\n它可以对传入的字符串的类型参数做解析，返回解析以后的结果。\n\n如果是一些只支持泛型的类型系统是不能做到这一点的。但是 TypeScript 的类型系统就可以，因为它可以对泛型（类型参数）做各种逻辑处理。\n\n只不过，这个类型的类型逻辑的代码比较多：\n\n> 下面的 `ts` 类型暂时看不懂没关系，这里只是展示一下TS类型编程的复杂度，相信大家在看完这篇文章之后也可以实现这样的复杂类型。\n\n```\ntype ParseParam = \n    Param extends `${infer Key}=${infer Value}`\n        ? {\n            [K in Key]: Value \n        } : {};\n\ntype MergeValues = \n    One extends Other \n        ? One\n        : Other extends unknown[]\n            ? [One, ...Other]\n            : [One, Other];\n\ntype MergeParams<\n    OneParam extends Record,\n    OtherParam extends Record\n> = {\n  [Key in keyof OneParam | keyof OtherParam]: \n    Key extends keyof OneParam\n        ? Key extends keyof OtherParam\n            ? MergeValues\n            : OneParam[Key]\n        : Key extends keyof OtherParam \n            ? OtherParam[Key] \n            : never\n}\n\ntype ParseQueryString = \n    Str extends `${infer Param}&${infer Rest}`\n        ? MergeParams, ParseQueryString>\n        : ParseParam;\n```\n\n对类型参数的编程是 TypeScript 类型系统最强大的部分，可以实现各种复杂的类型计算逻辑，是它的优点。但同时也被认为是它的缺点，因为除了业务逻辑外还要写很多类型逻辑。\n\n不过，我倒是觉得这种复杂度是不可避免的，因为 JS 本身足够灵活，要准确定义类型那类型系统必然也要设计的足够灵活。\n\n## TypeScript类型系统中的类型\n\n静态类型系统的目的是把类型检查从运行时提前到编译时，那 TS 类型系统中肯定要把 JS 的运行时类型拿过来，也就是 `number、boolean、string、object、bigint、symbol、undefined、null` 这些类型，还有就是它们的包装类型 `Number、Boolean、String、Object、Symbol。`\n\n引用类型方面，JS 有 class、Array，这些 TypeScript 类型系统也都支持，但是又多加了三种类型：元组（Tuple）、接口（Interface）、枚举（Enum）。\n\n### 元组\n\n`元组(Tuple)`就是元素个数和类型固定的数组类型：\n\n```\ntype Tuple = [number, string];\n```\n\n### 接口\n\n`接口(Interface)`可以描述对象、函数、构造器的结构：\n\n#### 对象\n\n```\ninterface IPerson {\n    name: string;\n    age: number;\n}\n\nclass Person implements IPerson {\n    name: string;\n    age: number;\n}\n\nconst obj: IPerson = {\n    name: 'h',\n    age: 18\n}\n```\n\n#### 函数\n\n```\ninterface SayHello {\n    (name: string): string;\n}\n\nconst func: SayHello = (name: string) => {\n    return 'hello,' + name\n}\n```\n\n#### 构造器\n\n```\ninterface PersonConstructor {\n    new (name: string, age: number): IPerson;\n}\n\nfunction createPerson(ctor: PersonConstructor): IPerson {\n    return new ctor('a', 18);\n}\n```\n\n对象类型、class 类型在 TypeScript 里也叫做索引类型，也就是索引了多个元素的类型的意思。对象可以动态添加属性，如果不知道会有什么属性，可以用可索引签名：\n\n```\ninterface IPerson {\n    [prop: string]: string | number;\n}\n\nconst obj: IPerson = {};\n\nobj.name = 'i';\nobj.age = 18;\n```\n\n总之，接口可以用来描述函数、构造器、索引类型（对象、class、数组）等复合类型。\n\n### 枚举\n\n枚举（Enum）是一系列值的复合：\n\n```\nenum Transpiler {\n    Babel = 'babel',\n    Postcss = 'postcss',\n    Terser = 'terser',\n    Prettier = 'prettier',\n    TypeScriptCompiler = 'tsc'\n}\n\nconst transpiler = Transpiler.TypeScriptCompiler;\n```\n\n此外，`TypeScript` 还支持字面量类型，也就是类似 `1111`、`'aaaa'`、`{ a: 1 }` 这种值也可以做为类型。\n\n还有四种特殊的类型：`void、never、any、unknown`：\n\n* `void` 代表空，可以是 `null` 或者 `undefined`，一般是用于函数返回值。\n* `any` 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 `never`）。\n* `unknown` 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。\n* `never` 代表不可达，比如函数抛异常的时候，返回值就是 `never`。\n\n这些就是 `TypeScript` 类型系统中的全部类型了，大部分是从 `JS` 中迁移过来的，比如基础类型、- `Array、class` 等，也添加了一些类型，比如 枚举（`enum`）、接口（`interface`）、元组等，还支持了字面量类型和 `void、never、any、unknown` 的特殊类型。\n\n### 类型的装饰\n\n`TypeScript`还支持描述类型的属性，比如是否可选，是否只读等：\n\n```\ninterface IPerson {\n    readonly name: string;\n    age?: number;\n}\n\ntype tuple = [string, number?];\n```\n\n接下来我们进入一个重点，大家以后去解包一些类型都是以下一章讲的这些Api为基础来进行的。\n\n### TypeScript 类型系统中的类型运算\n\n#### 条件类型: extends ?\n\n条件类型语法类似与JS的三元表达式：\n\n```\ntype res = 1 extends 2 ? true : false;\n\ntype isTwo = T extends 2 ? true: false;\n\ntype res1 = isTwo<1>;\ntype res2 = isTwo<2>;\n```\n\n结果  \n![res1](https://pan.udolphin.com/files/image/2022/3/f6112e41cf5d8e260602b38983bd1e39.png)\n\n![res2](https://pan.udolphin.com/files/image/2022/3/48e12f4c2457eac834cb66f14dd020a4.png)\n\n这种类型也叫**高级类型**\n\n**高级类型的特点是传入类型参数，经过运算之后返回一个新的类型。**\n\n#### 推导类型: infer\n\n推导类型的关键字为`infer`，作用类似与是声明一个局部变量，获取类型的某一部分。\n\n例，获取元组中第一个属性的类型：\n\n```\n  type First = Tuple extends [infer T, ...unknown[]] ? T : never;\n\n  type res = First<[1, 2, 3]>;\n```\n\n`res`类型为：\n\n![infer](https://pan.udolphin.com/files/image/2022/3/ecfffc0ee17d1553ba16d5682ab17f15.png)\n\n**注意**：这里的在等式左边有一个`Tuple extends unknown[]`这里的`extends`关键字并不是条件类型，条件类型是：`extends ? :`，这里的意思是约束类型参数（泛型）只能是数组类型。\n\nPS：因为不知道数组元素的具体类型，所以使用`unknown`。\n\n#### 联合类型: |\n\n联合类型（Union）类似 js 里的或运算符 |，但是作用于类型，代表类型可以是几个类型之一。\n\n```\ntype Union = 1 | 2 | 3;\n```\n\n#### 交叉类型: &\n\n交叉类型（Intersection）类似 js 中的与运算符 `&`，但是作用于类型，代表对类型做合并。\n\n```\ntype ObjType = {a: number } & {c: boolean};\n```\n\n![交叉](https://pan.udolphin.com/files/image/2022/3/89f6be00f2c47b5dd832ae4e575e553a.png)\n\n**注意**：同一类型可以合并，不同的类型没法合并，会被舍弃：\n\n![舍弃](https://pan.udolphin.com/files/image/2022/3/0c85490c2febbe40b38ba0787c94bb10.png)\n\n#### 映射类型\n\n对象、class在TypeScript对应的类型是索引类型，那么如何对索引类型修改呢？\n\n答案就是**映射类型**。\n\n```\ntype MapType = {\n  [Key in keyof T]?: T[Key]\n}\n```\n\n其中涉及到三个关键字：\n\n1. `keyof T` 是查询索引类型中所有的索引，叫做**索引查询**。\n2. `T[Key]` 是取索引类型某个索引的值，叫做**索引访问**。\n3. `in` 是用于遍历联合类型的运算符。\n\n比如我们把一个索引类型的值变成一个字符串：\n\n```\ntype MapType = {\n    [Key in keyof T]: 'hello world'\n}\n\ntype res = MapType<{a: 1, b: 2}>;\n```\n\n![](https://pan.udolphin.com/files/image/2022/3/045b8f1b097111d73ed4b9b20956ac3d.png)\n\n映射类型就相当于把一个集合映射到另一个集合，这是它名字的由来。\n\n除了值可以变化，索引也可以变化：\n\n```\ntype MapType = {\n    [\n        Key in keyof T \n            as `${Key & string} qq`\n    ]: T[Key]\n  };\n\ntype res = MapType<{'1': 1, '2': 2}>;\n```\n\n![索引映射](https://pan.udolphin.com/files/image/2022/3/3798e7d84077cae3f548ff8c53914eb4.png)\n\n我们用 as 把索引也做了修改，改成了原本的Key后加一个‘ qq’\n\n#### 小结\n\n给 JavaScript 添加静态类型系统，那肯定是能复用的就复用，所以在 TypeScript 里，基础类型和 class、Array 等复合类型都是和 JavaScript 一样的，只是又额外加了接口（interface）、枚举（enum）、元组这三种复合类型（对象类型、class 类型在 TypeScript 里叫做索引类型），还有 void、never、any、unkown 四种特殊类型，以及支持字面量做为类型。此外，TypeScript 类型系统也支持通过 readonly、？等修饰符对属性的特性做进一步的描述。\n\n此外，TypeScript 支持对类型做运算，这是它的类型系统的强大之处，也是复杂之处。\n\nTypeScript 支持条件、推导、联合、交叉等运算逻辑，还有对联合类型做映射。\n\n这些逻辑是针对类型参数，也就是泛型（类型参数）来说的，传入类型参数，经过一系列类型运算逻辑后，返回新的类型的类型就叫做高级类型，如果是静态的值，直接算出结果即可，没必要写类型逻辑。\n\n这些语法看起来没有多复杂，但是他们却可以实现很多复杂逻辑，就像 JS 的语法也不复杂，却可以实现很多复杂逻辑一样。\n\n后面我们会大量用到这些类型编程语法来实现各种复杂的类型逻辑。\n\n## 编写类型技巧\n\n> TypeScript 类型编程的代码看起来比较复杂，但其实这些逻辑用 JS 大家都会写，之所以到了类型体操就不会了，那是因为还不熟悉一些套路。  \n> 所以，这节开始我们就来学习一些类型编程的套路，熟悉这些套路之后，各种类型体操逻辑就能够很顺畅的写出来。\n\n首先，我们来学习类型编程的第一个套路：  \n模式匹配。\n\n### 模式匹配\n\n我们知道，字符串可以和正则做模式匹配，找到匹配的部分，提取子组，之后可以用 1,1,2 等引用匹配的子组。\n\nTypescript 的类型也同样可以做模式匹配。\n\n比如这样一个 Promise 类型：\n\n```\ntype p = Promise<'haha'>;\n```\n\n我们想提取 value 的类型，可以这样做：\n\n```\ntype GetValueType = P extends Promise ? Value : never;\n```\n\n通过 extends 对传入的类型参数 P 做模式匹配，其中值的类型是需要提取的，通过 infer 声明一个局部变量 Value 来保存，如果匹配，就返回匹配到的 Value，否则就返回 never 代表没匹配到。\n\n![GetValueType](https://pan.udolphin.com/files/image/2022/3/a7e2782c61ff0db18c9782f034f9c1ee.png)\n\n这就是 Typescript 类型的模式匹配：\n\nTypescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。\n\n这个模式匹配的套路有多有用呢？我们来看下在数组、函数等类型里的应用。\n\n#### 数组\n\n##### Last\n\n前几章我们介绍了获取数组第一个元素的First，既然可以提取第一个元素，当然也可以提取最后一个元素，修改下模式类型就行：\n\n```\ntype arr = [1,2,3]\n\ntype Last = T extends [...unknown[], infer U] ? U : never;\n\ntype Ans = Last;\n```\n\n![last](https://pan.udolphin.com/files/image/2022/3/b41afc9496f5ec4ab3883fec1db4f417.png)\n\n#### 函数\n\n##### GetParameters\n\n类型参数 Func 是要匹配的函数类型，通过 extends 约束为 Function。\n\nFunc 和模式类型做匹配，参数类型放到用 infer 声明的局部变量 T 里，返回值可以是任何类型。\n\n返回提取到的参数类型 AnsFunc\n\n```\ntype GetParameters = Func extends (...args: infer T)=> any ? T : never;\n\ntype AnsFunc = GetParameters<(a: number, b: string) => void>; \n```\n\n![GetParameters](https://pan.udolphin.com/files/image/2022/3/34a53710fce426f65b34ff359dc011c5.png)\n\n##### GetReturnType\n\n能提取参数类型，同样也可以提取返回值类型：\n\n```\ntype GetReturnType = \n    Func extends (...args: any[]) => infer ReturnType \n        ? ReturnType : never;\n\ntype AnsRT = GetReturnType<(a: number, b: string) => number | string>;\n```\n\n`Func` 和模式类型做匹配，提取返回值到通过 `infer` 声明的局部变量 `ReturnType` 里返回。\n\n参数类型可以是任意类型，也就是 `any[]`（注意，这里不能用 `unknown`，因为参数类型是要赋值给别的类型的，而 `unknown` 只能用来接收类型，所以用 `any`）。\n\n![GetReturnType](https://pan.udolphin.com/files/image/2022/3/e3852b2be702cd445dee61395579f6cf.png)\n\n### 重新构造\n\n类型编程主要的目的就是对类型做各种转换，那么如何对类型做修改呢？\n\n`TypeScript` 类型系统支持 3 种可以声明任意类型的变量： type、infer、类型参数。\n\ntype 叫做类型别名，其实就是声明一个变量存储某个类型：\n\n```\ntype ttt = Promise;\n```\n\ninfer 用于类型的提取，然后存到一个变量里，相当于局部变量：\n\n```\ntype GetValueType = P extends Promise ? Value : never;\n```\n\n类型参数用于接受具体的类型，在类型运算中也相当于局部变量：\n\n```\ntype isTwo = T extends 2 ? true: false;\n```\n\n但是，严格来说这三种也都不叫变量，因为它们不能被重新赋值。\n\nTypeScript 设计可以做类型编程的类型系统的目的就是为了产生各种复杂的类型，那不能修改怎么产生新类型呢？\n\n答案是重新构造。\n\n#### 数组\n\n##### Push\n\n有这样一个元组类型：\n\n```\ntype tuple = [1,2,3];\n```\n\n我想给这个元组类型再添加一些类型，怎么做呢？\n\nTypeScript 类型变量不支持修改，我们可以构造一个新的元组类型：\n\n```\ntype Push = [...Arr, Ele];\n```\n\n类型参数 `Arr` 是要修改的数组/元组类型，元素的类型任意，也就是 `unknown`。\n\n类型参数 `Ele` 是添加的元素的类型。\n\n返回的是用 `Arr` 已有的元素加上 `Ele` 构造的新的元组类型。\n\n![Push](https://pan.udolphin.com/files/image/2022/3/9846d9e49553d5e3a310dd45d535f29a.png)\n\n#### 字符串\n\n##### CapitalizeStr\n\n我们想把一个字符串字面量类型的 `'hello'` 转为首字母大写的 'Hello'。\n\n需要用到字符串类型的提取和重新构造：\n\n```\ntype CapitalizeStr = \n    Str extends `${infer First}${infer Rest}` \n        ? `${Uppercase}${Rest}` : Str;\n\ntype AnsStr = CapitalizeStr<'hello'>;\n```\n\n我们声明了类型参数 Str 是要处理的字符串类型，通过 extends 约束为 string。\n\n通过 infer 提取出首个字符到局部变量 First，提取后面的字符到局部变量 Rest。\n\n然后使用 TypeScript 提供的内置高级类型 Uppercase 把首字母转为大写，加上 Rest，构造成新的字符串类型返回。\n\n![CapitalizeStr](https://pan.udolphin.com/files/image/2022/3/9be59b5f134ab564eca5dd1ff7085c1a.png)\n\n### 特性\n\nTypeScript 类型系统中有些类型比较特殊，比如 any、never、联合类型，比如 class 有 public、protected、private 的属性，比如索引类型有具体的索引和可索引签名，索引还有可选和非可选。。。\n\n如果给我们一种类型让我们判断是什么类型，应该怎么做呢？\n\n#### IsAny\n\n如何判断一个类型是 `any` 类型呢？要根据它的特性来：\n\n`any` 类型与除`never`之外的任何类型的交叉都是 `any`，也就是 `1 & any` 结果是 `any`。\n\n所以，可以这样写：\n\n```\ntype IsAny = 'T' extends ('S' & T) ? true : false\n```\n\n这里的 `'T'` 和 `'S'` 可以换成任意类型。\n\n当传入 `any` 时：  \n![](https://pan.udolphin.com/files/image/2022/3/892e06644df96bd886d7df8eb09626f6.png)\n\n当传入其他类型时：  \n![](https://pan.udolphin.com/files/image/2022/3/a87849bcccfef24c1df38c71bd08c230.png)\n\n#### IsNever\n\n`never` 在条件类型中也比较特殊，如果条件类型左边是类型参数，并且传入的是 `never`，那么直接返回 `never`：\n\n```\ntype TestNever = T extends never ? true : false;\n```\n\n当 `T` 为 `never` 时：\n\n![TestNever](https://pan.udolphin.com/files/image/2022/3/6a385b3980c4a8479eb27b13ab2e3594.png)\n\n所以，要判断 `never` 类型，就不能直接 `T extends never`，可以这样写：\n\n```\ntype IsNever = [T] extends [never] ? true : false\n```\n\n这样就能正常判断 never 类型了：\n\n![isNever](https://pan.udolphin.com/files/image/2022/3/5d0eca65dfeba3b9aec33a9932f56235.png)\n\n#### GetOptional\n\n如何提取索引类型中的可选索引呢？\n\n这也要利用可选索引的特性：可选索引的值为 `undefined` 和值类型的联合类型。\n\n过滤可选索引，就要构造一个新的索引类型，过程中做过滤：\n\n```\ntype GetOptional> = {\n    [\n        Key in keyof Obj \n            as {} extends Pick ? Key : never\n    ] : Obj[Key];\n}\n\ntype res = GetOptional<{a?: 1, b: 2}>;\n```\n\n类型参数 `Obj` 为待处理的索引类型，类型约束为索引为 `string`、值为任意类型的索引类型 `Record<string, any>`。\n\n用映射类型的语法重新构造索引类型，索引是之前的索引也就是 `Key in keyof Obj`，但要做一些过滤，也就是 `as` 之后的部分。\n\n过滤的方式就是单独取出该索引之后，判断空对象是否是其子类型。\n\n这里的 `Pick` 是 `ts` 提供的内置高级类型，就是取出某个 Key 构造新的索引类型：\n\n```\ntype Pick<T, K extends keyof T> = { [P in K]: T[P]; }\n```\n\n因为 `a` 可能为 `undefined`，也就是索引类型可能是 `{}`，所以 `{} extends Pick<Obj, Key>` 就能过滤出可选索引。（可选的意思就是有或者没有，没有的时候就是空的索引类型）\n\n值的类型依然是之前的，也就是 `Obj[Key]`。\n\n这样，就能过滤出所有可选索引，构造成新的索引类型：\n\n![GetOptional](https://pan.udolphin.com/files/image/2022/3/10d144f3d6719da2705d87250db2e55f.png)\n\n## TypeScript内置高级类型\n\n### Parameters\n\nParameters 用于提取函数类型的参数类型。\n\n源码是这样的：\n\n```\ntype Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;\n```\n\n类型参数 T 为待处理的类型，通过 extends 约束为函数，参数和返回值任意。\n\n通过 extends 匹配一个模式类型，提取参数的类型到 infer 声明的局部变量 P 中返回。\n\n这样就实现了函数参数类型的提取：\n\n![Parameters](https://pan.udolphin.com/files/image/2022/3/9b8a6a671a491c4734bfb412b9c391d5.png)\n\n### ReturnType\n\nReturnType 用于提取函数类型的返回值类型。\n\n源码是这样的：\n\n```\ntype ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\n```\n\n类型参数 T 为待处理的类型，通过 extends 约束为函数类型，参数和返回值任意。\n\n用 T 匹配一个模式类型，提取返回值的类型到 infer 声明的局部变量 R 里返回。\n\n这样就实现了函数返回值类型的提取：\n\n![ReturnType](https://pan.udolphin.com/files/image/2022/3/4450db68c428e9aad9854fae25d520d9.png)\n\n### ConstructorParameters\n\n构造器类型和函数类型的区别就是可以被 new。\n\n`Parameters` 用于提取函数参数的类型，而 `ConstructorParameters` 用于提取构造器参数的类型。\n\n源码是这样的：\n\n```\ntype ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;\n```\n\n类型参数 `T` 是待处理的类型，通过 `extends` 约束为构造器类型，加个 `abstract` 代表不能直接被实例化（其实不加也行）。\n\n用 `T` 匹配一个模式类型，提取参数的部分到 `infer` 声明的局部变量 `P` 里，返回 `P`。\n\n这样就实现了构造器参数类型的提取：\n\n![ConstructorParameters](https://pan.udolphin.com/files/image/2022/3/e933b2381b696b710fa03cb783424fd6.png)\n\n### Partial\n\n索引类型可以通过映射类型的语法做修改，比如把索引变为可选。\n\n```\ntype Partial<T> = {\n    [P in keyof T]?: T[P];\n};\n```\n\n类型参数 T 为待处理的类型。\n\n通过映射类型的语法构造一个新的索引类型返回，索引 P 是来源于之前的 T 类型的索引，也就是 P in keyof T，索引值的类型也是之前的，也就是 T\\[P\\]。\n\n这样就实现了把索引类型的索引变为可选的效果：\n\n![Partial](https://pan.udolphin.com/files/image/2022/3/0809d138e65052ce8fc26659f4483094.png)\n\n### Required\n\n可以把索引变为可选，也同样可以去掉可选，也就是 `Required` 类型：\n\n```\ntype Required<T> = {\n    [P in keyof T]-?: T[P];\n};\n```\n\n类型参数 `T` 为待处理的类型。\n\n通过映射类型的语法构造一个新的索引类型，索引取自之前的索引，也就是 `P in keyof T`，但是要去掉可选，也就是 `-?`，值的类型也是之前的，就是 T\\[P\\]。\n\n这样就实现了去掉可选修饰的目的：\n\n![Required](https://pan.udolphin.com/files/image/2022/3/cc07e236c4add12a403527a6c3d5e4d3.png)\n\n### Readonly\n\n同样的方式，也可以添加 readonly 的修饰：\n\n```\ntype Readonly<T> = {\n    readonly [P in keyof T]: T[P];\n};\n```\n\n类型参数 T 为待处理的类型。\n\n通过映射类型的语法构造一个新的索引类型返回，索引和值的类型都是之前的，也就是 P in keyof T 和 T\\[P\\]，但是要加上 readonly 的修饰。\n\n这样就实现了加上 readonly 的目的：\n\n![Readonly](https://pan.udolphin.com/files/image/2022/3/5868eec3a1b22b6bf53808054fe86502.png)\n\n## 总结\n\n虽然很多常用的高级类型TS已经内置了，但是从我个人的角度来说并不建议去死记硬背，因为掌握了TS类型编程套路的我们有很多内置类型都是可以自己去很快实现的，我们还是需要将重点放到提高类型运算中说到的Api的使用熟练度上来。\n\n在这里也给大家推荐一个很好用的练习网站：\n\n[https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)