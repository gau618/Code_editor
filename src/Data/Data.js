import { v4 as uuidv4 } from "uuid";

const initialData = [
  {
    id: uuidv4(),
    title: "DSA",
    files: [
      {
        id: uuidv4(),
        title: "index.cpp",
        code: `
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
                `,
        language: "cpp",
      },
      {
        id: uuidv4(),
        title: "utils.cpp",
        code: `
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(2, 3);
    cout << "Sum: " << result << endl;
    return 0;
}
                `,
        language: "cpp",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Algorithms",
    files: [
      {
        id: uuidv4(),
        title: "main.js",
        code: `
console.log("Hello, World!");

function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Alice"));
                `,
        language: "javascript",
      },
      {
        id: uuidv4(),
        title: "helper.js",
        code: `
function add(a, b) {
    return a + b;
}

console.log("Sum:", add(5, 3));

function multiply(a, b) {
    return a * b;
}

console.log("Product:", multiply(5, 3));
                `,
        language: "javascript",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Data Structures",
    files: [
      {
        id: uuidv4(),
        title: "app.java",
        code: `
public class App {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
                `,
        language: "java",
      },
      {
        id: uuidv4(),
        title: "Utils.java",
        code: `
public class Utils {
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = add(2, 3);
        System.out.println("Sum: " + result);
    }
}
                `,
        language: "java",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Dynamic Programming",
    files: [
      {
        id: uuidv4(),
        title: "script.py",
        code: `
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
                `,
        language: "python",
      },
      {
        id: uuidv4(),
        title: "math_utils.py",
        code: `
def add(a, b):
    return a + b

print("Sum:", add(5, 3))

def multiply(a, b):
    return a * b

print("Product:", multiply(5, 3))
                `,
        language: "python",
      },
    ],
  },
];

export default initialData;
