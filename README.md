# Email Creator

### About
Eamil creator list component functions like gmail email text field

### How To Install

add the following lines inside your HTML tag

```sh
<script src="./emailcreator.js" type="text/javascript" async></script>
<link href='./emailcreator.css' rel='stylesheet' type='text/css'>
```
### Basic Usage

```sh
const container = document.querySelector("#emailcreator1");
const options = {
  placeholderText: "add more people.. here"
};

EmailCreator({ container, ...options });
let emailCreator = EmailCreator({ container, ...options });
```

###  How to Run Project

```sh
git clone https://github.com/satyavanu/emailcreator.git
cd emailcreator
npm i
npx http-server -o
```

 # API Methods
 
 - getEmailCount()
 - addEmail()
 - emailList :  Array<string> 
 
### Todos
 - Write MORE Tests
 - Email Lists changes to deletion

License
----
 

