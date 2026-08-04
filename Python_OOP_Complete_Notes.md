# Python OOP — Complete Senior Developer Notes
### VARSHINI 🧑‍💻

---

## 0. Before OOP — Why does OOP even exist?

**Problem without OOP (Procedural style):**
```python
name1 = "Ravi"
salary1 = 30000

name2 = "Sita"
salary2 = 40000

def show_details(name, salary):
    print(name, salary)

show_details(name1, salary1)
show_details(name2, salary2)
```
**Problem:** Data (`name`, `salary`) and behavior (`show_details`) are **separate**. As the number of employees grows, you'll have `name1, name2, name3...` — this doesn't scale, and there's no way to bundle data + behavior together, protect data, or reuse code cleanly.

**Solution → OOP (Object Oriented Programming):** Bundle **data (attributes)** + **behavior (methods)** into one unit called a **class**, and create **objects** from it.

> **Definition:** OOP is a programming paradigm based on the concept of "objects", which contain data (attributes/properties) and code (methods/functions) together.

---

## 1. Class and Object

### What
- **Class** = blueprint/template (like a house map/plan). No memory is used just by defining a class.
- **Object** = actual instance created from the class (the real house built from the map). Memory IS allocated when an object is created.

### Why
To model real-world entities (Employee, Car, BankAccount) as a single unit with properties + actions.

### Where
Every real backend/frontend system — Django models, Flask apps, ML pipelines (scikit-learn estimators are classes), game dev, GUI apps — everything is built on classes.

### How to write

```python
# Step 1: Define class using 'class' keyword
class Employee:
    # Step 2: Constructor - runs automatically when object is created
    def __init__(self, name, salary):
        self.name = name        # instance attribute
        self.salary = salary    # instance attribute

    # Step 3: Method (function inside class)
    def show_details(self):
        print(f"Name: {self.name}, Salary: {self.salary}")

# Step 4: Create objects (instances)
emp1 = Employee("Ravi", 30000)
emp2 = Employee("Sita", 40000)

# Step 5: Call methods on objects
emp1.show_details()
emp2.show_details()
```

### Line-by-line execution (this is how Python actually runs it)

| Step | Line | What Python does internally |
|---|---|---|
| 1 | `class Employee:` | Python creates a class object `Employee` in memory (a blueprint, stored in memory once). |
| 2 | `emp1 = Employee("Ravi", 30000)` | Python calls `Employee.__new__()` → creates empty object → calls `__init__(self, "Ravi", 30000)` automatically. `self` = `emp1` itself. |
| 3 | `self.name = name` | Sets `emp1.name = "Ravi"` inside that object's own memory space (its `__dict__`). |
| 4 | `self.salary = salary` | Sets `emp1.salary = 30000`. |
| 5 | `emp2 = Employee("Sita", 40000)` | A **new**, separate object is created in a **different memory location**, with its own `name` and `salary`. |
| 6 | `emp1.show_details()` | Python internally converts this to `Employee.show_details(emp1)` → `self` becomes `emp1`. |

### Output
```
Name: Ravi, Salary: 30000
Name: Sita, Salary: 40000
```

### Advantages
- Groups related data + behavior together
- Reusable — create as many objects as needed from one class
- Real-world modeling is intuitive

### Disadvantages
- Slight overhead vs plain functions/dicts (extra memory per object)
- Overusing classes for tiny simple scripts = unnecessary complexity

### Memory trick
🏠 **Class = House Map (Blueprint)**, 🏠🏠 **Object = Actual Houses built from that map**. Map exists once. Houses can be many, each with its own furniture (attribute values).

---

## 2. `self` keyword

### What
`self` refers to **the current object** calling the method. It is NOT a Python keyword — it's just a convention (you could name it anything, but never do that).

### Why
Without `self`, a method has no way to know *which* object's data to work with.

### How
```python
class Demo:
    def __init__(self, x):
        self.x = x   # 'this object's x' = value passed

    def show(self):
        print(self.x)   # refers to the calling object's x

d1 = Demo(10)
d2 = Demo(20)
d1.show()   # self = d1 → prints 10
d2.show()   # self = d2 → prints 20
```
**Output:**
```
10
20
```

### Memory trick
`self` = **"myself"**. Every method silently gets `self` as its first hidden argument = "the object I belong to".

---

## 3. Constructor `__init__`

