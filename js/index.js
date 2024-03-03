
const displayData = document.getElementById('display-post')


//All post function and fetch api

const loadData = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const newsData = data.posts;
    // console.log(newsData)
    displayPost(newsData)
}

const displayPost = async (postData) => {
    // console.log(postData)



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
            <div class="active_status"></div>
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
            <button class="cursor-pointer"><img src="./images/email-btn.png" alt=""></button>
          </div>
        </div>
      </div>
        `;
        displayData.appendChild(createDiv)

    });
};


loadData()


