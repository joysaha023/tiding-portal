

//All post function and fetch api

const loadData = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const newsData = data.posts;
    console.log(newsData)
}




loadData()