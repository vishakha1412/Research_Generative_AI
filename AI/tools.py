from langchain.tools import tool
import requests
from bs4 import  BeautifulSoup
from dotenv import load_dotenv
from rich import print
from tavily import TavilyClient
import os
load_dotenv()

  

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@tool
def web_search(query:str)->str:
    """Search the web for the given query and  reliable information on atopic, Return Titles ,URL """
    response=tavily_client.search(query=query, max_results=5,search_depth="advanced")
    out=[]
    for r in response['results']:
        out.append( 
            f"Title:{r['title']}\n URL:{r['url']}\n Snippet:{r['content'][:300]}\n"
        )
    return "\n-----\n".join(out)
     

#print(web_search.invoke("What is the  news of war?"))


@tool
def scrape_url(url:str) -> str:
    """
    Extracts main content from a webpage (paragraphs + headings)
    """
    try:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        res = requests.get(url, headers=headers, timeout=10)
        res.raise_for_status()

        soup = BeautifulSoup(res.text, "lxml")

       
        content = []

        for tag in soup.find_all(["script", "style", "nav", "footer"]):
            text = tag.get_text(strip=True)
            if text:
                content.append(text)

        final_text = " ".join(content)

        return final_text[:3000]
    except Exception as e:
        return f"Error: {str(e)}"