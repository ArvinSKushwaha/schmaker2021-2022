function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

// if (window.mobileCheck()) {
//     toggleFullScreen();
// }
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

let classes = [];
let sem1Classes = [];
let sem1ClassDiv = document.getElementById('sem1-class-list_');
let sem2Classes = [];
let sem2ClassDiv = document.getElementById('sem2-class-list_');

const full = `\u{25CF}`, half = `\u{25D6}`;

const classSelector = document.getElementById('class-selector');
const classOptions = document.getElementById("class-options");
const schoolSetting = document.getElementById("set-school");
const semSetting = document.getElementById("set-semester");
const searchBar = document.getElementById("class-searchbox");
const fieldOptions = document.getElementById("field-select");
const menu = document.getElementById("title-bar");
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
        sem1ClassDiv.parentElement.classList.remove("show");
        sem2ClassDiv.parentElement.classList.add("show");
    }
    else {
        document.getElementById("semester-setting").innerHTML = "Semester 1";
        sem1ClassDiv.parentElement.classList.add("show");
        sem2ClassDiv.parentElement.classList.remove("show");
    }
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
        node.classList.add('class-block');
        node.classList.add('text-center');
        node.classList.add('p-2');
        node.classList.add('w-full');
        node.innerHTML = `<b>${element.class_code}</b> ${element.class_name}`;
        let rating = Math.round(element.class_rating * 2);
        node.title = `Rating: ${full.repeat(Math.floor(rating / 2)) + half.repeat(rating % 2)} (${element.class_rating.toPrecision(2)})\n${element.class_summary}`;
        node.setAttribute("data-toggle", "tooltip");
        let wrapNode = document.createElement('div');
        wrapNode.append(document.createElement('hr'), node, document.createElement('hr'));
        classOptions.append(wrapNode);
        node.addEventListener('click', (ev) => {
            if (semSetting.checked) {
                sem2Classes.push(element);
            }
            else {
                sem1Classes.push(element);
            }
            updateSemesterClasses();
        });
    });
}

window.onload = () => {
    setTimeout(() => { document.getElementsByTagName("header")[0].classList.add("hide"); }, 300);
    setTimeout(() => { document.getElementById("class-selector").classList.add("hide"); }, 800);
    setOptions(classes);
};

function updateSemesterClasses() {
    sem1ClassDiv.innerHTML = "";
    sem2ClassDiv.innerHTML = "";

    sem1Classes.forEach(element => {
        let node = document.createElement('div');
        node.classList.add('class-block');
        node.classList.add('text-center');
        node.classList.add('p-2');
        node.classList.add('w-full');
        node.innerHTML = `<b>${element.class_code}</b> ${element.class_name}`;
        let rating = Math.round(element.class_rating * 2);
        node.title = `Rating: ${full.repeat(Math.floor(rating / 2)) + half.repeat(rating % 2)} (${element.class_rating.toPrecision(2)})\n${element.class_summary}`;
        node.setAttribute("data-toggle", "tooltip");
        let wrapNode = document.createElement('div');
        wrapNode.append(document.createElement('hr'), node, document.createElement('hr'));
        sem1ClassDiv.append(wrapNode);
        node.addEventListener('click', (ev) => {
            sem1Classes.splice(Array.prototype.indexOf.call(sem1ClassDiv.children, node.parentElement), 1);
            updateSemesterClasses();
        });
    });

    sem2Classes.forEach(element => {
        let node = document.createElement('div');
        node.classList.add('class-block');
        node.classList.add('text-center');
        node.classList.add('p-2');
        node.classList.add('w-full');
        node.innerHTML = `<b>${element.class_code}</b> ${element.class_name}`;
        let rating = Math.round(element.class_rating * 2);
        node.title = `Rating: ${full.repeat(Math.floor(rating / 2)) + half.repeat(rating % 2)} (${element.class_rating.toPrecision(2)})\n${element.class_summary}`;
        node.setAttribute("data-toggle", "tooltip");
        let wrapNode = document.createElement('div');
        wrapNode.append(document.createElement('hr'), node, document.createElement('hr'));
        sem2ClassDiv.append(wrapNode);
        node.addEventListener('click', (ev) => {
            sem2Classes.splice(Array.prototype.indexOf.call(sem2ClassDiv.children, node.parentElement), 1);
            updateSemesterClasses();
        });
    });
}

menu.addEventListener('click', (ev) => {
    menu.children[0].classList.toggle('active');
    menu.children[1].classList.toggle('active');
    menu.children[2].classList.toggle('active');
    classSelector.classList.toggle('show');
});

// TODO: Incorporate Reviews (https://docs.google.com/spreadsheets/d/1vl9yanT3pBKm7gjQ9vg2buQ-ODigVwK9KOueupdrmHE/edit?fbclid=IwAR14ClyitziJAH7NLtS2XbiTnnDRnIplGOJQF_YL0HTulFYr9ovgkZWbUog#gid=1484999672)