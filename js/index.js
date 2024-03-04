
const displayData = document.getElementById('display-post');
const postCardData = document.getElementById('post-card');


//All post function and fetch api

const loadData = async (catagoryName) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${catagoryName}`);
    const data = await res.json();
    const newsData = data.posts;
    // console.log(newsData)
    displayPost(newsData)
}

const displayPost = async (postData) => {
    // console.log(postData)
    displayData.textContent = '';


    postData.forEach((item) => {
        // console.log(item)
       
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="new-cont basis-[60%] mb-6 bg-[#f3f3f5] hover:bg-[#797DFC1A] transition  flex flex-col lg:flex-row justify-start gap-5 rounded-3xl p-5 lg:p-10">
        <!-- profile Image -->
        <div class="prifile">
          <div class="bg-white relative rounded-[16px] w-[4rem] h-[4rem]">
            <img class="w-full h-full object-cover rounded-[16px]" src="${item.image}" alt="">
            <!-- active icon  -->
            <div class="${
              item.isActive ? "active_status" : "deactive_status"
            }"></div>
          </div>
        </div>
        <!-- news content  -->
        <div>
          <!-- author and tag -->
          <div class="flex gap-4 mb-[10px]">
            <p class="text-[#12132dcc] inter-font text-[14px] font-[500]">#${item.category}</p>
            <p class="text-[#12132dcc] inter-font text-[14px] font-[500]">Author: ${item.author.name}</p>
          </div>
          <div>
            <h2 class="font-bold mulish-font mb-[15px] text-[18px]">${item.title}</h2>
            <p class="text-sm lg:text-base">${item.description}</p>
          </div>
          <div class="deshe-border my-[18px]"></div>
          <!-- card bottom  -->
          <div class="flex justify-between pt-3">
            <div class="flex flex-col lg:flex-row gap-3 lg:gap-6">
              <div class="flex gap-3">
                <img src="./images/msg.png" alt="">
                <p class="text-base font-normal inter-font text-[#12132D99]">${item.comment_count}</p>
              </div>
              <div class="flex gap-3">
                <img src="./images/eye.png" alt="">
                <p class="text-base font-normal inter-font text-[#12132D99]">${item.view_count}</p>
              </div>
              <div class="flex gap-3">
                <img src="./images/time.png" alt="">
                <p class="text-base font-normal inter-font text-[#12132D99]">${item.posted_time} min</p>
              </div>
            </div>
            <button id="append-btn" onclick="markReadPost('${item.title.replace("'","")}', '${item.view_count}')" class="cursor-pointer"><img src="./images/email-btn.png" alt=""></button>
          </div>
        </div>
      </div>
        `;

        setTimeout(() => {
          loadingSpinner(false);
        }, 2000);

        displayData.appendChild(createDiv)
    });
};

const searchFunction = async () => {
  loadingSpinner(true)
    const inputText = document.getElementById('search-input').value;
      if(inputText == ''){
        alert('Please enter text...')
      }
      else{
        loadData(inputText)
      }
}
// searchFunction()

const loadingSpinner = (showSpinner) => {
  const spinnerID = document.getElementById('loader-spinner')
  if(showSpinner){
    spinnerID.classList.remove('hidden')
  }
  else{
    spinnerID.classList.add('hidden')
  }
}


const markReadPost = (title, view) => {
// console.log(title)
// console.log(view)

  const appendData = document.getElementById('append-data')
  const countNum = document.getElementById('count-num')
  const appendDiv = document.createElement('div')
  appendDiv.innerHTML = `
    <div class="flex justify-between items-center bg-white rounded-[16px] mb-3 p-[14px]">
    <h4 class="basis-[70%] text-base font-[600]">${title}</h4>
    <div class="basis-[30%] flex items-center gap-1 justify-end">
      <img src="./images/eye.png" alt="">
      <span>${view}</span>
    </div>
    </div>
  `;
  appendData.appendChild(appendDiv)
  let readNum = parseInt(countNum.innerText)
  countNum.innerText = readNum + 1;
}
// markReadPost()

loadData("")


// All Letest post fetch and display data
const latestPostData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const latestPost = await data;
    // console.log(latestPost)
    showPostData(latestPost)
}

const showPostData = async (latestData) => {
    // console.log(latestData)

    latestData.forEach((card) => {
        // console.log(card)

        const createPostCard = document.createElement('div');
        createPostCard.innerHTML = `
        <div class="card w-full lg:w-96 bg-base-100 hover:bg-slate-100 border-2 shadow-xl">
        <figure class="mx-6 mt-6 rounded-2xl"><img  src="${card.cover_image}" alt="image" /></figure>
        <div class="card-body mulish-font">
          <div class="flex gap-2">
            <img src="./images/cal-icon.png" alt="">
            <p class="text-base font-normal text-[#12132D99]">${card?.author?.posted_date || "No Date Available"}</p>
          </div>
          <h2 class="card-title text-lg mulish-font font-extrabold text-[#12132D]">${card.title}</h2>
          <p class="text-base font-normal mulish-font text-[#12132D99]">${card.description}</p>
          <div class="card-actions justify-start">
            <div class="mt-4 flex gap-4">
            <div class="w-11 h-11 rounded-full">
            <img class="rounded-full" src="${card.profile_image}" alt="">
            </div>
              <div>
                <h1 class="text-base mulish-font font-bold text-[#12132D]">${card.author.name}</h1>
                <p class="text-sm mulish-font font-normal text-[#12132D99]">${card?.author?.designation || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
        postCardData.appendChild(createPostCard)
    })
}

latestPostData();