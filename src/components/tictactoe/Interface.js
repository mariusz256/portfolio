import React from "react";
import Button from "./Button";

function Interface({ won, draw, reset }) {
  return (
    <>
      <Button
        onClick={reset}
        mass={10}
        position={[20, 35, -2.5]}
        children={"RESET"}
        show={true}
        // draw={draw}
      />

      {/* {won && <Winner position={[-40, 40, 10]} player={won} />} */}
      {/* {draw && <Draw position={[-40, 40, 10]} draw={draw} />} */}
    </>
  );
}

export default Interface;
