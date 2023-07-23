import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LogOut from "./LogOut";
import ChatInput from "./ChatInput";
import { sendMsgRoute, getAllMsgsRoute } from "../utils/APIroutes";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [formattingoption, setFormattingoption] = useState("");
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    strikeThrough: false,
    codeSnippet: false,
    codeBlock: false,
  });

  const parseMessageContent = (message, formatting) => {
    // This function parses the message content and applies formatting styles
    let parsedMessage = message;
    parsedMessage = parsedMessage.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    ); // Bold
    parsedMessage = parsedMessage.replace(/\*(.*?)\*/g, "<em>$1</em>"); // Italic
    parsedMessage = parsedMessage.replace(/__(.*?)__/g, "<u>$1</u>"); // Underline
    parsedMessage = parsedMessage.replace(/~~(.*?)~~/g, "<del>$1</del>"); // Strikethrough

    parsedMessage = parsedMessage.replace(
      /```([^`]+)```/g,
      "<code class='code-snippet'>$1</code>"
    ); // Code snippet

    // Check for code block formatting and wrap the entire code block in a <code> tag
    if (formatting === "codeBlock") {
      parsedMessage = `<code class="code-block">${parsedMessage}</code>`;
    } else {
      parsedMessage = `<code>${parsedMessage}</code>`; // Regular code formatting
    }

    return parsedMessage;
  };

  const applyFormatting = (text, option) => {
    switch (option) {
      case "bold":
        return `**${text}**`;
      case "italic":
        return `*${text}*`;
      case "underline":
        return `__${text}__`;
      case "strikethrough":
        return `~~${text}~~`;
      case "codeSnippet": // For code snippet, use triple backticks
        return "```" + text + "```";
      case "codeBlock": // For code block, use triple backticks
        return "```\n" + text + "\n```";
      default:
        return text;
    }
  };
  const scrollRef = useRef();
  const handleSendMsg = async (msg) => {
    const formatted = applyFormatting(msg, formattingoption);
    if (formatting.codeSnippet) {
      const codeSnippetFormatted = `\`\`\`${formatted}\`\`\``;
      await axios.post(sendMsgRoute, {
        message: codeSnippetFormatted,
        from: currentUser._id,
        to: currentChat._id,
        formatting: "codeSnippet",
      });

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message: codeSnippetFormatted,
        formatting: "codeSnippet",
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          fromSelf: true,
          message: codeSnippetFormatted,
          formatting: "codeSnippet",
        },
      ]);

      setFormatting((prev) => ({
        ...prev,
        codeSnippet: false,
      }));
    } else if (formatting.codeBlock) {
      setFormatting((prev) => ({ ...prev, codeBlock: false })); // Reset code block button status
      await axios.post(sendMsgRoute, {
        message: formatted,
        from: currentUser._id,
        to: currentChat._id,
        formatting: "codeBlock", // Set the formatting option to "codeBlock"
      });

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message: formatted,
        formatting: "codeBlock", // Set the formatting option to "codeBlock"
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { fromSelf: true, message: formatted, formatting: "codeBlock" }, // Include the formatting information in the message object
      ]);
      setFormattingoption("none");
    } else {
      setFormatting((prev) => ({
        ...prev,
        bold: false,
        italic: false,
        strikeThrough: false,
      }));
      await axios.post(sendMsgRoute, {
        message: formatted,
        from: currentUser._id,
        to: currentChat._id,
        formatting: formattingoption,
      });
      // console.log(data);
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message: formatted,
        formatting: formattingoption,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: formatted });
      setMessages(msgs);
      setFormattingoption("");
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (recievedData) => {
        setArrivalMessage({ fromSelf: false, message: recievedData.message });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChatData = async () => {
      const response = await axios.post(getAllMsgsRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    if (currentChat) {
      fetchChatData();
    }
  }, [currentChat, currentUser]);

  return (
    <>
      {currentChat && currentUser && (
        <Container formatting={formatting}>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                ></img>
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <LogOut></LogOut>
          </div>
          <div className="chat-messages">
            {messages.map((msg) => {
              const isCodeSnippet = msg.formatting === "codeSnippet";
              const isCodeBlock = msg.formatting === "codeBlock";
              return (
                <div>
                  <div
                    className={`message ${
                      msg.fromSelf ? "sended" : "recieved"
                    }`}
                    ref={scrollRef}
                    key={uuidv4()}
                    onClick={(e) => {
                      if (isCodeSnippet) {
                        navigator.clipboard.writeText(e.target.textContent);
                      }
                    }}
                  >
                    <div className="content">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: parseMessageContent(
                            msg.message,
                            msg.formatting
                          ),
                        }}
                      />

                      {/* {msg.message}</p> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput
            handleSendMsg={handleSendMsg}
            formatting={formatting}
            setFormatting={setFormatting}
            formattingoption={formattingoption}
            setFormattingoption={setFormattingoption}
          ></ChatInput>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 70% 20%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        .code-snippet {
          background-color: black;
          color: yellow;
          padding: 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          line-height: 2em;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;
