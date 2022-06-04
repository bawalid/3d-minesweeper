import React, { Suspense, useState } from 'react';
import Board from './Board';
import { Canvas } from '@react-three/fiber';
import Controls from './Controls';
import { ContactShadows } from '@react-three/drei';
import { WIDTH, BOMBAMOUNT, createBoard } from './gameStart';
import { RestartAlt } from '@mui/icons-material';
import { Flag } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import mouseControl from './mouse.svg';
import { ColorButton, StyledBadge, gameOverStyle } from './muiStyles';
import { useSpring, animated } from 'react-spring';

const GameBoard = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [squares, setSquares] = useState(createBoard());
  const [flags, setFlags] = useState(BOMBAMOUNT);
  const [openModel, setOpenModel] = useState(false);
  const [openControl, setOpenControl] = React.useState(true);

  const springProps = useSpring({
    loop: { reverse: true },
    from: { top: '58%' },
    to: { top: '60%' },
  });

  const handleClickControlAway = () => {
    setOpenControl(false);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setFlags(BOMBAMOUNT);
    setSquares(createBoard());
  };

  const gameOver = () => {
    squares.forEach((square) => {
      setSquares([...squares, (square.checked = true)]);
    });
    setIsGameOver(true);
    setOpenModel(true);
  };

  const checkForWin = () => {
    let bombs = 0;
    let checked = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].value === 'bomb' ||
        squares[i].value === 'flag'
      ) {
        bombs++;
      }
      if (squares[i].checked) {
        checked++;
      }
    }
    if (
      bombs === BOMBAMOUNT &&
      checked === WIDTH * WIDTH - BOMBAMOUNT
    ) {
      gameOver();
    }
  };

  const checkSquare = (currentId) => {
    const isLeftEdge = currentId % WIDTH === 0;
    const isRightEdge = (currentId - 9) % WIDTH === 0;

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;

        const newSquare = squares[newId];
        handleClick(newSquare.id);
      }

      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - WIDTH].id;
        const newSquare = squares[newId];
        handleClick(newSquare.id);
      }

      if (currentId > 10) {
        const newId = squares[parseInt(currentId - WIDTH)].id;
        const newSquare = squares[newId];
        handleClick(newSquare.id);
      }

      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - WIDTH].id;
        const newSquare = squares[newId];
        handleClick(newSquare.id);
      }

      if (currentId < 99 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = squares[newId];
        handleClick(newSquare.id);
      }

      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + WIDTH].id;
        const newSquare = squares[newId];
        handleClick(newSquare.id);
      }

      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + WIDTH].id;
        const newSquare = squares[newId];
        handleClick(newSquare.id);
      }

      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + WIDTH].id;
        const newSquare = squares[newId];
        handleClick(newSquare.id);
      }
    }, 5);
  };

  const handleClick = (id) => {
    if (isGameOver) return;
    if (squares[id].checked || squares[id].flag) {
      return;
    }
    if (squares[id].value === 'bomb') {
      gameOver();
    } else {
      let total = squares[id].data;
      if (total !== 0) {
        const newSquares = squares.slice();
        newSquares[id].checked = true;
        setSquares(newSquares);
        checkForWin();
        return;
      }
      checkForWin();
      checkSquare(squares[id].id);
    }
    const newSquares = squares.slice();
    newSquares[id].checked = true;
    setSquares(newSquares);
  };

  function toggleFlag(id) {
    if (isGameOver) return;
    if (!(squares[id].value === 'checked')) {
      if (!squares[id].flag && flags > 0) {
        const newSquares = squares.slice();
        newSquares[id].flag = true;
        setSquares(newSquares);
        setFlags((prev) => prev - 1);
        checkForWin();
        return;
      }
      if (squares[id].flag) {
        const newSquares = squares.slice();
        newSquares[id].flag = false;
        setSquares(newSquares);
        setFlags((prev) => prev + 1);
      }
      return;
    }
  }

  return (
    <div className="container">
      <Typography
        id="game-title"
        variant="h1"
        align="center"
        sx={{ color: '#645D62' }}>
        3d Minesweeper
      </Typography>
      <div className="gameBoard">
        <StyledBadge badgeContent={flags} color="secondary">
          <Flag />
        </StyledBadge>
        <div className="emoji">{!isGameOver ? '😀' : '☠️'}</div>
        <ColorButton
          variant="contained"
          endIcon={<RestartAlt />}
          onClick={restartGame}
        />
      </div>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 35, 0], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[-10, 200, 50]}
          angle={0.15}
          penumbra={1}
          shadows
        />
        <pointLight position={[-10, -10, -10]} />
        <Suspense>
          <Board
            squares={squares}
            handleClick={handleClick}
            toggleFlag={toggleFlag}
          />
        </Suspense>
        <Controls />
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -1, 0]}
          opacity={0.3}
          width={5}
          height={5}
          blur={0.2}
          far={10}
        />
      </Canvas>
      <Modal
        open={openControl}
        onClose={handleClickControlAway}
        disableEnforceFocus>
        <animated.img
          className="mouse-control"
          src={mouseControl}
          alt="3d-control"
          style={springProps}
        />
      </Modal>
      <Modal
        open={openModel}
        onClose={() => setOpenModel(false)}
        disableEnforceFocus>
        <Box sx={gameOverStyle}>
          <Typography variant="h6" align="center">
            Game Over
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default GameBoard;
