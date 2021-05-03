class Class {
    constructor(class_name, class_code) {
        this.class_code = class_code;
        this.class_name = class_name;
        this.class_rating = null;
        this.class_summary = null;
        this.field = null;
        this.offered = null;
        this.sem1ResMeet = [];
        this.sem2ResMeet = [];
    }
}

const classes = [];

const full = `\u{25CF}`, half = `\u{25D6}`;

const classOptions = document.getElementById("class-options");
const schoolSetting = document.getElementById("set-school");
const semSetting = document.getElementById("set-semester");
const searchBar = document.getElementById("class-searchbox");
const fieldOptions = document.getElementById("field-select");
const url = 'https://uniapp.ncssm.edu/registrar/catalog/course_catalog_beta1.3.1.php';

let sem1ResMeetData, sem2ResMeetData;
const sem1Res = 'https://docs.google.com/spreadsheets/d/1yQx8Hj95IlI_vhlv_2lFZm2bL__8Zx1c85e-O_d821w/edit#gid=0';
const sem2Res = 'https://docs.google.com/spreadsheets/d/1yQx8Hj95IlI_vhlv_2lFZm2bL__8Zx1c85e-O_d821w/edit#gid=501332295';

sheetrock({
    url: sem1Res,
    callback: (error, options, response) => {
        sem1ResMeetData = response;
    }
});

sheetrock({
    url: sem2Res,
    callback: (error, options, response) => {
        sem2ResMeetData = response;
    }
});

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
    })
    .then(data => {
        document.getElementById('loading-panel').classList.add('opacity-0');
        setTimeout(() => { document.getElementById('loading-panel').hidden = true; }, 1000);
        let doc = document.createElement('html');
        doc.innerHTML = data.contents;
        let clss = doc.getElementsByClassName("results_list");
        // console.log(clss);
        for (let index = 0; index < clss.length; index++) {
            let cls = clss[index];
            let clsname = cls.innerText;
            let code = clsname.split(" ", 1)[0].trim();
            let class_summary = cls.dataset.description;
            let field = cls.classList[5];
            let offered = cls.className;
            cls = new Class(clsname.replaceAll(code, "").trim(), code);
            cls.class_rating = 0;
            cls.class_summary = class_summary;
            cls.field = field.replaceAll("_", " ");
            cls.offered = offered;
            if (cls.offered.includes('schl_1')) {
                
            }
            classes.push(cls);
        }
        setOptions(classes);
        populateFields(classes);
    });

function populateFields(classList) {
    fields = new Set([" - No Selection - "]);
    classList.forEach(element => {
        fields.add(element.field);
    });
    fields.forEach(element => {
        let option = new Option();
        option.innerHTML = element;
        option.value = element.replaceAll(" ", "_");
        fieldOptions.appendChild(option);
    });
}

fieldOptions.addEventListener("change", (ev) => {
    setOptions(classes);
});

schoolSetting.addEventListener("change", (ev) => {
    if (schoolSetting.checked) {
        document.getElementById("school-setting").innerHTML = "Online";
    }
    else {
        document.getElementById("school-setting").innerHTML = "Residential";
    }
    setOptions(classes);
});

semSetting.addEventListener("change", (ev) => {
    if (semSetting.checked) {
        document.getElementById("semester-setting").innerHTML = "Semester 2";
    }
    else {
        document.getElementById("semester-setting").innerHTML = "Semester 1";
    }
    setOptions(classes);
});

searchBar.addEventListener("input", (ev) => {
    setOptions(classes);
});

function setOptions(classList) {
    classOptions.innerHTML = "";
    if (fieldOptions.value == '_-_No_Selection_-_' || fieldOptions.value == "") {
        classList = classList;
    }
    else {
        classList = classes.filter(value => {
            return value.field == fieldOptions.value.replaceAll("_", " ");
        });
    }
    let lower = searchBar.value.toLowerCase();
    classList = classList.filter(value => {
        return value.class_code.toLowerCase().includes(lower) || value.class_name.toLowerCase().includes(lower);
    })
    classList = classList.filter(value => {
        if (schoolSetting.checked) {
            return value.offered.includes("schl_2");
        }
        else {
            return value.offered.includes("schl_1");
        }
    });
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

window.onload = () => {
    setTimeout(() => { document.getElementsByTagName("header")[0].classList.add("hide"); }, 300);
    setTimeout(() => { document.getElementById("class-selector").classList.add("hide"); }, 800);
    setOptions(classes);
};