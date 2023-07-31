window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  const navbar = document.getElementById("navbar");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      navbar.style.boxShadow = "0 0 10px #888888";
  } else {
      navbar.style.boxShadow = "";
  }
}
function generateHtml() {

  fetch('/x.json')
          .then((response) => response.json())
          .then((D) => {
            console.log("Got data from x.json:", D);
            var xyz =JSON.parse(D)

  // create the line
  const cont = document.createElement("notes-ai");
  const line = document.createElement("div");
  line.classList.add("line");

  const title = document.createElement("div");
  title.classList.add("h2-main-title");
  title.innerHTML = xyz.mainTitle;

  const parentElement = document.querySelector("#notes-ai");
  cont.appendChild(line);
  cont.appendChild(title);
  parentElement.appendChild(cont);

  const arr = [];
  arr.push(xyz);
  createContNMainTitle(xyz);
  document.getElementById("footer").style.display = "none";
  });
}


function createContNMainTitle(data) {
  let ccc = 0;
  for (const subTitle in data.subTitles) {
      ccc++;

      // create the container element and add the appropriate class
      const container = document.createElement("div");
      container.classList.add("note-cont");

      // create the header element and add the appropriate classes and content
      const header = document.createElement("div");
      header.classList.add("note-header");
      const headerContent = `
          <div style="display: flex; align-items: center;">
              <h4 style="margin-right: 5px;">Flash Card?</h4>
              <label class="switch">
              <input type="checkbox" value="checked" name="flash" id="${ccc}" onclick="blurFC(id)">
              <span class="slider round"></span>
              </label>
          </div>
          <h3 id="title-${ccc}">${subTitle}</h3>
          <button class="sound-img" onclick="playNote()" id="sound-1"><img src="images/icons8-speaker-64 (1) 1.png" alt=""></button>
      `;
      header.innerHTML = headerContent;

      // create the content element and add the appropriate class
      const content = document.createElement("div");
      content.classList.add("note");

      // loop through the notes for the current subtitle and create a paragraph element for each note
      for (const index in data.subTitles[subTitle]) {
          const note = document.createElement("p");
          note.textContent = index + ": " + data.subTitles[subTitle][index] + ".";
          content.appendChild(note);
      }
      content.setAttribute("id", `id-${ccc}`);

      // append the header and content elements to the container element
      container.appendChild(header);
      container.appendChild(content);

      // append the container element to the parent element in the HTML document
      const parentElement = document.querySelector("#notes-ai");
      parentElement.appendChild(container);
  }
}

function blurFC(buttonId) {
  const title = document.getElementById(`title-${buttonId}`);
  const originalTitle = title.textContent;
  if (document.getElementById(buttonId).checked) {
      title.innerHTML = "\"Here is the generated question\"";
      document.getElementById(`id-${buttonId}`).style.color = "transparent";
      document.getElementById(`id-${buttonId}`).style.textShadow = "0 0 20px #000";
  } else {
      title.innerHTML = originalTitle;
      document.getElementById(`id-${buttonId}`).style.color = "";
      document.getElementById(`id-${buttonId}`).style.textShadow = "";
  }  
}
function playNote(){
  let aud = new Audio("output.mp3");
  aud.play();
}
module.exports = {
  scrollFunction,
  generateHtml,
  createContNMainTitle,
  blurFC
};