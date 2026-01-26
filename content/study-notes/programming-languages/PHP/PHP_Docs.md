# PHP Documentation

## Variables

### Variable Declaration Rules
1.  Start with a dollar sign (`$`).
2.  The first letter must be `a-z`, `A-Z`, or `_`.
3.  Subsequent letters can be `a-z`, `A-Z`, `0-9`, or `_`.
4.  No spaces or special characters are allowed.

### Classification of Variables
-   **Predefined Variables/Constants**
-   **User-Defined Variables**
    1.  Variable Scope
    2.  Variable Variables
    3.  Reference Variables / Variables From External Sources

### Variable Scope
-   Local Scope
-   Global Scope
-   Static Variable

## PHP Basics

PHP can be used in three main fields:

-   Websites and web applications (server-side scripting)
-   Command-line scripting
-   Desktop (GUI) applications

PHP was designed to work closely with HTML for dynamic behavior. PHP content is executed on the server and added to the HTML to form one HTML document before being sent to the client.

### PHP Tags
Three types of tags are available in PHP:

1.  **Normal Tag**: `<?php ?>`
2.  **Short Echo Tag**: `<?= ?>`
3.  **Short Tag**: `<? ?>`

> **Note**: Short tags are by default available but can be disabled by `short_open_tag = Off` and also disabled by default if PHP is built with `--disable-short-tags()`.
> **Note**: The closing tag of a PHP block at the end of a file is optional. Omitting it can be helpful when using `include` or `require` to prevent unwanted whitespace at the end of files, allowing you to add headers to the response later.
> **Note**: If PHP is embedded within XML or XHTML, the normal `<?php ?>` tags must be used to remain compliant with the standards.
> **Note**: PHP requires instructions to be terminated with a semicolon (`;`) at the end of each statement.

### Vulnerability: `strcmp()` Type Juggling

The `strcmp()` function in PHP typically expects two strings. However, prior to PHP 8.0, if `strcmp()` is given an array instead of a string, it returns `NULL` and generates a Warning. In loose comparisons (`==`), `NULL` is treated as equal to `0`. Since `strcmp()` returns `0` when strings match, this behavior can be misinterpreted as a successful match if the check is written as `if (strcmp($a, $b) == 0)`.

**Vulnerable Code Example:**

```php
<?php
$username = $_POST['username'];
$password = $_POST['password'];

// If $password is an array (e.g., password[]=1), strcmp returns NULL.
// NULL == 0 is TRUE in PHP loose comparison.
if (strcmp($password, $stored_password) == 0) {
    // Login bypassed!
}
?>
```

**Fix:**

Use the strict comparison operator (`===`) or ensure inputs are strings.

```php
<?php
if (strcmp($password, $stored_password) === 0) {
    // ...
}
?>
```

Or better, use `hash_equals()` for comparing sensitive strings like password hashes to prevent timing attacks.

```php
<?php
session_start();
if (!empty($_POST['username']) && !empty($_POST['password'])) {
    require('config.php');
    if (strcmp($username, $_POST['username']) == 0) {
        if (strcmp($password, $_POST['password']) == 0) {
            $_SESSION['user_id'] = 1;
            header("Location: /upload.php");
        } else {
            print("<script>alert('Wrong Username or Password')</script>");
        }
    } else {
        print("<script>alert('Wrong Username or Password')</script>");
    }
}
?>
```

### PHP `echo` and `print` Statements

`echo` and `print` are both used to output data to the screen. When used within HTML, they output to the HTML document rather than the terminal.

The PHP opening (`<?php`) and closing (`?>`) tags are used to insert PHP code in HTML pages. The `echo` statement adds text to HTML. PHP provides a shorthand syntax `<?= ` instead of `<?php echo`.

**Differences:**
-   `echo` has no return value, while `print` has a return value of `1` (so it can be used in expressions).
-   `echo` can take multiple parameters (though rare), while `print` takes only one argument.
-   `echo` is marginally faster than `print`.

