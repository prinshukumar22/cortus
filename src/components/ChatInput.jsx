import React, { useState } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { IoAtOutline } from "react-icons/io5";
import {
  RiCodeSSlashFill,
  RiListOrdered,
  RiListUnordered,
} from "react-icons/ri";
import {
  PiTextBLight,
  PiTextItalicLight,
  PiTextStrikethroughLight,
  PiPlus,
  PiCodeBlock,
} from "react-icons/pi";
import { BiLink } from "react-icons/bi";
import { BsFillEmojiSmileFill, BsBlockquoteLeft } from "react-icons/bs";
const ChatInput = ({
  handleSendMsg,
  formatting,
  setFormatting,
  formattingoption,
  setFormattingoption,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emoji) => {
    // console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.trim().length > 0) {
      // console.log(formattedMessage);
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="formatting">
        <div className="text-style">
          <button
            className={`bold ${formatting.bold ? "active" : ""}`}
            onClick={() => {
              setFormatting((prev) => {
                return { ...prev, bold: !prev.bold };
              });
              setFormattingoption((prev) => {
                if (!formatting.bold) {
                  return "bold";
                } else {
                  return "none";
                }
              });
            }}
          >
            <PiTextBLight></PiTextBLight>
          </button>
          <button
            className={`italic ${formatting.italic ? "active" : ""}`}
            onClick={() => {
              setFormatting((prev) => {
                return { ...prev, italic: !prev.italic };
              });
              setFormattingoption((prev) => {
                if (!formatting.italic) {
                  return "italic";
                } else {
                  return "none";
                }
              });
            }}
          >
            <PiTextItalicLight></PiTextItalicLight>
          </button>
          <button
            className={`strike ${formatting.strikeThrough ? "active" : ""}`}
            onClick={() => {
              setFormatting((prev) => {
                return { ...prev, strikeThrough: !prev.strikeThrough };
              });
              setFormattingoption((prev) => {
                if (!formatting.strikeThrough) {
                  return "strikethrough";
                } else {
                  return "none";
                }
              });
            }}
          >
            <PiTextStrikethroughLight></PiTextStrikethroughLight>
          </button>
        </div>
        <div className="hyperlink">
          <button>
            <BiLink></BiLink>
          </button>
        </div>
        <div className="list-style">
          <button className="bulleted">
            <RiListOrdered></RiListOrdered>
          </button>
          <button className="numbered">
            <RiListUnordered></RiListUnordered>
          </button>
        </div>
        <div className="blockquote">
          <button>
            <BsBlockquoteLeft></BsBlockquoteLeft>
          </button>
        </div>
        <div className="code-style">
          <button
            className={`code-snippet ${formatting.codeSnippet ? "active" : ""}`}
            onClick={() => {
              setFormatting((prev) => {
                return { ...prev, codeSnippet: !prev.codeSnippet };
              });
            }}
          >
            <RiCodeSSlashFill></RiCodeSSlashFill>
          </button>
          <button
            className={`code-block ${formatting.codeBlock ? "active" : ""}`}
            onClick={() => {
              setFormatting((prev) => {
                return { ...prev, codeBlock: !prev.codeBlock };
              });
              setFormattingoption((prev) => {
                if (!formatting.codeBlock) {
                  return "codeBlock";
                } else {
                  return "none";
                }
              });
            }}
          >
            <PiCodeBlock></PiCodeBlock>
          </button>
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
      </form>
      <form className="footer-formatting">
        <div className="feature">
          <input
            type="file"
            accept=".pdf, .doc, .docx, .xls, .xlsx, .txt, .png, .jpg, .jpeg, .gif"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <button className="file">
              <PiPlus></PiPlus>
            </button>
          </label>
          <div className="emoji">
            <BsFillEmojiSmileFill
              onClick={handleEmojiPickerHideShow}
            ></BsFillEmojiSmileFill>
            {showEmojiPicker && (
              <EmojiPicker onEmojiClick={handleEmojiClick}></EmojiPicker>
            )}
          </div>
          <button className="mention">
            <IoAtOutline></IoAtOutline>
          </button>
        </div>
        <button className="submit" onClick={sendChat}>
          <IoMdSend></IoMdSend>
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.1rem;
  background-color: #080420;
  align-items: center;
  padding: 0rem 2rem;
  padding-top: 0.2rem;
  border-top: 1px solid #9186f3;
  .formatting {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-top: 0.3rem;
    button {
      padding: 1px;
      background: transparent;
      outline: none;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 1.4rem;
      transition: 0.3s ease all;
      &:hover {
        background: #9186f3;
      }
      &.active {
        background: #9186f3;
      }
      display: flex;
      border-radius: 50%;
    }

    .text-style {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      &::after {
        position: absolute;
        content: "";
        width: 1.3px;
        height: 1.4rem;
        background: #9186f3;
        left: 87px;
        top: 0.1rem;
      }
    }
    .hyperlink {
      position: relative;
      display: flex;
      align-items: center;
      &::after {
        position: absolute;
        content: "";
        width: 1.3px;
        height: 1.5rem;
        background: #9186f3;
        left: 30px;
        top: 0rem;
      }
    }

    .list-style {
      display: flex;
      gap: 0.2rem;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        width: 1.3px;
        height: 1.5rem;
        background: #9186f3;
        left: 55px;
        top: 0rem;
      }
    }

    .blockquote {
      display: flex;
      align-items: center;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        width: 1.3px;
        height: 1.5rem;
        background: #9186f3;
        left: 28px;
        top: 0rem;
      }
    }

    .code-style {
      display: flex;
      gap: 0.2rem;
      align-items: center;
    }
  }
  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #080420;
    input {
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 0rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
  }
  .footer-formatting {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      padding: 2px;
      height: 26px;
      background: transparent;
      outline: none;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 1.4rem;
      transition: 0.3s ease all;
      &:hover {
        background: #9186f3;
      }
      display: flex;
      border-radius: 50%;
    }
    .submit {
      background-color: #9a86f3;
      padding: 1rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
        color: white;
      }
      &:hover {
        background-color: #8269f2;
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
    }
    .feature {
      display: flex;
      gap: 1rem;
      .emoji {
        position: relative;
        svg {
          font-size: 1.5rem;
          color: #ffff00c8;
          cursor: pointer;
        }
        .EmojiPickerReact {
          position: absolute;
          top: -420px;
          height: 400px !important;
          background-color: #080420;
          box-shadow: 0 5px 10px #9a86f3;
          border-color: #9186f3;
          .epr-category-nav {
            button {
              filter: contrast(0);
            }
          }
          .epr-header {
            .epr-header-overlay {
              .epr-search-container {
                input.epr-search {
                  background-color: transparent !important;
                  border-color: #9186f3 !important;
                }
              }
            }
          }
          .epr-body {
            .epr-emoji-list {
              .epr-emoji-category {
                .epr-emoji-category-label {
                  background-color: #080420;
                }
              }
            }
          }
          .epr-body::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;
            &-thumb {
              background-color: #9186f3;
            }
          }
        }
      }
    }
  }