### What
Special "dunder" (double underscore) method that runs **automatically** the moment an object is created. Used to initialize attributes.

### Why
So you don't have to manually call a setup method every time — Python does it for you.

### Types of constructors

**a) Default constructor** (no args, Python provides silently if you don't define `__init__`)
```python
class A:
    pass
a = A()   # works fine, no attributes set
```

**b) Parameterized constructor**
```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
```

**c) Constructor with default values**
```python
class Employee:
    def __init__(self, name, salary=15000):
        self.name = name
        self.salary = salary

e = Employee("Amit")   # salary auto = 15000
print(e.name, e.salary)
```
**Output:** `Amit 15000`

### Advantage
Auto-initialization, no missed setup, supports default values.

### Disadvantage
Only ONE `__init__` allowed per class (Python doesn't support constructor overloading like Java/C++) — you simulate it using default args or `*args`/`**kwargs`.

### Memory trick
`__init__` = **"initialize"** = runs the moment the object is *born*.

---

## 4. Instance Variables vs Class Variables

### What
| Type | Belongs to | Defined | Shared? |
|---|---|---|---|
| Instance variable | Each object separately | Inside `__init__` using `self.var` | NOT shared — each object has its own copy |
| Class variable | The class itself | Directly inside class body | SHARED by all objects |

### Why
Class variables are used for data common to ALL objects (e.g., company name, total count of objects, tax rate). Instance variables are for data unique to each object (name, salary).

### Code
```python
class Employee:
    company = "TCS"          # class variable (shared)
    total_employees = 0      # class variable (counter)

    def __init__(self, name, salary):
        self.name = name       # instance variable
        self.salary = salary   # instance variable
        Employee.total_employees += 1   # modifying class variable

e1 = Employee("Ravi", 30000)
e2 = Employee("Sita", 40000)

print(e1.company, e2.company)          # both share same class var
print(e1.name, e2.name)                # different instance vars
print("Total Employees:", Employee.total_employees)
```

### Line-by-line execution
1. `Employee.company = "TCS"` → stored ONCE in the class's own memory (`Employee.__dict__`), not in objects.
2. `e1 = Employee(...)` → `__init__` runs → `e1.name`, `e1.salary` created in `e1`'s own memory. `Employee.total_employees` incremented from 0 → 1 (this modifies the CLASS variable, visible to all objects).
3. `e2 = Employee(...)` → same thing → `total_employees` becomes 2.
4. `e1.company` → Python looks in `e1`'s own `__dict__` first (not found) → then looks in `Employee`'s `__dict__` (found) → returns `"TCS"`.

### Output
```
TCS TCS
Ravi Sita
Total Employees: 2
```

### ⚠️ Common mistake (interview favorite!)
```python
e1.company = "Infosys"   # This does NOT change class variable!
print(e1.company)         # Infosys  (creates NEW instance variable in e1 only)
print(e2.company)         # TCS      (unaffected)
```
Because `e1.company = "Infosys"` creates a brand-new **instance variable** on `e1` that *shadows* (hides) the class variable — it does not modify the shared class variable.

### Memory trick
🏢 Class variable = **Company Notice Board** (one board, everyone reads same thing).
🎒 Instance variable = **Each employee's own bag** (personal, separate).

---

## 5. Types of Methods: Instance / Class / Static

### Comparison table

| Method Type | Decorator | First param | Access instance data? | Access class data? | When to use |
|---|---|---|---|---|---|
| Instance method | none | `self` | ✅ Yes | ✅ Yes (via self.__class__ or ClassName) | Default — most common, works with object data |
| Class method | `@classmethod` | `cls` | ❌ No | ✅ Yes | Factory methods, modifying class-level state |
| Static method | `@staticmethod` | none | ❌ No | ❌ No | Utility/helper functions logically related to class but not needing object/class data |

### Code — all three together
```python
class Employee:
    company = "TCS"

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    # 1. Instance method
    def show(self):
        print(f"{self.name} works at {Employee.company}")

    # 2. Class method
    @classmethod
    def change_company(cls, new_name):
        cls.company = new_name    # changes for ALL objects

    # 3. Static method
    @staticmethod
    def is_valid_salary(salary):
        return salary > 0

e1 = Employee("Ravi", 30000)
e1.show()

Employee.change_company("Infosys")
e1.show()

print(Employee.is_valid_salary(30000))
print(Employee.is_valid_salary(-500))
```

### Output
```
Ravi works at TCS
Ravi works at Infosys
True
False
```

### Where to use in real projects
- **Class method** → Used as **factory methods**. E.g., `Employee.from_string("Ravi-30000")` that parses a string and returns an object.
```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    @classmethod
    def from_string(cls, data_str):
        name, salary = data_str.split("-")
        return cls(name, int(salary))   # returns a new Employee object

e = Employee.from_string("Amit-25000")
print(e.name, e.salary)   # Amit 25000
```
- **Static method** → Used for validation/utility logic. E.g., `Math.is_prime()`, date formatters, unit converters.

### Advantage / Disadvantage
- Instance methods: most flexible, but need an object to call.
- Class methods: great for factories, but can't touch instance-specific data.
- Static methods: fully independent, clean, but if you need class/object data later, you must refactor.

### Memory trick
- `self` → **"my own data"**
- `cls` → **"class-wide data"**
- static → **"no data needed, just a helper tool sitting inside the class toolbox"**

---

## 6. The 4 Pillars of OOP (core interview topic)

```
        OOP
   ┌────┼────┬─────────┬───────────┐
   │    │    │         │           │
Encapsulation Inheritance Polymorphism Abstraction
```

---

### 6.1 Encapsulation

### What
Wrapping data (variables) and methods together, and **restricting direct access** to some of an object's components (data hiding).

### Why
Prevent accidental/unauthorized modification of sensitive data (e.g., bank balance shouldn't be changed directly from outside).

### Where
Banking systems, authentication systems (password fields), any class with sensitive internal state.

### How — Access modifiers in Python (convention-based, not enforced like Java)

| Modifier | Syntax | Access |
|---|---|---|
| Public | `self.name` | Accessible from anywhere |
| Protected | `self._name` | Convention: "internal use only", but still accessible (soft warning) |
| Private | `self.__name` | Name-mangled — cannot be accessed directly from outside |

### Code
```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner            # public
        self._acc_type = "Savings"    # protected (convention)
        self.__balance = balance      # private (name-mangled)

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited {amount}. New balance: {self.__balance}")
        else:
            print("Invalid deposit amount")

    def get_balance(self):
        return self.__balance    # controlled access via method (getter)

acc = BankAccount("Ravi", 5000)

print(acc.owner)          # OK — public
acc.deposit(1000)         # controlled modification
print(acc.get_balance())  # controlled read

# print(acc.__balance)    # ❌ AttributeError! Cannot access directly
print(acc._BankAccount__balance)  # ⚠️ still technically accessible (Python has NO true private)
```

### Line-by-line execution
1. `acc = BankAccount("Ravi", 5000)` → `__init__` runs → `self.__balance` gets **name-mangled internally** to `_BankAccount__balance` (Python renames it behind the scenes to prevent accidental access, not true security).
2. `acc.deposit(1000)` → modifies the private variable **only through the class's own method** — this is the whole point of encapsulation: controlled access.
3. `acc.__balance` from outside → Python looks for literal attribute `__balance` on the object → not found (it was renamed) → `AttributeError`.

### Output
```
Ravi
Deposited 1000. New balance: 6000
6000
5000  (only if you try acc._BankAccount__balance — not recommended, shown for understanding only)
```

### Advantages
- Protects data integrity
- Controlled access via getters/setters
- Easier to change internal implementation without breaking external code

### Disadvantages
- Python's privacy is NOT truly enforced (only name-mangled) — anyone can bypass it if they know the trick
- Overusing getters/setters for everything adds boilerplate (use `@property` instead — see below)

### Better approach: `@property` (Pythonic encapsulation)
```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance

    @property
    def balance(self):          # getter
        return self.__balance

    @balance.setter
    def balance(self, value):   # setter with validation
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self.__balance = value

acc = BankAccount(5000)
print(acc.balance)     # calls getter — looks like normal attribute access!
acc.balance = 8000     # calls setter
print(acc.balance)
# acc.balance = -100   # ❌ raises ValueError
```
**Output:**
```
5000
8000
```
**This is the industry-standard, cleanest way to do encapsulation in Python.**

### Memory trick
🏦 Encapsulation = **ATM machine**. You can't reach into the bank's vault (private data) directly — you must use the ATM buttons (public methods) which validate everything first.

---

### 6.2 Inheritance

### What
A class (**child/derived/subclass**) acquires properties and methods of another class (**parent/base/superclass**).

### Why
**Code reusability** — avoid rewriting the same code again for related classes.

### Where
UI component hierarchies, Django model inheritance, exception class hierarchies (`class MyError(Exception)`), game character systems.

### Types of Inheritance (with diagrams + code)

**a) Single Inheritance**
```
Parent → Child
```
```python
class Animal:
    def eat(self):
        print("This animal eats food")

class Dog(Animal):        # Dog inherits from Animal
    def bark(self):
        print("Dog barks")

d = Dog()
d.eat()    # inherited from Animal
d.bark()   # own method
```
**Output:**
```
This animal eats food
Dog barks
```

**b) Multilevel Inheritance**
```
Grandparent → Parent → Child
```
```python
class Animal:
    def eat(self):
        print("Eats food")

class Dog(Animal):
    def bark(self):
        print("Barks")

class Puppy(Dog):
    def weep(self):
        print("Weeps")

p = Puppy()
p.eat()   # from Animal (grandparent)
p.bark()  # from Dog (parent)
p.weep()  # own
```
**Output:**
```
Eats food
Barks
Weeps
```

