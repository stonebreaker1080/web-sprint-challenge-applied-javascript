import axios from "axios"


const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  
  
  let divCard = document.createElement("div")
  let divHeadline = document.createElement('div')
  let divAuthor = document.createElement('div')
  let divImg = document.createElement("div")
  let imgTag = document.createElement("img")
  let spanAuthorName = document.createElement("span")

  divCard.classList.add("card")
  divHeadline.classList.add("headline")
  divHeadline.textContent = article.divHeadline
  divAuthor.classList.add("author")               
  divHeadline.textContent = article.headline
  divImg.classList.add("img-container")
  imgTag.src = article.authorPhoto
  spanAuthorName.textContent = `By ${article.authorName}`
  
  divCard.appendChild(divHeadline)
  divCard.appendChild(divAuthor)
  divAuthor.appendChild(divImg)
  divImg.append(imgTag)
  divAuthor.appendChild(spanAuthorName)

  divCard.addEventListener('click', () => {
    console.log(article.headline)
  })
  return divCard
}

Card({"headline":"Bootstrap 5: Get a Sneak Peak at all the New Features",
"authorPhoto": "https://tk-assets.lambdaschool.com/1891c758-b3f4-4ec7-9d88-590bf7c7ceb2_fido.jpg",
"authorName": "FIDO WALKSALOT"})

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  const apiURL = "http://localhost:5001/api/articles"
  const filterText = "articles"
  
  axios.get(apiURL)
  .then(resp => {
      
      const articles = resp.data.articles
      const topic_keys = Object.keys(resp.data.articles)

      topic_keys.forEach(topic => {
        articles[topic].forEach(article => {
          document.querySelector(selector).appendChild(Card(article))
        })
      })
      
    })
    .catch(err => {
      console.error(err)
    })

    // const appendCard = Card(articles)
    //     document.querySelector(selector).appendChild(appendCard)
}


export { Card, cardAppender }
