import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import Modal from "react-modal";

import "./QHeader.css";
import { Avatar, Button, Input } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import { ExpandMore, Link } from "@material-ui/icons";
import firebase from "firebase";

Modal.setAppElement("#root");

function QHeader() {
  const user = useSelector(selectUser);

  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const questionName = input;

  const handleQuestion = (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    if (questionName) {
      db.collection("questions").add({
        user: user,
        question: input,
        imageUrl: inputUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    setInput("");
    setInputUrl("");
  };

  return (
    <div className="qHeader">
      <div className="qHeader__logo">
        <img
          src="data:image/png;base64,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"
          alt=""
        />
      </div>
      <div className="qHeader__icons">
        <div className="active qHeader__icon">
          <HomeIcon />
        </div>
        <div className="qHeader__icon">
          <FeaturedPlayListOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <AssignmentTurnedInOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <PeopleAltOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <NotificationsOutlinedIcon />
        </div>
      </div>
      <div className="qHeader__input">
        <SearchIcon />
        <input type="text" placeholder="Search Quora" />
      </div>
      <div className="qHeader__Rem">
        <div className="qHeader__avatar">
          <Avatar
            onClick={() => auth.signOut()}
            className="Avatar"
            src={
              user.photo
                ? user.photo
                : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
            }
          />
        </div>
        <LanguageIcon />
        <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
        <Modal
          isOpen={IsmodalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px"
            }
          }}
        >
          <div className="modal__title">
            <h5>Add Post</h5>
            <h5>Share Link</h5>
          </div>
          <div className="modal__info">
            <Avatar
              className="avatar"
              src={
                user.photo
                  ? user.photo
                  : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
              }
            />
            <p>{user.disPlayName ? user.disPlayName : user.email} asked</p>
            <div className="modal__scope">
              <PeopleAltOutlinedIcon />
              <p>Public</p>
              <ExpandMore />
            </div>
          </div>
          <div className="modal__Field">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start your question with 'What', 'How', 'Why', etc. "
            />
            <div className="modal__fieldLink">
              <Link />
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: inclue a link that gives context"
              ></input>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="sumbit" onClick={handleQuestion} className="add">
              Add Question
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default QHeader;
