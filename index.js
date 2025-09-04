const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displaylessons(json.data));
};

const loadaLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url).then((res) => res.json()).then(data => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
    const wordContaner = document.getElementById("word-Container");
    wordContaner.innerHTML = "";

    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 h-full">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bold text-2x font-bangla">${word.meaning} / ${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91ff10] hover:bg-[#1A91ff80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91ff10] hover:bg-[#1A91ff80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        
        `;
        wordContaner.append(card);
    });

}

const displaylessons = (lessons) => {
  const levelContiner = document.getElementById("lavel-container");
  levelContiner.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
       <button onclick="loadaLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary" ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;
    levelContiner.append(btnDiv);
  }
};

loadlessons();