**c) Hierarchical Inheritance**
```
        Animal
        /    \
      Dog    Cat
```
```python
class Animal:
    def eat(self):
        print("Eats food")

class Dog(Animal):
    def bark(self):
        print("Dog barks")

class Cat(Animal):
    def meow(self):
        print("Cat meows")

Dog().bark(); Cat().meow()
```

**d) Multiple Inheritance**
```
Father    Mother
    \      /
      Child
```
```python
class Father:
    def skills(self):
        print("Gardening")

class Mother:
    def skills(self):
        print("Cooking")

class Child(Father, Mother):   # inherits from BOTH
    pass

c = Child()
c.skills()   # Which one runs? → MRO decides (see below)
```
**Output:** `Gardening` (Father's method wins — because of **MRO**, explained next)

### MRO (Method Resolution Order) — how Python decides which parent's method to use
```python
print(Child.__mro__)
```
**Output:**
```
(<class 'Child'>, <class 'Father'>, <class 'Mother'>, <class 'object'>)
```
Python uses the **C3 Linearization algorithm** — searches left to right, in the order you wrote the parent classes in `class Child(Father, Mother):`.

### `super()` — calling the parent's method
```python
class Animal:
    def __init__(self, name):
        self.name = name
        print("Animal constructor called")

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)     # calls Animal's __init__
        self.breed = breed
        print("Dog constructor called")

d = Dog("Tommy", "Labrador")
print(d.name, d.breed)
```
### Line-by-line execution
1. `Dog("Tommy", "Labrador")` → Python calls `Dog.__init__(self, "Tommy", "Labrador")`.
2. `super().__init__(name)` → this looks up the MRO, finds `Animal.__init__`, and calls it with `self` = same object, `name="Tommy"` → sets `self.name = "Tommy"`, prints `"Animal constructor called"`.
3. Back in `Dog.__init__`, `self.breed = "Labrador"` is set, prints `"Dog constructor called"`.

### Output
```
Animal constructor called
Dog constructor called
Tommy Labrador
```

### Advantages
- Massive code reuse
- Natural real-world hierarchy modeling
- Easy to extend behavior

### Disadvantages
- Multiple inheritance can get confusing (the "Diamond Problem") — MRO solves it but adds mental overhead
- Tight coupling between parent and child — changing parent can break child
- Deep inheritance chains (5+ levels) become hard to debug — prefer **composition** in such cases

### Memory trick
👨‍👩‍👧 Inheritance = **DNA from parents**. Child automatically gets parent's traits (methods) but can also have its own unique traits (extra methods), and can override inherited traits too.

---

### 6.3 Polymorphism

### What
"Poly" = many, "morph" = forms → **same method name behaves differently** depending on the object/context.

### Why
Write generic code that works across different object types without knowing their exact class in advance.

### Where
`len()` works on strings, lists, dicts differently. Django's `.save()` works differently per model. Payment gateway `process_payment()` differing per payment type (CreditCard, UPI, PayPal).

### a) Method Overriding (runtime polymorphism)
```python
class Shape:
    def area(self):
        print("Area not defined")

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):                    # overrides parent's method
        print(f"Circle area: {3.14 * self.r ** 2}")

class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):                    # overrides parent's method
        print(f"Square area: {self.side ** 2}")

shapes = [Circle(5), Square(4)]
for s in shapes:
    s.area()     # same method call, different behavior per object!
```
### Line-by-line execution
1. `shapes = [Circle(5), Square(4)]` → list holds two DIFFERENT object types.
2. `for s in shapes: s.area()` → Python does **dynamic method lookup at runtime** — checks the actual object's class (`Circle` or `Square`), NOT the loop variable's "declared type" (Python has no static types) — this is the essence of polymorphism.

### Output
```
Circle area: 78.5
Square area: 16
```

### b) Duck Typing (Python-special polymorphism — "if it walks like a duck...")
```python
class Duck:
    def sound(self):
        print("Quack")

class Dog:
    def sound(self):
        print("Bark")

def make_it_speak(animal):
    animal.sound()   # doesn't check type, just calls the method

make_it_speak(Duck())
make_it_speak(Dog())
```
**Output:**
```
Quack
Bark
```
Python doesn't care about the object's class — **if it has the method, it works**. This is unique to dynamically typed languages.

### c) Operator Overloading (using dunder methods)
```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):        # overloads '+' operator
        return Point(self.x + other.x, self.y + other.y)

    def __str__(self):               # overloads print()/str()
        return f"Point({self.x}, {self.y})"

p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2       # internally calls p1.__add__(p2)
print(p3)           # internally calls p3.__str__()
```
**Output:** `Point(4, 6)`

### Advantages
- Cleaner, generic, reusable code
- Extend systems without modifying existing code (Open/Closed Principle)

### Disadvantages
- Overriding without care can silently break parent's expected behavior
- Debugging polymorphic code is harder — "which method actually ran?" needs tracing

### Memory trick
🎭 Polymorphism = **One remote control button "Power"** — works differently on TV vs AC vs Fan, same button, different result depending on which device (object) you press it on.

---

### 6.4 Abstraction

### What
Hiding **implementation details**, showing only **essential features**. Achieved in Python using the `abc` module (Abstract Base Classes).

### Why
Force child classes to implement certain methods (a "contract"), and hide "how" — user only sees "what".

### Where
Payment gateway interfaces (`process()` must be implemented by every payment method), plugin/driver systems, template method patterns.

### Code
```python
from abc import ABC, abstractmethod

class Payment(ABC):              # Abstract class - cannot be instantiated directly
    @abstractmethod
    def process(self, amount):   # abstract method - MUST be implemented by child
        pass

    def receipt(self):           # normal concrete method - inherited as-is
        print("Generating receipt...")

class CreditCardPayment(Payment):
    def process(self, amount):
        print(f"Processing ₹{amount} via Credit Card")

class UpiPayment(Payment):
    def process(self, amount):
        print(f"Processing ₹{amount} via UPI")

# p = Payment()   # ❌ TypeError: Can't instantiate abstract class

payments = [CreditCardPayment(), UpiPayment()]
for p in payments:
    p.process(500)
    p.receipt()
```

### Line-by-line execution
1. `class Payment(ABC):` → inheriting from `ABC` marks this class as abstract.
2. `@abstractmethod` on `process` → Python's `ABCMeta` metaclass tracks this method as "required" — any subclass that doesn't override it also becomes abstract (can't be instantiated).
3. `Payment()` directly → Python checks `__abstractmethods__` set is non-empty → raises `TypeError`.
4. `CreditCardPayment()` → overrides `process` → `__abstractmethods__` becomes empty → instantiation allowed.

### Output
```
Processing ₹500 via Credit Card
Generating receipt...
Processing ₹500 via UPI
Generating receipt...
```

### Advantages
- Enforces a consistent interface/contract across all subclasses
- Hides complex internal logic from the user — reduces cognitive load
- Great for large team projects — defines a clear "rulebook"

### Disadvantages
- Adds an extra layer/file just for the abstract class — slight overhead for tiny projects
- Beginners often confuse Abstraction with Encapsulation (they are DIFFERENT: Abstraction = hiding complexity/design level; Encapsulation = hiding data/implementation level)

### Memory trick
🚗 Abstraction = **Car steering wheel**. You just turn it (interface) — you don't need to know the internal steering mechanism (implementation) to drive.

---

## 7. Encapsulation vs Abstraction (most-asked interview question)

| Aspect | Encapsulation | Abstraction |
|---|---|---|
| Focus | HOW data is protected | WHAT functionality is exposed |
| Achieved via | Access modifiers (`_`, `__`), `@property` | Abstract classes, interfaces (`abc` module) |
| Level | Implementation level | Design level |
| Goal | Data hiding & security | Complexity hiding & contract enforcement |
| Real analogy | ATM PIN protects your account | ATM screen shows only "Withdraw/Deposit" buttons, hides banking logic |

---

## 8. Magic / Dunder Methods (make your objects behave like built-ins)

| Method | Purpose | Triggered by |
|---|---|---|
| `__init__` | Constructor | `ClassName(...)` |
| `__str__` | Human-readable string | `print(obj)`, `str(obj)` |
| `__repr__` | Developer-readable string | typing `obj` in console/debugger |
| `__len__` | Length | `len(obj)` |
| `__add__` | Addition | `obj1 + obj2` |
| `__eq__` | Equality check | `obj1 == obj2` |
| `__lt__` | Less than | `obj1 < obj2` |
| `__getitem__` | Indexing | `obj[0]` |
| `__call__` | Make object callable like a function | `obj()` |
| `__del__` | Destructor | when object is garbage collected |

### Code
```python
class Cart:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

    def __len__(self):
        return len(self.items)

    def __str__(self):
        return f"Cart with {len(self.items)} items: {self.items}"

    def __getitem__(self, index):
        return self.items[index]

c = Cart()
c.add("Book")
c.add("Pen")

print(len(c))       # calls __len__
print(c)             # calls __str__
print(c[0])          # calls __getitem__
```
**Output:**
```
2
Cart with 2 items: ['Book', 'Pen']
Book
```

### Memory trick
Dunder methods = **"secret hooks"** that Python's built-in syntax (`+`, `len()`, `print()`, `[]`) silently calls behind the scenes on your object.

---

## 9. Composition ("has-a") vs Inheritance ("is-a")

### What
- **Inheritance**: "is-a" relationship → `Dog IS-A Animal`
- **Composition**: "has-a" relationship → `Car HAS-A Engine`

### Why choose Composition over Inheritance?
**Rule of thumb (industry best practice): "Favor Composition over Inheritance"** — because composition is more flexible, avoids deep fragile hierarchies, and is easier to change at runtime.

### Code — Composition example
```python
class Engine:
    def start(self):
        print("Engine starting...")

class Car:
    def __init__(self):
        self.engine = Engine()      # Car HAS-A Engine (composition)

    def start(self):
        self.engine.start()          # delegates work to Engine object
        print("Car is ready to drive")

c = Car()
c.start()
```
**Output:**
```
Engine starting...
Car is ready to drive
```

### When to use which?

| Use Inheritance when | Use Composition when |
|---|---|
| True "is-a" relationship exists | "has-a" / "uses-a" relationship |
| Behavior should be shared & overridden | You want to combine independent behaviors flexibly |
| Hierarchy is shallow & stable | You need to swap components at runtime |

### Memory trick
🐕 Inheritance = **"Dog IS AN Animal"** (rigid, born with it).
🚗 Composition = **"Car HAS AN Engine"** (can swap the engine anytime without changing what a Car fundamentally is).

---

## 10. Real-Time Full Project Example (bringing EVERYTHING together)

```python
from abc import ABC, abstractmethod

# ---------- Abstraction ----------
class Employee(ABC):
    company = "TechCorp"          # Class variable
    total_employees = 0            # Class variable (counter)

    def __init__(self, name, salary):
        self.name = name                  # instance variable (public)
        self.__salary = salary            # instance variable (private) -> Encapsulation

    @abstractmethod
    def calculate_bonus(self):            # Abstract method -> must be implemented by children
        pass

    @property
    def salary(self):                     # Getter -> controlled access
        return self.__salary

    @salary.setter
    def salary(self, value):              # Setter -> validation -> Encapsulation
        if value < 0:
            raise ValueError("Salary cannot be negative")
        self.__salary = value

    def __str__(self):                    # Dunder method -> nice printing
        return f"{self.name} | Salary: {self.__salary} | Bonus: {self.calculate_bonus()}"

    @classmethod
    def get_total_employees(cls):         # Class method
        return cls.total_employees

    @staticmethod
    def is_valid_name(name):              # Static method
        return len(name) > 0


# ---------- Inheritance + Polymorphism ----------
class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)    # calling parent constructor
        self.team_size = team_size
        Employee.total_employees += 1

    def calculate_bonus(self):            # Overriding abstract method
        return self.salary * 0.20 + self.team_size * 500


class Developer(Employee):
    def __init__(self, name, salary, lang):
        super().__init__(name, salary)
        self.lang = lang
        Employee.total_employees += 1

    def calculate_bonus(self):            # Overriding differently -> Polymorphism
        return self.salary * 0.10


# ---------- Using everything ----------
employees = [
    Manager("Ravi", 60000, 5),
    Developer("Sita", 45000, "Python")
]

for emp in employees:
    print(emp)                             # calls __str__, which calls calculate_bonus() polymorphically

print("Total Employees:", Employee.get_total_employees())
print("Valid name check:", Employee.is_valid_name("Ravi"))
```

### Output
```
Ravi | Salary: 60000 | Bonus: 14500.0
Sita | Salary: 45000 | Bonus: 4500.0
Total Employees: 2
Valid name check: True
```

### What concept is used where (mapping)
| Line/Feature | Concept |
|---|---|
| `class Employee(ABC):` + `@abstractmethod` | Abstraction |
| `self.__salary`, `@property`, `@salary.setter` | Encapsulation |
| `class Manager(Employee):`, `super().__init__()` | Inheritance |
| `calculate_bonus()` different in Manager/Developer | Polymorphism (overriding) |
| `Employee.total_employees` | Class variable |
| `get_total_employees()` | Class method |
| `is_valid_name()` | Static method |
| `__str__` | Dunder/magic method |

---

## 11. Which approach is "best"? — Decision guide

| Situation | Best Approach |
|---|---|
| Need to protect sensitive data | Encapsulation with `@property` |
| Need shared behavior across similar entities | Inheritance |
| Need flexible, swappable components | Composition |
| Need to enforce "every subclass MUST implement X" | Abstraction (ABC) |
| Need same interface, different behavior | Polymorphism (overriding) |
| Utility function related to class, no data needed | `@staticmethod` |
| Need alternate constructors / factory logic | `@classmethod` |
| Deep inheritance chain (4-5+ levels) getting messy | Switch to Composition |

**Golden rule used by senior developers:**
> "Favor composition over inheritance. Use inheritance only for genuine IS-A relationships. Always encapsulate sensitive data with properties. Use abstraction to define contracts in large team codebases."

---

## 12. Full Memory Cheat-Sheet (revise in 2 minutes before interview)

| Concept | One-line memory hook |
|---|---|
| Class | Blueprint/Map |
| Object | Actual house built from map |
| `self` | "myself" — current object |
| `__init__` | Runs at birth of object |
| Instance variable | Personal bag (unique per object) |
| Class variable | Notice board (shared by all) |
| Instance method | Needs `self` — works with object data |
| Class method | Needs `cls` — works with class data |
| Static method | Needs neither — plain utility tool |
| Encapsulation | ATM — hides vault, gives buttons |
| Inheritance | DNA — child gets parent's traits |
| Polymorphism | One remote button, different device behavior |
| Abstraction | Steering wheel — hides engine complexity |
| Composition | Car HAS engine (swappable) |
| Dunder methods | Secret hooks Python calls behind `+`, `len()`, `print()` |

---

## 13. How to practice/execute this yourself (step-by-step workflow)

1. Open terminal → `python3 file.py` (or use VS Code "Run" / Jupyter cell).
2. Type ONE class at a time. After every class, immediately create an object and `print()` something — don't write 5 classes blind and run at the end.
3. Use `print(type(obj))` and `print(obj.__dict__)` constantly — this shows you EXACTLY what data lives inside an object at any point. This is the #1 debugging trick for OOP.
4. Use `python3 -i file.py` (interactive mode) — after the script runs, you land in a live shell with all your classes/objects still available to poke around.
5. Use the `dis` module (`import dis; dis.dis(YourClass.method)`) if you ever want to see what Python does at bytecode level — great for deep understanding, not needed daily.

---

*End of notes. This document covers: Class/Object, self, Constructors, Instance vs Class variables, Instance/Class/Static methods, Encapsulation, Inheritance (all types + MRO + super), Polymorphism (overriding, duck typing, operator overloading), Abstraction (ABC), Dunder methods, Composition vs Inheritance, a full real-world combined project, and a decision guide + memory cheat sheet.*
