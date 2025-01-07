import { PlumiflyConfig, PlumiflyInstance } from '../types';

let instance: PlumiflyInstance | null = null;

export function initPlumifly(config: PlumiflyConfig): PlumiflyInstance {
  if (instance) {
    console.warn('[Plumifly SDK] Plumifly has already been initialized.');
    return instance;
  }

  if (!config.apiKey) {
    throw new Error('[Plumifly SDK] Missing API key in configuration.');
  }

  instance = {
    apiKey: config.apiKey,
    baseUrl: config.baseUrl || 'https://api.plumifly.com/api/v1',
    isInitialized: true,
  };

  console.log('[Plumifly SDK] Plumifly initialized successfully.');
  return instance;
}

export function getPlumiflyInstance(): PlumiflyInstance {
  if (!instance) {
    throw new Error('[Plumifly SDK] Plumifly has not been initialized. Call initPlumifly first.');
  }

  return instance;
}
