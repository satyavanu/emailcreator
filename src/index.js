
import "./styles.css";
import { fromEvent, merge } from "rxjs";
import { filter, delay } from "rxjs/operators";

export function EmailCreator(payload) {
  if (this instanceof EmailCreator) {
    let _self = this;
    _self.addEmail = function() {
      let randomEmail = Math.random()
        .toString(20)
        .replace(/[^a-z]+/g, "")
        .concat("@miro.com");
      _self.createChip(randomEmail);
    };
    _self.getEmailCount = function(selector) {
      const validEmailsCount = selector.querySelectorAll(".chip:not(.error)")
        .length;
      alert(`Valid Emails Count : ${validEmailsCount}`);
    };

    Object.defineProperty(_self, "emailList", {
      value: [],
      writable: false
    });

    const { container, placeholderText = "add more people ..." } = payload;
    try {
      if (container === "") throw new Error("Oops! Looks Invalid");

      let componentTemplate = `
          <div class="emailcreator--warpper">
          <div class="email">
          <input type="text" class="emailcreator--input" placeholder="${placeholderText}" />
          </div>
          </div>
          `;

      container.innerHTML = componentTemplate;

      let app = container.querySelector(".emailcreator--warpper");
      let elm = container.querySelector(".emailcreator--input");
      const clickEvent$ = fromEvent(elm, "keypress").pipe(
        delay(100),
        filter(e => e.key === "," || e.key === "Enter")
      );

      const pasteEvent$ = fromEvent(elm, "paste").pipe(delay(100));
      const focusoutEvent$ = fromEvent(elm, "focusout");

      const emailCreatorEvents$ = merge(
        clickEvent$,
        pasteEvent$,
        focusoutEvent$
      );

      emailCreatorEvents$.subscribe(e => {
        callChip(e.target.value);
        e.target.value = "";
      });

      function callToCreateChip(val) {
        if (val.length > 0) {
          _self.createChip(val);
        }
      }

      function callChip(val) {
        let breakVal = val.split(",");
        if (breakVal.length > 1) {
          for (let eachEmail of breakVal) {
            callToCreateChip(eachEmail);
          }
        } else callToCreateChip(val);
      }

      function ValidateEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      }

      _self.createChip = function(email) {
        let node = document.createElement("div");
        if (ValidateEmail(email)) {
          node.className = "chip";
          _self.emailList.push(email);
        } else node.className = "chip error";

        node.innerHTML = `
          <span>${email}</span>
          <span class="closebtn" onclick="this.parentElement.remove()">
          &times;</span>
          `;
        app.insertBefore(node, app.lastElementChild);
      };
    } catch (err) {
      console.error("oops ", err.message);
      return;
    }
  } else {
    return new EmailCreator(payload);
  }
}

window.EmailCreator = EmailCreator;

