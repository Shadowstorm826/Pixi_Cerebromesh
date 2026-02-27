import { distance } from '../utils/math.js';

export function resolveCollisions(entities, state, hud) {
  for (let i = entities.collectibles.length - 1; i >= 0; i--) {
    const collectible = entities.collectibles[i];
    if (isOverlapping(entities.player, collectible)) {
      state.score += 10;
      collectible.view.destroy();
      entities.collectibles.splice(i, 1);
    }
  }
  for (let i = entities.obstacles.length - 1; i >= 0; i--) {
    const obstacle = entities.obstacles[i];
    if (isOverlapping(entities.player, obstacle)) {
      state.health -= 1;
      obstacle.view.destroy();
      entities.obstacles.splice(i, 1);
      if (state.health <= 0) {
        state.running = false;
        hud.setMessage('GAME OVER! Health depleted.');
      }
    }
  }
}

export function isOverlapping(a, b) {
  return distance(a.view, b.view) <= a.radius + b.radius;
}