**Output Functions:**
-   `print`: Outputs a string.
-   `printf`: Outputs a formatted string.
-   `print_r`: Prints human-readable information about a variable, mostly used for compound types (arrays, objects, etc.).

**`echo` Examples:**

```php
<?php
echo("This works!\n");
echo "This also works!\n";
// echo("This would NOT work", "\n"); // Multiple parameters require parentheses for echo.
echo "Buuuut!", " ", "This", " ", "does!", "\n";
?>
```

### PHP `include` & `require` Statements

The `include` or `require` statement inserts the content of one PHP file into another PHP file before server execution.

**Differences upon failure:**
-   `require` will produce a fatal error (`E_COMPILE_ERROR`) and stop the script.
-   `include` will only produce a warning (`E_WARNING`) and the script will continue.

If you want execution to continue even if the included file is missing, use `include`. If the file is critical (e.g., in a framework or complex application), always use `require` to avoid compromising security and integrity. Including files saves work by allowing you to create standard headers, footers, or menu files that can be updated in one place.

## Type System

PHP supports ten primitive types.

### Scalar Types
Scalar values are values that cannot be broken into smaller pieces.

-   `bool`
-   `int`
-   `float`
-   `string`

### Compound Types

-   `array`
-   `object`
-   `callable`
-   `iterable`

### Special Types

-   `RESOURCE`
-   `NULL`

The type of a variable is usually decided at runtime by PHP. To forcibly convert a variable, either cast it or use the `settype()` function.

-   `var_dump()`: Checks the type and value of an expression.
-   `gettype()`: Returns a human-readable representation of a type.
-   `is_type()` functions (`is_int()`, `is_string()`, `is_bool()`): Check for a certain type.

### Strings

PHP strings allow direct variable placement within double-quoted strings, where variables will be parsed (their values will be used). PHP also has leading numeric strings, which start with a numeric string followed by any characters.

> **Note**: Any string that contains the letter `E` (case insensitive) bounded by numbers will be seen as a number expressed in scientific notation. This can produce unexpected results.

```php
<?php
var_dump("0D1" == "000"); // false, "0D1" is not scientific notation
var_dump("0E1" == "000"); // true, "0E1" is 0 * (10 ^ 1), or 0
var_dump("2E1" == "020"); // true, "2E1" is 2 * (10 ^ 1), or 20
?>
```

During variable assignment, the left variable is the storage, and the right variable's value is stored.

-   **By Value**: Creates two independent variables, each holding a copy of the same value. Changes to one do not affect the other.
-   **By Reference**: Creates an alias for a variable using the reference assignment operator (`=&`). Both names point to the same memory location, so changes to one affect the other.

### Integers

If PHP encounters a number beyond the bounds of the `int` type, it will be interpreted as a `float`. Operations that result in numbers outside the `int` range will also return a `float`.

> **Warning**: `-1` is considered `true`, like any other non-zero number.

Integers can be specified in decimal (base 10), hexadecimal (base 16), octal (base 8), or binary (base 2) notation. The negation operator can be used for negative integers.

-   **Octal**: Precede with `0` (or `0o` / `0O` as of PHP 8.1.0).
-   **Hexadecimal**: Precede with `0x`.
-   **Binary**: Precede with `0b`.

### Booleans

When converting to `bool`, the following values are considered `false`:

-   The boolean `false` itself
-   The integer `0` (zero)
-   The floats `0.0` and `-0.0` (zero)
-   The empty string (`""`), and the string `"0"`
-   An array with zero elements
-   The special type `NULL` (including unset variables)
-   `SimpleXML` objects created from attributeless empty elements.

Every other value is considered `true` (including any resource and `NAN`).

### Arrays

An array in PHP is an ordered map that associates values with keys. Arrays can be created using the `array()` language construct or the short array syntax (`[]`).

```php
<?php
$array = array(
    "foo" => "bar",
    "bar" => "foo",
);

// Using the short array syntax
$array = [
    "foo" => "bar",
    "bar" => "foo",
];
?>
```

