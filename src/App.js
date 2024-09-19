// import './App.css';
// import styles from  "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {MainContainer, ChatContainer, MessageList,Message,MessageInput,TypingIndicator} from "@chatscope/chat-ui-kit-react";
// import {useState} from 'react';
// const { GoogleGenerativeAI } = require("@google/generative-ai");


// const API_key = "AIzaSyCtzO_xT_AwLRCnzLBNqAoxz1SPLnjT7pU";

// const genAI = new GoogleGenerativeAI(API_key);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// function App() {
//   const [messages,setmessages] = useState([
//     {
//       message : "Hey, ask me anything",
//       sender : "gemini",
//       direction: "incoming"
//     }
//   ])
//   // const [typing,settype] = useState(false);
//   const handleSend = async (message) =>{
//       const newmessage ={
//         message: message,
//         sender: "user",
//         direction: "outgoing"
//       }

//       const newmessages = [...messages,newmessage];

//       setmessages(newmessages);
//       // await processMessage(newmessages);
//       await modelrespon(message);
//       // settype(true);
//   }
//   async function modelrespon(message) {
//     const repo = await model.generateContent(message);
//     console.log(repo.response);
//   }
//   // async function processMessage(newmessages) {
//   //   let apimessage = newmessages.map((mess) =>{
//   //     let role ="";

//   //     if(mess.sender === "user"){
//   //       role = "user";
//   //     }
//   //     else{
//   //       role = "model";
//   //     }
//   //     return {role:role, parts : [{text:mess.message}]}

//   //   });



    

//   // }

  

//   return (
//     <div className="App">
//       <div style={{position : "relative",left:"25vw",top:"1vh", height: "98vh",width:"50vw"}}>
//       <MainContainer>
//         <ChatContainer>
//           <MessageList>
            
//             {messages.map((message,i) =>{
//                 return <Message key={i} model={message}/>
//             })}
      
//           </MessageList>
//           <MessageInput placeholder='type here' onSend={handleSend}/>
//         </ChatContainer>
//       </MainContainer>
//       </div>

//     </div>
//   );
// }

// export default App;

import './App.css';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");


const API_key = "AIzaSyCtzO_xT_AwLRCnzLBNqAoxz1SPLnjT7pU";
const genAI = new GoogleGenerativeAI(API_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hey, ask me anything",
      sender: "gemini",
      direction: "incoming"
    }
  ]);
  const [typing, setTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);

    await modelrespon(message);
    setTyping(false);
  };

  async function modelrespon(message) {
    try {
      const repo = await model.generateContent(message);
      console.log(repo.response.text());
      const geminiResponse = {
        message: repo.response.text(), // Adjust to match the API's actual response format
        sender: "gemini",
        direction: "incoming"
      };
      setMessages(prevMessages => [...prevMessages, geminiResponse]);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  }

  return (
    <div className="App">
      <div style={{ position: "relative", left: "25vw", top: "1vh", height: "98vh", width: "50vw" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
              {typing && <TypingIndicator content="Gemini is typing..." />}
            </MessageList>
            <MessageInput placeholder='Type here' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;

