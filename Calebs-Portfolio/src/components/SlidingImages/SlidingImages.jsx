import { useRef, useState, useEffect } from "react";
import "./SlidingImages.css";

export default function SlidingImages({ project }) {
  const [scrollPostition, setScrollPosition] = useState(1);
  const scrollLength = project.image_urls.length;
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const containerRef = useRef(null);

  function checkPosition() {
    if (scrollPostition === 1) {
      prevRef.current.disabled = true;
    } else if (scrollPostition === scrollLength) {
      nextRef.current.disabled = true;
    } else {
      nextRef.current.disabled = false;
      prevRef.current.disabled = false;
    }
  }

  function scroll(direction) {
    const newPosition = scrollPostition + direction;
    const container = containerRef.current;
    const far = container.offsetWidth * direction;
    const pos = container.scrollLeft + far;

    container.scrollLeft = pos;
    setScrollPosition(newPosition);
  }

  useEffect(() => {
    checkPosition();
  }, [scrollPostition]);

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <button
          className="slider__arrow slider__arrow_prev"
          ref={prevRef}
          onClick={scroll.bind(null, -1)}
        >
          &#10094;
        </button>
        <ul className="slider__list" ref={containerRef}>
          {project.image_urls.map((item, i) => {
            return (
              <li key={i} className="slider__list-item">
                <img
                  className="slider__image"
                  src={item}
                  alt={project.project_name}
                />
              </li>
            );
          })}
        </ul>
        <button
          className="slider__arrow slider__arrow_next"
          ref={nextRef}
          onClick={scroll.bind(null, 1)}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}