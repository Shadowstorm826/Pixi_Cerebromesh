import { clamp } from '../utils/math.js';

export function updatePlayerMovement(player, input, dt, bounds) {
  player.velocity.x = 0;
  player.velocity.y = 0;

  if (input.isDown('ArrowUp') || input.isDown('KeyW')) {
    player.velocity.y = -player.speed;
  }

  if (input.isDown('ArrowDown') || input.isDown('KeyS')) {
    player.velocity.y = player.speed;
  }

  if (input.isDown('ArrowLeft') || input.isDown('KeyA')) {
    player.velocity.x = -player.speed;
  }
  
  if (input.isDown('ArrowRight') || input.isDown('KeyD')) {
    player.velocity.x = player.speed;
  }

  player.view.x += player.velocity.x * dt;
  player.view.y += player.velocity.y * dt;

  clampToBounds(player, bounds);
}

export function clampToBounds(player, bounds) {
  player.view.x = clamp(player.view.x, player.radius, bounds.width - player.radius);
  player.view.y = clamp(player.view.y, player.radius, bounds.height - player.radius);
}
