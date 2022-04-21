import { useEffect, useState, useCallback } from "react";

function App() {

  const [meme, setMeme] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const getMeme = useCallback(() => {
    setIsLoading(true);
    fetch('https://meme-api.herokuapp.com/gimme').then((res) => {
      return res.json();
    }).then((data) => {
      setIsLoading(false)
      if(data.nsfw) {
        getMeme();
      } else {
        console.log(data);
        setMeme((prev) => {
          return data;
        })
      }
    }).catch((err) => {
      console.error(err);
    })
  }, [])

  useEffect(() => {
    getMeme();
  }, [getMeme])

  function handleClick(e) {
    e.target.classList.contains('generate-btn') && getMeme();
  }

  return (
    <>

      <div className="meme-generator-title">
        Meme Generator
      </div>

      <div className="meme-container">
        {meme.url === null || meme.url === undefined ? <i className={"fa-solid fa-rotate loading"}></i> : <img className="meme" src={meme.url} alt="meme" />}
      </div>

      <div className="generate">
        <button className="btn generate-btn" onClick={handleClick}>Generate <i className={`fa-solid fa-rotate ${isLoading && 'loading'}`}></i></button>
      </div>
    </>
  );
}

export default App;
