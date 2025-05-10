'use client';

import * as PIXI from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

const PixiCanvas = () => {
  const pixiContainer = useRef<HTMLDivElement>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!pixiContainer.current) return;

    // Create Pixi Application
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });

    pixiContainer.current.appendChild(app.view as HTMLCanvasElement);

    // Load Background Texture (Replace with a real background image)
    const bgTexture = PIXI.Texture.from('http://localhost:3000/bg.png');
    const background = new PIXI.TilingSprite(bgTexture, app.screen.width, app.screen.height);
    app.stage.addChild(background);

    // Load Bunny Texture
    const bunnyTexture = PIXI.Texture.from('https://pixijs.io/pixi-react/img/bunny.png');
    const bunny = new PIXI.Sprite(bunnyTexture);

    // Set Bunny Position
    bunny.anchor.set(0.5);
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height - 50;
    app.stage.addChild(bunny);

    // Keyboard Control
    const keys: Record<string, boolean> = {};

    const handleKeyDown = (event: KeyboardEvent) => {
      keys[event.key.toLowerCase()] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keys[event.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Falling Objects Array
    const fallingObjects: PIXI.Sprite[] = [];
    const objectTexture = PIXI.Texture.from('https://pixijs.io/pixi-react/img/bunny.png');

    // Function to Create Falling Objects
    const spawnObject = () => {
      const obj = new PIXI.Sprite(objectTexture);
      obj.anchor.set(0.5);
      obj.x = Math.random() * app.screen.width;
      obj.y = -50; // Start above the screen
      app.stage.addChild(obj);
      fallingObjects.push(obj);
    };

    // Game Loop
    const speed = 10;
    let spawnTimer = 0;

    app.ticker.add(() => {
      if (gameOver) return;

      // Move Background (Scroll Down)
      background.tilePosition.y += 2; // Adjust speed as needed

      // Move Bunny
      const moveSpeed = 5;
      if (keys.arrowleft || keys.a) bunny.x = Math.max(0, bunny.x - moveSpeed);
      if (keys.arrowright || keys.d) bunny.x = Math.min(app.screen.width, bunny.x + moveSpeed);

      // Spawn Falling Objects
      spawnTimer++;
      if (spawnTimer > 5) {
        // Spawn every 50 frames
        spawnObject();
        spawnTimer = 0;
      }

      // Move Falling Objects
      for (let i = fallingObjects.length - 1; i >= 0; i--) {
        fallingObjects[i].y += speed;

        // Check if object leaves the screen
        if (fallingObjects[i].y > app.screen.height) {
          app.stage.removeChild(fallingObjects[i]);
          fallingObjects.splice(i, 1);
        }

        // Check for collision with bunny
        if (isColliding(bunny, fallingObjects[i])) {
          setGameOver(true);
          app.stage.removeChild(fallingObjects[i]);
          fallingObjects.splice(i, 1);
          alert('Game Over! Refresh to try again.');
        }
      }
    });

    // Collision Detection Function
    const isColliding = (sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) => {
      const bounds1 = sprite1.getBounds();
      const bounds2 = sprite2.getBounds();

      return (
        bounds1.x < bounds2.x + bounds2.width &&
        bounds1.x + bounds1.width > bounds2.x &&
        bounds1.y < bounds2.y + bounds2.height &&
        bounds1.y + bounds1.height > bounds2.y
      );
    };

    // Cleanup
    return () => {
      app.destroy(true, { children: true, texture: true, baseTexture: true });
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameOver]);

  return (
    <div>
      {gameOver && <h2 style={{ textAlign: 'center', color: 'red' }}>Game Over! Refresh to try again.</h2>}
      <div ref={pixiContainer} />
    </div>
  );
};

export default PixiCanvas;
