//#region assignments
/**
 * see opdracht 1 description
 * @see opdracht 1 description
 * @returns unordered list
 */
function topGeschenker() {
  const results = [];
  let index = 1;
  while (index < 101) {
    const indexString = index.toString();
    const [isModulus3, isModulus5] = [index % 3 === 0, index % 5 === 0];
    if (isModulus3 && isModulus5) {
      results.push(`Topgeschenken${indexString}`);
    } else if (isModulus3) {
      results.push(`Top${indexString}`);
    } else if (isModulus5) {
      results.push(`geschenken${indexString}`);
    } else {
      results.push(indexString);
    }

    index++;
  }

  const columnItems = results.map((result) => `<li class='column__item'>${result}</li>`).join("");
  return `<ul class='column__outer'>${columnItems}
    </ul>`;
}

/**
 * @returns an HTML string, a form with an input, label and submit button.
 * @see opdracht 2 description
 * @see stringReverseInteraction
 */
function stringReverse() {
  return `
    <form id='string-reverse-form' class='form__self' action='#'>
      <label class='form__label' for='reverse-me'>Probeer je emoji's maar ;) 😶<br>
        <input id='reverse-me' class='form__input form__input--text' type='text'>
      </label>
      <input type='submit' value='draai om' class='form__input form__input--submit'>
    </form>
    <span id='string-reverse-print-target'></span>
  `;
}
/**
 * interaction layer of stringReverse
 * on form submit, create array, reverse and print form input to result span.
 * @see stringReverse
 * @returns void
 */
function stringReverseInteraction() {
  const stringReverseForm = document.getElementById("string-reverse-form");
  const stringReversePrintTarget = document.getElementById("string-reverse-print-target");
  const stringReverseInput = document.getElementById("reverse-me");

  stringReverseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // dont split value string but create array. split splits emojis.
    // 🐱‍👓 is a combined emoji and thus wont work because it is 👓‍🐱.
    stringReversePrintTarget.innerHTML = Array.from(stringReverseInput.value)
      .reverse()
      .join("");
  });
}

/**
 * from an initial array with arrays of numbers, shaped like a matrix, creates a right and left flipped table.
 *
 * @see opdracht 4 description
 *
 * @returns string 3 HTML tables
 */
function roteerArray() {
  const initialArray = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
  ];
  const initialTable = createTableFromArray(initialArray, "initial");
  const arrayToRight = rotateArray(initialArray, "to-right");
  const rightTable = createTableFromArray(arrayToRight, "right");
  const arrayToLeft = rotateArray(initialArray, "to-left");
  const leftTable = createTableFromArray(arrayToLeft, "left");
  return `${initialTable} ${rightTable} ${leftTable}`;
}

/**
 * 'Flips' array on either side
 *
 * @param {*} nestedArray
 * @param {*} horizontalDirection
 * @returns array nestedArray
 */
function rotateArray(nestedArray, horizontalDirection) {
  if (!["to-right", "to-left"].includes(horizontalDirection)) {
    throw new Error("horizontalDirection not set or invalid");
  }
  validateNestedArray(nestedArray);
  const lengthOfOuter = nestedArray.length;
  const lengthOfInner = nestedArray[0].length;
  const resultArray = [];
  if (horizontalDirection === "to-right") {
    for (let i = 0; i < lengthOfInner; i++) {
      const innerResult = [];
      for (let j = 0; j < lengthOfOuter; j++) {
        innerResult.push(nestedArray[j][i]);
      }
      resultArray.push(innerResult);
    }
  } else {
    for (let i = lengthOfInner - 1; i >= 0; i--) {
      const innerResult = [];
      for (let j = 0; j < lengthOfOuter; j++) {
        innerResult.push(nestedArray[j][i]);
      }
      resultArray.push(innerResult);
    }
  }
  return resultArray;
}

/**
 * map/join reduces table to rows, to cells.
 *
 * @param {tableableArray} array tableableArray
 * @param {tableName} string
 * @throws if tableableArray is not array, sub arrays are not arrays, or contain non-numbers; or table name missing
 * @returns string tableHTML
 */
function createTableFromArray(tableableArray, tableName) {
  if (!tableName) {
    throw new Error("missing table name");
  }
  validateNestedArray(tableableArray);
  return `
  <div class='array-table__outer'>
    <h3 class='array-table__heading'>${tableName} table</h3>
    <table class='array-table__self array-table__self--${tableName}'>
    ${tableableArray
      .map((row) => {
        return `<tr class='array-table__row array-table__row--${tableName}'>${row
          .map((cell) => {
            return `<td class='array-table__cell array-table__cell--${tableName}'>${cell}</td>`;
          })
          .join("")}</tr>`;
      })
      .join("")}
    </table>
  </div>`;
}
/**
 * helper validations
 * @throws if nestedArray is not array, sub arrays are not arrays, or contain non-numbers.
 * @param {*} nestedArray
 */
function validateNestedArray(nestedArray) {
  if (
    !Array.isArray(nestedArray) ||
    nestedArray.map((arrItem) => Array.isArray(arrItem)).includes(false) ||
    nestedArray.map((arrItem) => isNaN(arrItem.reduce((prev, next) => prev + next, 0))).includes(true)
  ) {
    throw new Error("table from array input is corrupt");
  }
}

//#endregion assignments
//#region content

/**
 * Array with data per section.
 * title: string
 * substitle?: string
 * content: string[]
 * assignment: Function
 * assignmentInteraction?: Function
 */
