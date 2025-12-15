import React, { useState, useEffect } from "react";
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
  const [textColor, setTextColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 8;

  // Load comments on mount
  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const q = query(
        collection(db, "promisecomment"),
        orderBy("timestamp", "desc")
      );

      const commentSnapshot = await getDocs(q);
      const data = commentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(data);
    } catch (error) {
      console.error("Error loading comments:", error);
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
        textcolor: textColor.trim(),
        bgc: backgroundColor.trim(),
        timestamp: serverTimestamp(),
      });

      setText("");
      setName("");
      setTextColor("");
      setBackgroundColor("");

      await loadComments();
      alert("Comment posted! ✨");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(comments.length / commentsPerPage));

  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [comments.length, currentPage, totalPages]);

  return (
    <>
      <div className="header">PROMISE IS GRADUATING — WISH HER WELL</div>

      <div className="comment-container">
        {/* LEFT SIDE (FORM) */}
        <div className="leftside">
          <form onSubmit={handleSubmit}>
            <p>
              Your kind words, memories, and heartfelt wishes mean the world to
              me. Thank you for celebrating this milestone with me.
            </p>

            <div className="comment-form">
              <input
                className="cw-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell Promise something..."
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

              <label htmlFor="bgc">Background color</label>
              <input
                id="bgc"
                className="cw-input"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                placeholder="backgroundColor"
                aria-label="Comment background color"
              />

              <label htmlFor="textcolor">Text color</label>
              <input
                id="textcolor"
                className="cw-input"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                placeholder="textColor"
              />

              <button className="cw-button" type="submit" disabled={loading}>
                {loading ? "POSTING..." : "SUBMIT"}
              </button>

              <p>
                I’m truly grateful for your love and support. Let’s keep making
                beautiful memories together.
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE (COMMENTS) */}
        <div className="rightside">
          {currentComments.map((c) => (
            <div
              key={c.id}
              className="comment-box"
              style={{
                backgroundColor: c.bgc,
                color: c.textcolor,
              }}
            >
              <p>{c.text}</p>
              <p className="commeenter_name">{c.name}</p>
            </div>
          ))}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ← PREVIOUS
              </button>

              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="page-btn"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                NEXT →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentPage;