Keys can be integers or strings. If no key is specified, PHP will assign the next available integer key (maximum integer key + 1, or 0 if no integer keys exist).

```php
<?php
$array = array(
    1     => 'a',
    '1'   => 'b', // 'a' will be overwritten by 'b'
    1.5   => 'c', // 'b' will be overwritten by 'c'
    -1    => 'd',
    '01'  => 'e', // Not an integer string, does not override key for 1
    '1.5' => 'f', // Not an integer string, does not override key for 1
    true  => 'g', // 'c' will be overwritten by 'g'
    false => 'h',
    ''    => 'i',
    null  => 'j', // 'i' will be overwritten by 'j'
    'k',          // Value 'k' is assigned the key 2 (largest int key + 1)
    2     => 'l', // 'k' will be overwritten by 'l'
);

var_dump($array);
?>
```

Associative arrays use `key => value` pairs. The key must be a string or an integer. Values can be of any type. Elements can be removed using `unset()`.

The union (`+`) operator for arrays appends unique keys from the second array to the first. If keys are the same, the left array's value takes precedence.

### Iterables

An `iterable` is any value that can be looped through with a `foreach()` loop (arrays or instances of `Traversable`). It can be used as a parameter type or return type for functions.

**Iterable Parameter Type Example:**

```php
<?php
function foo(iterable $iterable) {
    foreach ($iterable as $value) {
        // ...
    }
}
?>
```

**Iterable Parameter Default Value Example:**

```php
<?php
function foo (iterable $iterable = []) {
    // ...
}
?>
```

**Return an Iterable Example:**

```php
<?php
function getIterable() :iterable {
  return ["a", "b", "c"];
}

$myIterable = getIterable();
foreach($myIterable as $item) {
  echo $item; // Prints abc
}
?>
```

### Resources

A `RESOURCE` is a special variable holding a reference to an external resource, created and used by special functions.

### NULL

The special `null` value represents a variable with no value. A variable is considered `null` if:
-   It has been assigned the constant `null`.
-   It has not been set to any value yet.
-   It has been `unset()`.

```php
<?php
$var = NULL;
?>
```

## Operators

Operations have an order of precedence (PEMDAS): parentheses `(())`, exponents (`**`), multiplication (`*`) and division (`/`), then addition (`+`) and subtraction (`-`).

### Arithmetic Assignment Operators

| Operation  | Long Syntax   | Short Syntax |
| :--------- | :------------ | :----------- |
| Add        | `$x = $x + $y` | `$x += $y`   |
| Subtract   | `$x = $x - $y` | `$x -= $y`   |
| Multiply   | `$x = $x * $y` | `$x *= $y`   |
| Divide     | `$x = $x / $y` | `$x /= $y`   |
| Modulo     | `$x = $x % $y` | `$x %= $y`   |

> **Note**: Increment/decrement operators only affect numbers and strings. Arrays, objects, booleans, and resources are not affected. Decrementing `null` has no effect, but incrementing it results in `1`.

### Increment/Decrement Operators

| Example | Name            | Effect                                       |
| :------ | :-------------- | :------------------------------------------- |
| `++$a`  | Pre-increment   | Increments `$a` by one, then returns `$a`.   |
| `$a++`  | Post-increment  | Returns `$a`, then increments `$a` by one.   |
| `--$a`  | Pre-decrement   | Decrements `$a` by one, then returns `$a`.   |
| `$a--`  | Post-decrement  | Returns `$a`, then decrements `$a` by one.   |

-   **Postfix form (`$a++`, `$a--`)**: Use then change.
-   **Prefix form (`++$a`, `--$a`)**: Change then use.

```php
<?php
$n = 3;
echo $n--; // 3 (returns 3, then $n becomes 2)
echo --$n; // 1 ($n becomes 1, then returns 1)
echo $n;   // 1
?>
```

> **Note**: The argument spread operator (`...`) is not supported in assignments.

### Type Juggling (Automatic)

