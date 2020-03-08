
class MyClass {
    myMethod() {
        let myVar = 'Bunny';
        console.log(myVar);
    }

    callbackMethod() {
        const fatArrowFunction = ((xVar, yVar) => {
            let myVar = 'Bubba';
            console.log(myVar);
        });

        fatArrowFunction(5, 7);
    }

    callAnonymous() {
        const anonFunction = function(x, y) {
            let myVar = 'Babushka';
            console.log(myVar);
        }

        anonFunction(5, 7);
    }
}

let myNewClass = new MyClass();
myNewClass.myMethod();
myNewClass.callbackMethod();
myNewClass.callAnonymous();
