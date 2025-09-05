const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displaylessons(json.data));
};

const removeActive = () => {
  const lessonbuttons = document.querySelectorAll(".lesson-btn");
  lessonbuttons.forEach((btn) => btn.classList.remove("active"));
};

const loadaLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clikBtn = document.getElementById(`lesson-btn-${id}`);
      clikBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("detsils-container");
  detailsBox.innerHTML = `
               <div class="">
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Synonym</h2>
                    <div class="">${createElements(word.synonyms)}</div>
                </div>
    `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContaner = document.getElementById("word-Container");
  wordContaner.innerHTML = "";

  if (words.length == 0) {
    wordContaner.innerHTML = `
        <div class="text-center col-span-full py-5">
           <img src="./assets/alert-error.png" class="mx-auto" alt="">
            <p class="font-bangla font-medium text-xl text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-4xl font-bold mt-5">নেক্সট Lesson এ যান</h2>
        </div>
        `;
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 h-full">
            <h2 class="font-bold text-2xl">${
              word.word ? word.word : "শব্দ পাওয়া যায়নি"
            }</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bold text-2x font-bangla">${
              word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
            } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${
                  word.id
                })" class="btn bg-[#1A91ff10] hover:bg-[#1A91ff80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91ff10] hover:bg-[#1A91ff80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        
        `;
    wordContaner.append(card);
  });
};

const displaylessons = (lessons) => {
  const levelContiner = document.getElementById("lavel-container");
  levelContiner.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
       <button id="lesson-btn-${lesson.level_no}" onclick="loadaLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn" ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;
    levelContiner.append(btnDiv);
  }
};

loadlessons();
