/*
*
*
THIS SECTION FROM ALAB 316.1.1
*
*
*/
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

//PART 1: GETTING STARTED
const mainEl = document.body.querySelector("main"); //We already have a "main" tag so just selecting
mainEl.style.backgroundColor = "var(--main-bg)"; //custom property in CSS. makes it easier for reference
mainEl.innerHTML = "<h1>DOM Manipulation</h1>"; //innerHTML allows to put inner tags and the text
mainEl.classList.add("flex-ctr"); //class 'flex-ctr' which is selected

//PART 2: CREATING MENU BAR
const topMenuEl = document.getElementById("top-menu"); //it's document.getElementById
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

//PART 3: ADDING MENU BUTTONS
for (link of menuLinks) {
  const anchor = document.createElement("a"); //REMEMBER: document.createElement()
  anchor.setAttribute("href", link["href"]);
  anchor.textContent = link["text"];
  topMenuEl.appendChild(anchor); //Now we can append this anchor to the topMenuEl
}

/*
*
*
THIS IS THE NEW PORTION FOR R-ALAB 316.3.1
*
*
*/

/***********************
PART 3: CREATING SUBMENU
***********************/
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");

subMenuEl.style.position = "absolute";
subMenuEl.style.top = 0;

/****************************** 
PART 4: ADDING MENU INTERACTION
*******************************/
const topMenuLinks = document.querySelectorAll("a");
topMenuEl.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.matches("a")) {
    return;
  }
  console.log(e.target.textContent);

  e.target.classList.toggle("active");

  topMenuLinks.forEach((link) => {
    if (link !== e.target) {
      link.classList.remove("active");
    }
  });
/**********************************
 PART 5: ADDING SUBMENU INTERACTION
**********************************/
  const clickedLink = menuLinks.find(
    (link) => link.text === e.target.textContent
  );

  /*****LAST PART OF PART 5 INSERTED TO THIS eventListener TO CHANGE mainEL.textContent to About ********/
  if (clickedLink.text == "about") {
    subMenuEl.style.top = 0;
    mainEl.textContent = `About`;
  } else if (clickedLink.subLinks) {
    subMenuEl.style.top = "100%";
    buildSubMenu(clickedLink.subLinks);
  } else {
    subMenuEl.style.top = 0;
  }
});

/**********************************
 PART 5: ADDING SUBMENU INTERACTION, cont'd
**********************************/
function buildSubMenu(subLinks) {
  //Clear the current contents of subMenuEl.
  subMenuEl.innerHTML = "";
  //Iterate over the subLinks array, passed as an argument, and for each "link" object:
  subLinks.forEach((link) => {
    //Create an <a> element.
    const a = document.createElement("a");
    //Add an href attribute to the <a>, with the value set by the href property of the "link" object.
    a.setAttribute("href", link.href);
    //Set the element's content to the value of the text property of the "link" object.
    a.textContent = link.text;
    //Append the new element to the subMenuEl.
    subMenuEl.appendChild(a);
  });
}

subMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.target.matches("a")) {
    return;
  }
  console.log(e.target.textContent);

  subMenuEl.style.top = 0;

  topMenuLinks.forEach((link) => {
    link.classList.remove("active");
  });

  let clickedsubLink = "";

  for (let link of menuLinks) {                             //subLinks not global variable. Have to ref it from
    if (link.subLinks) {                                    //menuLinks
      clickedsubLink = link.subLinks.find(
        (subLink) => subLink.text === e.target.textContent
      );                                                    //if subLinks exist, clickedSubLink is where 
      if (clickedsubLink) {                                 //sublink.text matches target's textContent
        break;                                              //if we found clickedSubLink, break out of Loop
      }
    }
  }

  if (clickedsubLink) {                                     //if we had a matching subLink, mainEl.textContent
    mainEl.textContent = `${clickedsubLink.text}`;          //is reassigned to the clickedSubLink's text.
  }
});
