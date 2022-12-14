const items = [{
        title: "Стакан складной Stojo",
        description: "Кофе с собой в свой стильный стакан.",
        tags: ["eat", "house"],
        price: 45,
        img: "./img/1.jpg",
        rating: 4.2,
    },
    {
        title: "Твердый шампунь Meela Meelo",
        description: "Идеально пенится, эко-состав",
        tags: ["beauty"],
        price: 15,
        img: "./img/2.jpg",
        rating: 4.4,
    },
    {
        title: "Авоська для покупок",
        description: "Удобная и вместительная авоська для ваших покупок",
        tags: ["house"],
        price: 20,
        img: "./img/3.jpg",
        rating: 3.0,
    },
    {
        title: "Менструальная чаша EcoCup",
        description: "Комфорт и здоровье женщины без ограничений",
        tags: ["beauty"],
        price: 55,
        img: "./img/4.jpg",
        rating: 4.7,
    },
    {
        title: "Металлическая коктейльная трубочка",
        description: "Для любителей коктейлей и смузи",
        tags: ["eat", "house"],
        price: 10,
        img: "./img/5.jpg",
        rating: 3.8,
    },
    {
        title: "Бамбуковые зубные щетки",
        description: "Здоровая улыбка с заботой о природе",
        tags: ["beauty", "house"],
        price: 7,
        img: "./img/6.jpg",
        rating: 3.2,
    },
    {
        title: "Фруктовка",
        description: "Прочная и оптимальная по размеру",
        tags: ["house"],
        price: 5,
        img: "./img/7.jpg",
        rating: 2.9,
    },
    {
        title: "Бутылка для воды",
        description: "Возьмите с собой на прогулку",
        tags: ["house", "eat"],
        price: 30,
        img: "./img/8.jpg",
        rating: 3.4,
    },
    {
        title: "Джутовая губка для мытья посуды",
        description: "Антибактериальные свойства, долговечность",
        tags: ["house"],
        price: 3,
        img: "./img/9.jpg",
        rating: 4.1,
    },
    {
        title: "Дезодорант Краснополянская косметика",
        description: "На основе органических ингредиентов без алюминия и парабенов, которые бережны к нежной коже",
        tags: ["beauty"],
        price: 25,
        img: "./img/10.jpg",
        rating: 4.9,
    },
    {
        title: "Пеленка для малыша многоразовая",
        description: "Стильный дизайн, мягкая поверхность, быстровпитывающая",
        tags: ["baby"],
        price: 30,
        img: "./img/11.jpg",
        rating: 3.7,
    },
    {
        title: "Подгузник многоразовый",
        description: "Дышащий, удобный, эргономичный",
        tags: ["baby"],
        price: 40,
        img: "./img/12.jpg",
        rating: 3.9,
    },
];

let userName = prompt("Привет! Как тебя зовут?");
// Переменная с контейнером для приветствия
const greetContainer = document.querySelector("#greet");
// Шаблон для Приветствия
const greetTemplate = document.querySelector("#greet-template");

// Функция для создания верстки приветствия
function prepareGreet() {

    // Берем за основу шаблон товара
    const greet = greetTemplate.content.cloneNode(true);
    // Наполняем его информацией из объекта
    if (userName != null) {
        greet.querySelector("p").textContent = `Здравствуй,${userName}! Приветствуем тебя в нашем магазине заботливых эко-товаров!`;
    } else {
        greet.querySelector("p").textContent = `Здравствуй! Приветствуем тебя в нашем магазине заботливых эко-товаров!`;
    }


    // Возвращаем HTML-элемент
    return greet;
}

greetContainer.append(prepareGreet(userName));

let currentState = [...items];


const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");


function renderItems(arr) {

    nothingFound.textContent = "";

    itemsContainer.innerHTML = "";

    arr.forEach((item) => {

        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}


function sortByAlphabet(a, b) {

    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}


renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {

    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;


    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
        const sheet = document.createElement("i");
        sheet.classList.add("fa-solid", "fa-leaf");
        ratingContainer.append(sheet);
    }

    const tagsHolder = item.querySelector(".tags");

    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });
    return item;
}


const searchInput = document.querySelector("#search-input");

const searchButton = document.querySelector("#search-btn");


function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
}


searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {

    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});