const content = [
  {
    title: "Opdracht 0: Maak een PHP app en laat zien hoe je Vue gebruikt.",
    subtitle: "TL:DR; dit wordt geen Vue app",
    content: [
      `Ik ga met jullie welnemen de proefopdracht even herinterpreteren. Ik denk dat jullie noch ik er veel aan hebben als ik dit uitvoer zoals gegeven. Opdracht 3 vereist een gebruikerssysteem optuigen en dat is mij way out of scope voor een frontend testopdracht. Een eigen auth bouwen vind ik sowieso nooit een goed idee, dat laat ik altijd aan een framework of een library over.`,
      `Dit is ook geen Vue app. Er is geen reden dit in Vue te bouwen. Vue is een oplossing voor een probleem dat hier niet is, namelijk, een dynamische frontend, specifiek een verandering in de datalaag die een herbouw van de frontend veroorzaakt. Althans, er zijn kleine veranderingen die optreden, maar die rechtvaardigen niet het gebruik een een zwaar middel als Vue. De performance van deze proefopdracht is redelijk hoog. Voor het scheiden van tekst, opdrachten en de UI laag knutselde ik hieronder zelf wat in elkaar.`,
    ],
  },
  {
    title: "Opdracht 1: De TopGeschenker",
    content: [
      `Maak een functie die alle nummers van 1 tot 100 onder elkaar opsomt. Maar, voor elk meervoud van 3 (3,6, ...) plaats je "Top". Voor elk meervoud van 5 (5,10, ...) plaats je "geschenken" en voor alle cijfers die in de tafel van 3 én 5 zitten (bv 15) plaats je "Topgeschenken".`,
    ],
    assignment: topGeschenker,
  },
  {
    title: "Opdracht 2: String reverse",
    subtitle:
      "Ik heb jullie wel door 😁 Hier een vraag terug: welke klasse emoji's sloopt <em>alsnog</em> deze oplossing?",
    content: [
      `Maak eenformulier met een input waar we een waarde in kunt voeren,waarna submitten de reverse van die input op het scherm komt, eg: ‘abc123🤓’-> ‘🤓312cba’`,
    ],
    assignment: stringReverse,
    interaction: stringReverseInteraction,
  },
  {
    title: "Opdracht 3: Wachtwoord vergeten",
    content: [
      `Maak een ‘wachtwoord vergeten’ pagina waar een gebruiker zijn/haar wachtwoord kan resetten. Je mag (indien gewenst) zelfeen basis User entiteitmaken en daaropverderbouwen.`,
    ],
    assignment: function() {
      return "Zie de tekst bij opdracht 0";
    },
  },
  {
    title: "Opdracht 4: Roteer een array een kwartslag",
    content: [
      `Maak een functie welke eenarray met array’s als input krijgt (e.g.: [[1,2,3],[4,5,6],[7,8,9]]), van minimaal3*3 groot, en deze een kwartslag draait. Er is een bonuspuntals de functie beide kanten op kan draaien.`,
    ],
    assignment: roteerArray,
  },
];
//#endregion content
//#region UI layer

/**
 * maps, joins, prints all sections
 * @param {sectionDataArray} content of sections
 * @param {HTMLDivElement} topApp app el ref
 */
function processAllSections(content, topApp) {
  const sections = content.map(printSingleSection).join("");
  topApp.innerHTML = `<main class='section__outer'>${sections}</main>`;
  // now add the interactions if they exist.
  content.forEach((section, sectionIndex) => {
    if (!section.interaction) {
      return;
    }
    if (typeof section.interaction !== "function") {
      throw new Error(`interaction of section ${sectionIndex} is not a function`);
    }
    section.interaction();
  });
}
/**
 *
 * @param {title, ?subtitle, content, assignment} sectionData title and content are mandatory, subtitle and assignment optional. Assignment must be function.
 * @param {*} sectionIndex used to set headingType
 * @throws when title or content falsy, assignment is not a function or does not return a string.
 */
function printSingleSection(sectionData, sectionIndex) {
  if (!sectionData.title || !sectionData.content) {
    throw new Error(`section title not set of section${sectionIndex} `);
  }
  let assignmentHTML = "";
  if (sectionData.assignment) {
    if (typeof sectionData.assignment !== "function") {
      throw new Error(`assignment of section ${sectionIndex} is not a function`);
    }
    const assignmentResult = sectionData.assignment();
    if (typeof assignmentResult !== "string") {
      throw new Error(`assignmentresult of section ${sectionIndex} is not a string`);
    }
    assignmentHTML = `<div class='section__content section__content--assignment-result'>
    ${assignmentResult}</div>`;
  }

  const headingType = sectionIndex < 1 ? "1" : "2";

  const sectionContentHTML = `<p class='section__content section__content--intro'>${sectionData.content.join(
    "<br>"
  )}</p>`;
  const sectionSubtitle = sectionData.subtitle ? `<span class='section__subtitle'>${sectionData.subtitle}</span>` : "";

  return `
    <section class='section__self'>
      <header class='section__header'>
        <h${headingType} class='section__heading section__heading--${headingType}'>${sectionData.title}</h${headingType}>
        ${sectionSubtitle}
      </header>
      
      ${sectionContentHTML}
      
      ${assignmentHTML}
      
    </section>
  `;
}

//#endregion UI LAYER

function init() {
  const topApp = document.getElementById("top-app");
  processAllSections(content, topApp);
}

init();
