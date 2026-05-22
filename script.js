const dayQuote = document.getElementById("dayQuote")
const dayAuthor = document.getElementById("dayAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const randomQuote =document.getElementById("randomQuote");
const randomAuthor =document.getElementById("randomAuthor");


async function getQuoteDay(){

    const url="https://api.freeapi.app/api/v1/public/quotes";

    try{

        dayQuote.innerText="Loading quote...";
        dayAuthor.innerText="";

        const response=await fetch(url);

        if(!response.ok){
            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        const json=await response.json();

        const quotes=json?.data?.data;

        const today=new Date();

        const daySeed=
        today.getDate()+
        today.getMonth()+
        today.getFullYear();

        const quoteIndex=
        daySeed % quotes.length;

        const todaysQuote=
        quotes[quoteIndex];

        dayQuote.innerText=
        todaysQuote.content;

        dayAuthor.innerText=
        todaysQuote.author;

    }

    catch(err){

        dayQuote.innerText=
        "Unable to load quote";

        dayAuthor.innerText="";

        console.log(err);

    }
}
getQuoteDay();

async function getTopQuotes(){

    const url = "https://api.freeapi.app/api/v1/public/quotes";

    try{

        const response = await fetch(url);

        if(!response.ok){
            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        const json = await response.json();

        const quotes = json?.data?.data;

        const topQuotesList =
        document.getElementById(
            "topQuotesList"
        );

        topQuotesList.innerHTML = "";

        const top5 = quotes.slice(0,5);

        top5.forEach((quote)=>{

            const li =
            document.createElement("li");

            li.innerHTML = `
            "${quote.content}"
            <br>
            <small>
            - ${quote.author}
            </small>
            `;

            topQuotesList.appendChild(li);

        });

    }

    catch(err){

        console.log(err);

    }

}

getTopQuotes();


async function getRandomQuote(){
    const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
    try{
        randomQuote.innerText= "Loading quote..."
        let response = await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const json = await response.json();  
          
        randomQuote.innerText= json?.data?.content;
        randomAuthor.innerText= json?.data?.author; 
        
    }
    catch(err){
        randomQuote.innerText= "Unable to load quote. Try again.";
         randomAuthor.innerText= "";
        console.log(err);
    }
}
newQuoteBtn.addEventListener("click", getRandomQuote);
getRandomQuote();