PHP does not require explicit type definition. The type of a variable is determined by the value it stores. PHP may attempt to convert the type of a value automatically in certain contexts:

-   **Numeric**: Used with arithmetic operators. If an operand is a float, both become floats; otherwise, both become ints.
-   **String**: Used with `echo`, `print`, string interpolation, or concatenation. Values are interpreted as strings.
-   **Logical**: Used with conditional statements or logical operators. Values are interpreted as booleans.
-   **Integral and string**: Used with bitwise operators. If all operands are strings, the result is a string; otherwise, operands are ints, and the result is an int.
-   **Comparative**
-   **Function**

> **Note**: When a value needs to be interpreted as a different type, the value itself does not change types permanently.

### Type Casting (Manual)

Type casting converts a value to a chosen type by writing the type within parentheses before the value.

```php
<?php
$foo = 10;   // $foo is an integer
$bar = (bool) $foo;   // $bar is a boolean
?>
```

**Allowed Casts:**
-   `(int)`: Cast to integer
-   `(bool)`: Cast to boolean
-   `(float)`: Cast to float
-   `(string)`: Cast to string
-   `(array)`: Cast to array
-   `(object)`: Cast to object
-   `(unset)`: Cast to `NULL`

### Type Declarations

Type declarations can be added to function arguments, return values, and class properties to ensure the value is of the specified type at call time, throwing a `TypeError` otherwise. When overriding a parent method, the child's method must match the parent's return type declaration.

**Single Types:**

| Type              | Description                                                                                             |
| :---------------- | :------------------------------------------------------------------------------------------------------ |
| `Class/interface` | The value must be an instance of the given class or interface.                                          |
| `self`            | The value must be an instance of the same class as the one in which the type declaration is used. (Classes only) |
| `parent`          | The value must be an instance of the parent of the class in which the type declaration is used. (Classes only) |
| `array`           | The value must be an array.                                                                             |
| `callable`        | The value must be a valid callable. (Cannot be used as a class property type declaration)               |
| `bool`            | The value must be a boolean value.                                                                      |
| `float`           | The value must be a floating-point number.                                                              |
| `int`             | The value must be an integer.                                                                           |
| `string`          | The value must be a string.                                                                             |
| `iterable`        | The value must be either an array or an instance of `Traversable`.                                      |
| `object`          | The value must be an object.                                                                            |
| `mixed`           | The value can be any type.                                                                              |

## Functions

### PHP Functions & Return Statements

When a function is assigned to a variable, the return value of the function is indirectly assigned to that variable.

```php
<?php
function myFunction() {
    return "value";
}
$thisMyFunction = myFunction(); // Executes myFunction() and assigns "value" to $thisMyFunction
?>
```

The `return` keyword immediately stops a function. Any code after a `return` statement will not run. A function without a `return` statement implicitly returns `NULL`.

### Defining Parameters & Arguments

-   **Parameter**: A variable serving as a placeholder in a function's code block.
-   **Argument**: The actual value passed to a function when it's invoked.

### Default Arguments

Default arguments prevent errors if a function is invoked without a required argument.

```php
<?php
function myFunction($param = "argument") {
    // ...
}
?>
```

### Pass By Reference

By default, when a variable is passed as an argument, a copy of its value is used. Changes to the parameter inside the function do not affect the original variable. To make permanent changes, prepend the parameter name with an ampersand (`&`) to pass by reference. Both the argument and parameter will then refer to the same memory location.

```php
<?php
function addX ($param) {
    $param = $param . "X";
    echo $param;
}

function addXPermanently (&$param) {
    $param = $param . "X";
    echo $param;
}

$word = "Hello";
addX($word); // Prints: HelloX
echo $word;  // Prints: Hello

$word = "Hello";
addXPermanently($word); // Prints: HelloX
echo $word;             // Prints: HelloX
?>
```

### Variable Scope

The scope of a variable is the context within which it is defined. In PHP, global variables must be declared `global` inside a function to be used within that function. Each function has its own local scope, meaning variables defined inside a function are only accessible within it. The `global` keyword tells PHP to look in the global scope for the variable.

