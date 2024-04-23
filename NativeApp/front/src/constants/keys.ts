const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  GET_MARKERS: 'getMarkers',
} as const;

const storageKey = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export {queryKeys, storageKey};
