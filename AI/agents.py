from langchain_core.output_parsers import StrOutputParser
from langchain.agents import create_agent
from tools import scrape_url,web_search
from langchain_core.prompts import ChatPromptTemplate
from langchain_mistralai import ChatMistralAI
from dotenv import load_dotenv
import os
print("Loading environment variables...")
load_dotenv()
#steps
#first create agent
#write prompt for that agent 
# then make chain using agent,prompt, structure 

api_key=os.getenv("MISTRAL_API_KEY")

model = ChatMistralAI(api_key=api_key,max_tokens=1000)

def build_search_agent():
   return  create_agent(
     model=model,
     tools=[web_search]
)

search_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert research writer. Write clear, structured and insightful reports."),
    ("human", """Write a detailed research report on the topic below.

Topic: {topic}

Research Gathered:
{research}

Structure the report as:
- Introduction
- Key Findings (minimum 3 well-explained points)
- Conclusion
- Sources (list all URLs found in the research)

Be detailed, factual and professional."""),
])

writer_chain=search_prompt | model| StrOutputParser()

def build_reader_agent():
   return create_agent(
    model=model,
    tools=[scrape_url]
   )

scrap_prompt=ChatPromptTemplate.from_messages([
    ("system", "You are a sharp and constructive research critic. Be honest and specific."),
    ("human", """Review the research report below and evaluate it strictly.

Report:
{report}

Respond in this exact format:

Score: X/10

Strengths:
- ...
- ...

Areas to Improve:
- ...
- ...

One line verdict:
..."""),
])

critic_chain=scrap_prompt | model|StrOutputParser()