### Intro to Built-in PHP Functions

-   `gettype()`: Takes a variable and returns a string representing its data type.
-   `var_dump()`: Prints detailed information about a variable (value and type).
-   `strrev()`: Takes a string and returns it with characters in reverse order.
-   `strtolower()`: Transforms a string into all lowercase letters.
-   `str_repeat(string, number)`: Returns a string with the argument string repeated a specified number of times.
-   `substr_count(haystack, needle)`: Returns the number of instances of a substring within a string.
-   `abs()`: Returns the absolute value of a number.
-   `round()`: Returns the nearest integer to a number.
-   `rand()`: Returns a random integer. Invoked without arguments, it returns a number between 0 and the largest allowed number in the environment.

## Superglobals

There are 12 predefined variables in PHP 8 that are "superglobals," meaning they are always accessible regardless of scope.

1.  `$GLOBALS`: An associative array containing references to all variables currently defined in the global scope.
2.  `$_SERVER`: An array containing information such as headers, paths, and script locations. Its entries are created by the web server.
3.  `$_GET`: An associative array of variables passed to the current script via URL parameters.
4.  `$_POST`: An associative array of variables passed to the current script via the HTTP POST method.

    **GET vs. POST**: Both create associative arrays (`key => value`) holding input data.
    HTML forms often use the `action` attribute to specify the PHP file to process the form data.

5.  `$_REQUEST`: A superglobal variable used to collect data after submitting an HTML form. It contains the contents of `$_GET`, `$_POST`, and `$_COOKIE`.
6.  `$_COOKIE`: An associative array of variables passed to the current script via HTTP Cookies. A cookie is created with `setcookie()`.
    ```php
    setcookie(name, value, expire, path, domain, secure, httponly);
    ```
    Only the `name` parameter is required. `setcookie()` must appear BEFORE the `<html>` tag.
7.  `$_ENV`: An associative array of variables passed to the current script via the environment.
8.  `$argc`: Contains the number of arguments passed to the current script when run from the command line. The script's filename is always the first argument, so `$argc`'s minimum value is `1`. Also available as `$_SERVER['argc']`.
9.  `$argv`: Contains an array of all arguments passed to the script when run from the command line. The first argument (`$argv[0]`) is always the script's name. Also available as `$_SERVER['argv']`.
10. `$_FILES`: Handles uploaded file information.
    HTML form for file upload:
    ```html
    <form enctype="multipart/form-data" action="__URL__" method="POST">
        <input type="hidden" name="MAX_FILE_SIZE" value="30000" />
        Send this file: <input name="userfile" type="file" />
        <input type="submit" value="Send File" />
    </form>
    ```
    > **Note**: The `enctype="multipart/form-data"` attribute is crucial for file uploads to work. The `__URL__` should be replaced with the path to the PHP handler script.
11. `$_SESSION`: Used to set session variables, which store information across multiple pages without being stored on the user's computer (unlike cookies). Sessions are started with `session_start()` (must be the very first thing in the document). `session_unset()` removes all session variables, and `session_destroy()` destroys the session.

## Classes and Objects

A class may contain its own constants, variables (properties), and functions (methods). Objects are specific instances of a class, created through instantiation using the `new` keyword.

```php
<?php
$apple = new Fruit();
var_dump($apple instanceof Fruit);
?>
```

### Properties and Methods

-   **Object Operator (`->`)**: Used to interact with an object's properties and methods.
-   `$this`: Refers to the current object and is available when a method is called from within an object context.

### Static Members

Declaring class properties or methods as `static` makes them accessible without needing an instance of the class. `$this` is not available inside `static` methods. `Static` properties and methods are accessed using the Scope Resolution Operator (`::`) (`self::$property` or `ClassName::method()`) and cannot be accessed through the object operator (`->`).

### Class Constants

