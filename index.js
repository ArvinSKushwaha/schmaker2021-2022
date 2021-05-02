const classes = [
    { class_name: "STEM and the Stage", class_code: "EN3040", class_rating: 3.5, class_summary: "This class explores the use of theatre as a means to better understand the role of literature in understanding STEM concepts. We will read and analyze Copenhagen, Arcadia, The Life of Galileo, and Picasso"},
    { class_name: "Complex Systems and Modern Networks", class_code: "MA4320", class_rating: 5, class_summary: "This class investigates how we can use mathematics to explore real-life phenomena." }
];

const full = `\u{25CF}`, half = `\u{25D6}`;

const classOptions = document.getElementById("class-options");
const searchBar = document.getElementById("class-searchbox");

const Http = new XMLHttpRequest();
const url = 'https://uniapp.ncssm.edu/registrar/catalog/course_catalog_beta1.3.1.php';
Http.open("GET", url);
Http.withCredentials = true;
Http.setRequestHeader("Content-Type", "text/plain");
Http.send();

Http.onreadystatechange = (e) => {
    console.log(Http.responseText);
};

function setOptions(classList) {
    classOptions.innerHTML = "";
    classList.forEach(element => {
        let node = document.createElement('div');
        node.classList.add('text-center');
        node.classList.add('p-2');
        node.classList.add('w-full');
        node.innerHTML = `<b>${element.class_code}</b> ${element.class_name}`;
        let rating = Math.round(element.class_rating * 2);
        node.title = `Rating: ${full.repeat(Math.floor(rating / 2)) + half.repeat(rating % 2)} (${element.class_rating.toPrecision(2)})\n${element.class_summary}`;
        node.setAttribute("data-toggle", "tooltip");
        classOptions.appendChild(document.createElement('hr'));
        classOptions.appendChild(node);
        classOptions.appendChild(document.createElement('hr'));
    });
}

searchBar.addEventListener("input", event => {
    let lower = searchBar.value.toLowerCase();
    setOptions(classes.filter((value, index, array) => {
        return value.class_code.toLowerCase().includes(lower) || value.class_name.toLowerCase().includes(lower);
    }));
});

setOptions(classes);