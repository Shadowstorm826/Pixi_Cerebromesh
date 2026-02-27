import { createCollectible } from '../entities/collectible.js';
import { createObstacle } from '../entities/obstacle.js';
import { randRange } from '../utils/rand.js';
import { GAME_CONFIG } from '../constants.js';

export function createSpawner(world, bounds) {
  let collectibleTimer = 0;
  let obstacleTimer = 0;

  return {
    update(dt, entities) {
      collectibleTimer += dt;
      obstacleTimer += dt;

      if (collectibleTimer >= SPAWN_DEFAULTS.collectibleInterval) {
        const collectible = createRandomCollectible(bounds);
        entities.collectibles.push(collectible);
        world.addChild(collectible.view);
        collectibleTimer = 0;
      }

      if (obstacleTimer >= SPAWN_DEFAULTS.obstacleInterval) {
        const obstacle = createRandomObstacle(bounds);
        entities.obstacles.push(obstacle);
        world.addChild(obstacle.view);
        obstacleTimer = 0;
      }
    },
    getDebugTimers() {
      return { collectibleTimer, obstacleTimer };
    }
  };
}

export function createRandomCollectible(bounds) {
  return createCollectible({
    x: randRange(40, bounds.width - 40),
    y: randRange(40, bounds.height - 40)
  });
}

export function createRandomObstacle(bounds) {
  return createObstacle({
    x: randRange(40, bounds.width - 40),
    y: randRange(40, bounds.height - 40)
  });
}

export const SPAWN_DEFAULTS = {
  collectibleInterval: GAME_CONFIG.spawnInterval,
  obstacleInterval: GAME_CONFIG.obstacleInterval
};
