import React, { useState } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsFillEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

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
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
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
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0rem 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
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
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      background-color: #9a86f3;
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
    }
  }
`; 

export default ChatInput;