`;

// display: grid;
//   grid-template-columns: 5% 95%;
//   align-items: center;
//   background-color: #080420;
//   padding: 0 2rem;
//   padding-bottom: 0.3rem;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     padding: 0rem 1rem;
//     gap: 1rem;
//   }
//   .button-container {
//     display: flex;
//     align-items: center;
//     color: white;
//     gap: 1rem;
//     .emoji {
//       position: relative;
//       svg {
//         font-size: 1.5rem;
//         color: #ffff00c8;
//         cursor: pointer;
//       }
//       .EmojiPickerReact {
//         position: absolute;
//         top: -420px;
//         height: 400px !important;
//         background-color: #080420;
//         box-shadow: 0 5px 10px #9a86f3;
//         border-color: #9186f3;
//         .epr-category-nav {
//           button {
//             filter: contrast(0);
//           }
//         }
//         .epr-header {
//           .epr-header-overlay {
//             .epr-search-container {
//               input.epr-search {
//                 background-color: transparent !important;
//                 border-color: #9186f3 !important;
//               }
//             }
//           }
//         }
//         .epr-body {
//           .epr-emoji-list {
//             .epr-emoji-category {
//               .epr-emoji-category-label {
//                 background-color: #080420;
//               }
//             }
//           }
//         }
//         .epr-body::-webkit-scrollbar {
//           background-color: #080420;
//           width: 5px;
//           &-thumb {
//             background-color: #9186f3;
//           }
//         }
//       }
//     }
//   }
//   .input-container {
//     width: 100%;
//     border-radius: 2rem;
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     background-color: #ffffff34;
//     input {
//       width: 90%;
//       height: 60%;
//       background-color: transparent;
//       color: white;
//       border: none;
//       padding-left: 1rem;
//       font-size: 1.2rem;
//       &::selection {
//         background-color: #9186f3;
//       }
//       &:focus {
//         outline: none;
//       }
//     }
// button {
//   background-color: #9a86f3;
//   padding: 0.3rem 2rem;
//   border-radius: 2rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: none;
//   svg {
//     font-size: 2rem;
//     color: white;
//   }
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     padding: 0.3rem 1rem;
//     svg {
//       font-size: 1rem;
//     }
//   }
// }
//   }

export default ChatInput;

/* <div className="button-container">
        <div className="emoji">
          <BsFillEmojiSmileFill
            onClick={handleEmojiPickerHideShow}
          ></BsFillEmojiSmileFill>
          {showEmojiPicker && (
            <EmojiPicker onEmojiClick={handleEmojiClick}></EmojiPicker>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="submit">
          <IoMdSend></IoMdSend>
        </button>
      </form> */

// RiCodeSSlashFill
// RiListOrdered
// RiListUnordered
// PiBracketsCurlyLight
// PiTextBLight
// PiTextItalicLight
// PiTextStrikethroughLight
// PiPlus
// IoAtOutline
// BiLink
// PiCodeBlock
// BsBlockquoteLeft
