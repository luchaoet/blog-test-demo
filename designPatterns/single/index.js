const Person = (function () {
  let instance = null
  return class {
    name = null
    constructor(name) {
      if (!instance) {
        //第一次创建实例，那么需要把实例保存
        this.name = name
        instance = this
      } else {
        return instance
      }
    }
    getName() {
      return this.name
    }
  }
})()

new Person('Lucy').getName() // Lucy
new Person('Lucas').getName() // Lucy
