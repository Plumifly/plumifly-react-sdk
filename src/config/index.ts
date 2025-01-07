// config/index.ts
import { PlumiflyConfig, PlumiflyInstance, PlumiflyError } from "../types";

let instance: PlumiflyInstance | null = null;

const DEFAULT_CONFIG: Partial<PlumiflyConfig> = {
  baseUrl: "https://api.plumifly.com/api/v1",
};

export function initPlumifly(config: PlumiflyConfig): PlumiflyInstance {
  if (instance) {
    throw new PlumiflyError({
      message: "Plumifly has already been initialized",
      code: "ALREADY_INITIALIZED",
    });
  }

  if (!config.apiKey) {
    throw new PlumiflyError({
      message: "API key is required",
      code: "MISSING_API_KEY",
    });
  }

  instance = {
    apiKey: config.apiKey,
    baseUrl: config.baseUrl || DEFAULT_CONFIG.baseUrl!,
    isInitialized: true,
    callbacks: config.callbacks,
  };

  return instance;
}

export function getPlumiflyInstance(): PlumiflyInstance {
  if (!instance) {
    throw new PlumiflyError({
      message: "Plumifly has not been initialized. Call initPlumifly first",
      code: "NOT_INITIALIZED",
    });
  }

  return instance;
}

export function updatePlumiflyConfig(
  updates: Partial<PlumiflyConfig>
): PlumiflyInstance {
  if (!instance) {
    throw new PlumiflyError({
      message: "Cannot update config before initialization",
      code: "NOT_INITIALIZED",
    });
  }

  instance = {
    ...instance,
    ...updates,
    callbacks: {
      ...instance.callbacks,
      ...updates.callbacks,
    },
  };

  return instance;
}
