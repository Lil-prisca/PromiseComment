import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import "../styles/comment.css";

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [color, setcolor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [loading, setLoading] = useState(false);

  // load comments from firestore
  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const conmmentPage = await getDocs(collection(db, "promisecomment"));
      const data = conmmentPage.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(data);
      console.log("Loaded comments: ", data);
    } catch (error) {
      console.error("Error loading comments: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() || !name.trim()) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "promisecomment"), {
        text: text.trim(),
        name: name.trim(),
        textcolor: color.trim(),
        bgc: backgroundColor.trim(),
        timestamp: serverTimestamp(),
      });
      setText("");
      setName("");
      setBackgroundColor("");
      setcolor("");
      await loadComments();
      alert("Comment posted! ✨");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="header"> PROMISE IS GRADUATING WISH HER WELL</div>

      {/* comment div */}
      <div className="comment-container">
        {/* comment form */}
        <div className="leftside">
          <form className="" onSubmit={handleSubmit}>
            <p>
              Your kind words, memories, and heartfelt wishes mean the world to
              me. Thank you for being part of my journey and celebrating this
              milestone with me. Write something to celebrate this moment with
              me
            </p>
            <div className="comment-form">
              <input
                className="cw-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell promise something..."
                required
              />

              <input
                className="cw-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
              <input
                className="cw-input"
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                placeholder="Backgroundcolor you waant your comment to be"
                required
              />
              <input
                className="cw-input"
                type="text"
                value={color}
                onChange={(e) => setcolor(e.target.value)}
                placeholder="Text Color"
                required
              />

              <button className="cw-button" type="submit" disabled={loading}>
                {loading ? "POSTING..." : "SUBMIT"}
              </button>
              <p>
                {" "}
                I’m truly grateful for your love, support, and presence. Let’s
                keep making beautiful memories together! 🎓✨💖🎉.
              </p>
            </div>
          </form>
        </div>
        {/* comments view */}

        <div className="rightside">
          {comments.map((c) => (
            <div
              key={c.id}
              className="comment-box"
              style={{ backgroundColor: c.bgc, color: c.textcolor }}
            >
              <p>{c.text}</p>
              <p className="commeenter_name">{c.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentPage;