Constants are declared with the `const` keyword inside a class and cannot be changed. They are case-sensitive (conventionally uppercase). Access from outside: `ClassName::CONSTANT_NAME`. Access from inside: `self::CONSTANT_NAME`.

### Class Methods

Methods are functions defined within a class. They are accessed using the object operator (`->`) followed by parentheses (`()`) to invoke them.

### Constructor and Destructor Methods

-   **Constructor (`__construct()`)**: An ordinary method automatically called during object instantiation. It can define arguments (parameters).
-   **Destructor (`__destruct()`)**: Automatically called when the object is destroyed or the script ends.

### Class Inheritance

Classes can inherit from other classes using the `extends` keyword. A class can only inherit from one parent class. A subclass inherits all `public` and `protected` methods, properties, and constants from the parent. `private` methods are not inherited.

```php
<?php
class ChildClass extends ParentClass {
    // ...
}
?>
```

### Overriding / Overloading Methods

Child classes can `override` parent methods by defining a new method with the same name. `parent::` can be used to call the parent's method from within the child class.

> **Note**: The `final` keyword can prevent class inheritance or method overriding.

### Class Visibility

Three levels of visibility for class members:

-   **`public` (default)**: Accessible from anywhere (inside or outside the class).
-   **`protected`**: Accessible only within the class and its descendants.
-   **`private`**: Accessible only within the defining class itself.

### Class Getters and Setters

The concept of accessing properties only through methods is called using getters and setters. Getters (`getName()`) retrieve property values, and setters (`setName($name)`) set them, often including logic for validation or formatting.

```php
<?php
class Pet {
    private $name;

    function setName($name) {
        $this->name = $name;
    }

    function getName() {
        return $this->name;
    }
}
?>
```

### Scope Resolution Operator (`::`)

The double colon (`::`) allows access to `static`, `constant`, and `overridden` properties or methods. `self`, `parent`, and `static` keywords are used with `::` from inside the class definition.

## Exceptions

An exception is an object that describes an error or unexpected behavior. Exceptions are thrown by PHP functions and classes, and by user-defined functions using the `throw` statement.

```php
<?php
try {
    // Code that can throw exceptions
} catch(Exception $e) {
    // Code that runs when an exception is caught
}
?>
```

The `catch` block specifies the type of exception to catch (e.g., `Exception`) and a variable name (`$e`) to access the exception object.

**Creating Exceptions:**

```php
<?php
new Exception(message, code, previous);
?>
```

-   `message`: (Optional) String describing the exception.
-   `code`: (Optional) Integer code for distinguishing exceptions.
-   `previous`: (Optional) The previous exception if this one was thrown in a `catch` block.

**Exception Object Methods:**

-   `getMessage()`: Returns the exception message.
-   `getPrevious()`: Returns the previous exception object, or `null`.
-   `getCode()`: Returns the exception code.
-   `getFile()`: Returns the full path of the file where the exception was thrown.
-   `getLine()`: Returns the line number where the exception was thrown.

## PHP & MySQL Database

PHP can connect to and manipulate databases, with MySQL being the most popular. Data is stored in tables.

### Prepared Statements and Bound Parameters

Prepared statements are a crucial security feature against SQL injection and improve efficiency for repeated SQL statements.

**How they work:**
1.  **Prepare**: An SQL statement template is created and sent to the database. Values are left unspecified as parameters (e.g., `?`). The database parses, compiles, and optimizes the template.
    Example: `INSERT INTO MyGuests VALUES(?, ?, ?)`
2.  **Execute**: Values are bound to the parameters, and the database executes the statement. This can be done multiple times with different values.

**Advantages of Prepared Statements:**
-   **Reduced Parsing Time**: The query is prepared only once.
-   **Minimized Bandwidth**: Only parameters need to be sent each time, not the whole query.
-   **SQL Injection Protection**: Parameter values are transmitted separately and do not need to be manually escaped, preventing injection if the template is not derived from external input.

Three ways to work with PHP and MySQL:
-   MySQLi (object-oriented)
-   MySQLi (procedural)
-   PDO (PHP Data Objects)

```