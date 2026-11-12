const menuData = [
  {category:"Coffee", items:[
    ["Americano",79],["Spanish Latte",95],["Caramel Macchiato",95],["Cafe Mocha",95],["Sea Salt Latte",95],["Peppermint Mocha",95],["French Vanilla",95],["Salted Caramel",95],["Dirty Matcha",110],["Biscoff Latte",115],["Spanish Matcha (Iced Only)",120],["Yema Affogato (Iced Only)",120]
  ]},
  {category:"Non-Coffee",items:[
    ["Choco Oreo",79],["White Oreo",79],["Blueberry Milk",79],["Strawberry Milk",79],["Strawberry Matcha",79],["Milo Dino",79],["Ceremonial Matcha",89],["Matcha Latte (Hot/Iced)",89],["Biscoff Milk",105],["Matcha Biscoff",115],["Matcha Cheese Foam",115]
  ]},
  {category:"Waffles",items:[
    ["Caramel Waffle",65],["Oreo Waffle",69],["Nutella Almond Waffle",79],["Biscoff Waffle",99],["Nutella S'mores Waffle",99],["Biscoff S'mores Waffle",99]
  ]},
  {category:"Snacks & Burgers",items:[
    ["Regular Fries",55],["Happi Burger",59],["Cheesy Sausage",59],["Flavored Fries (BBQ, Cheese, Sour & Cream)",65],["Cheesy Bacon Burger",69],["B1T1 Cheese Burger",69],["Hungarian Sandwich",69],["Savory Fries",109],["Nachos",109],["Chicken Tender Fries",109]
  ]},
  {category:"Combo Meals",items:[
    ["C1 — Happi Burger & Fries",79],["C2 — Cheesy Bacon Burger & Fries",89],["C3 — Cheesy Sausage & Fries",79],
    ["C4 — Happi Burger, Fries & Nuggets or Hashbrown",120],["C5 — Cheesy Bacon Burger, Fries & Nuggets or Hashbrown",120],
    ["C6 — Cheesy Sausage, Fries & Nuggets or Hashbrown",120],["Chicken Burger & Fries Combo",109]
  ]},
  {category:"Frappe",items:[
    ["Dark Chocolate",99],["Cookies and Cream",99],["Matcha",99],["Strawberry",99],["Java Chip",105],["S'mores",105],["Salted Caramel",115]
  ]},
  {category:"Sparkling Soda",items:[
    ["16oz — Lemon",39],["22oz — Lemon",49],["16oz — Strawberry",39],["22oz — Strawberry",49],
    ["16oz — Green Apple",39],["22oz — Green Apple",49],["16oz — Passion Fruit",39],["22oz — Passion Fruit",49],
    ["16oz — Lychee",39],["22oz — Lychee",49],["16oz — Blueberry",39],["22oz — Blueberry",49],["16oz — Kiwi",39],["22oz — Kiwi",49]
  ]},
  {category:"Milktea",items:[
    ["16oz — Oreo",49],["22oz — Oreo",79],["16oz — Okinawa",49],["22oz — Okinawa",79],
    ["16oz — Dark Chocolate",49],["22oz — Dark Chocolate",79],["16oz — Wintermelon",49],["22oz — Wintermelon",79],
    ["16oz — Brown Sugar",49],["22oz — Brown Sugar",79],["16oz — Matcha",49],["22oz — Matcha",79],
    ["16oz — Strawberry",49],["22oz — Strawberry",79]
  ]},
  {category:"Refreshing Drinks",items:[["Yuzo Peach",79],["Yuzo Vanilla",79]]},
  {category:"Add-ons",items:[
    ["Boba",10],["Coffee Jelly",15],["Nata",15],["Popping Boba",15],["Seasalt Foam",20],
    ["Oat Milk (16oz)",20],["Oat Milk (22oz)",30],["Cheese Cake",25],["Cheese Foam",25],["Espresso Shot",40]
  ]}
];

const grid = document.getElementById("menuGrid");
const tabs = [...document.querySelectorAll(".tab")];
const search = document.getElementById("menuSearch");
let activeCategory = "all";

function renderMenu(){
  const query = search.value.trim().toLowerCase();
  const filtered = menuData.flatMap(group => group.items
    .filter(([name]) => (activeCategory === "all" || activeCategory === group.category) && name.toLowerCase().includes(query))
    .map(([name,price]) => ({name,price,category:group.category})));
  if(!filtered.length){
    grid.innerHTML = '<div class="menu-empty">No menu items found. Try another search.</div>';
    return;
  }
  grid.innerHTML = filtered.map((item,index) => `
    <article class="menu-card ${index===0 ? "category-start" : ""}">
      <div><h3>${escapeHtml(item.name)}</h3><small>${escapeHtml(item.category)}</small></div>
      <span class="price">₱${item.price}</span>
    </article>`).join("");
}
function escapeHtml(value){
  return value.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
tabs.forEach(tab => tab.addEventListener("click",()=>{
  tabs.forEach(t=>t.classList.remove("active"));
  tab.classList.add("active");
  activeCategory=tab.dataset.filter;
  renderMenu();
}));
search.addEventListener("input",renderMenu);
renderMenu();

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
toggle.addEventListener("click",()=>{
  const opened=nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded",String(opened));
  toggle.textContent=opened?"×":"☰";
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.textContent="☰";
}));

document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("copyEmail").addEventListener("click",async()=>{
  try{
    await navigator.clipboard.writeText("Hapibeans16@gmail.com");
    const toast=document.getElementById("toast");toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),1800);
  }catch(e){window.location.href="mailto:Hapibeans16@gmail.com";}
});