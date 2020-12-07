import React, { useState } from "react";
import "./styles.css";

const allBooks = require("./data");

const genreList = ["All Genres"];
allBooks.map((bookItem) => {
  bookItem.genre.map((genre) => {
    if (!genreList.includes(genre)) {
      genreList.push(genre);
    }
  });
});

genreList.sort();

function sortObjArray(book1, book2) {
  const name1 = book1.bookName.toLowerCase();
  const name2 = book2.bookName.toLowerCase();

  let comparison = 0;
  if (name1 > name2) {
    comparison = 1;
  } else if (name1 < name2) {
    comparison = -1;
  }
  return comparison;
}

allBooks.sort(sortObjArray);

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  return (
    <div className="App">
      <header>
        <h1>HBR – Hetav's Book Recommendations</h1>
        <blockquote>
          Outside of a dog, a book is a man's best&nbsp;friend.
        </blockquote>
        <div className="genre-container">
          {genreList.map((genreItem) => {
            return genreItem === selectedGenre ? (
              <p
                className="genre-pill selected-genre-pill"
                onClick={() => setSelectedGenre(genreItem)}
              >
                {genreItem}
              </p>
            ) : (
              <p
                className="genre-pill"
                onClick={() => setSelectedGenre(genreItem)}
              >
                {genreItem}
              </p>
            );
          })}
        </div>
      </header>
      <hr />
      {allBooks.map((item) => {
        if (selectedGenre === "All Genres") {
          return (
            <div className="book-container">
              <img className="book-image" src={item.photoURL} alt="" />
              <div className="book-metacontent">
                <p className="book-name">{item.bookName}</p>
                <p className="book-author">{item.author}</p>
                <p className="book-genre">{item.genre.sort().join(" | ")}</p>
              </div>
            </div>
          );
        } else if (item.genre.includes(selectedGenre)) {
          return (
            <div className="book-container">
              <img className="book-image" src={item.photoURL} alt="" />
              <div className="book-metacontent">
                <p className="book-name">{item.bookName}</p>
                <p className="book-author">{item.author}</p>
                <p className="book-genre">{item.genre.join(" | ")}</p>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
