import { Navigate, useLocation } from "react-router-dom";
import Carousel from "../../components/carousel";

export default function LetterDisplayPage() {
  const location = useLocation();
  const letter = location.state;
  
  if (!letter) {
    return <Navigate to="/login" replace />;
  }

  console.log(letter);

  return (
    <div className="page">
      <div className="card large">
        <h2 className="title">Dear {letter.recipient},</h2>
        <p className="content">{letter.content}</p>

        {letter.pics?.length > 0 && <Carousel images={letter.pics} />}
        {letter.pics?.length == 0 && (
          <div>
            <h2>
              For 2026 let's make some more memories together and take some
              pictures together. 
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
