# 一、组件化、模块化的理解

模块：
- 1.理解：向外提供特定功能的js程序, 一般就是一个js文件
- 2.为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂。
- 3.作用：复用js, 简化js的编写, 提高js运行效率
组件：
- 1.理解：用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)
- 2.为什么要用组件： 一个界面的功能更复杂
- 3.作用：复用编码, 简化项目编码, 提高运行效率

# 二、函数式组件

```html
<body>
    <!-- 创建一个容器 -->
    <div id="test"></div>
    <!-- 引入核心库 -->
    <script src="../js/react.development.js"></script>
    <!-- 引入react-dom 用于支持react操作dom -->
    <script src="../js/react-dom.development.js"></script>
    <!-- 引入babel 用于将jsx转为js -->
    <script src="../js/babel.min.js"></script>
    <!-- 注意这里的类型 为babel -->
    <script type="text/babel">
        //创建函数组件 注意首字母大写
        function Mycomponent() { 
            //undefined babel编译后开启了严格模式
            console.log(this);
            
            return <h2>函数式组件</h2>
        }
        ReactDOM.render(<Mycomponent />, document.getElementById('test'))
        //执行了ReactDOM.render(<Mycomponent />, document.getElementById('test'))后发生了什么？
            //1.React解析组件标签 找到Mycomponent组件
            //2.发现组件是函数定义的 调用函数，将返回的虚拟DON转为真实DOM，呈现在页面中
    </script>

</body>
```
# 三、类的复习

```html
<body>
    <script>
        //创建一个Person类
        class Person {
            //构造器方法
            constructor(name, age) {
                //this 指向类的实例对象
                this.name = name
                this.age = age
            }
            //speak方法放到了类的原型对象上，供实例使用
            speak() {
                //通过Person实例调用speak时，speak中的this就是Person实例
                console.log(`我的名字是${this.name},我今年${this.age}岁`);
            }

        }
        //Person实例对象
        const p1 = new Person('tom', 20)
        const p2 = new Person('jack', 22)
        console.log(p1);
        console.log(p2);
        p1.speak()
        p2.speak()

        class Student extends Person {
            constructor(name, age, grade) {
                super(name, age)
                this.grade = grade
            }
            //重写父类的方法
            speak() {
                console.log(`我的名字是${this.name},我今年${this.age}岁,我的年级是${this.grade}`);
            }
            //sayHi()方法放到了Student原型对象上
            //通过Student实例调用sayHi时，sayHi中的this就是Student实例
            sayHi() {
                console.log('hello');
            }
        }
        //如果继承的类想添加自己的属性 需要重写构造器 并且调用super
        const s1 = new Student('xy', 21, '大四')
        console.log(s1);//Student {name: 'xy', age: 21, grade: '大四'}
        s1.speak()//根据原型链查找规则，使用的是Person原型对象上的方法
        s1.sayHi()

        //总结
            //1.类中的构造器不是必须的，要对实例进行一些实例化的的操作，如添加属性才写
            //2.如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须调用的
            //3.类中所定义的方法，都是放在了类的原型对象上，供实例使用
    </script>
</body>
```
总结：
- **类中的构造器不是必须的**，要对实例进行一些实例化的的操作，如添加属性才写
- 如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须调用的
- 类中所定义的方法，都是**放在了类的原型对象**上，供实例使用
# 四、类式组件
```html
<script type="text/babel">
        //创建类式组件
        class MyClassComponent extends React.Component {
            render() {
                //render放在哪里？ --- MyClassComponent原型对象上，供实例使用
                //render中的this是谁？ --- MyClassComponent的实例对象 也可称为 MyClassComponent组件实例对象 也可成为 组件对象
                
                console.log(this);//MyClassComponent {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternalFiber: FiberNode, …}
                return <h2>类定义的组件(适用于【复杂组件的定义)</h2>
            }
        }
        //渲染组件到页面
        ReactDOM.render(<MyClassComponent />, document.getElementById('test'))

        //注意事项
            //执行了ReactDOM.render()之后发生了什么
                //1.React解析组件标签，找到了MyClassComponent组件
                //2.发现组件是类定义的，随后new出来类的实例，通过该实例调用原型上的render方法
                //3.将render返回的虚拟DOM转化为真实DOM，呈现在页面中
    </script>
```
注意：
- 要继承React.Component
- **一定要写render()**
- react内部自己创建了类的实例并调用原型上的方法返回虚拟DOM转化为真实DOM渲染到页面上

