// Agent functionality removed. This module kept as a tiny compatibility stub
// so any remaining imports don't break the build. Prefer removing imports
// from callers instead of relying on this stub.

export function useAgent() {
  return {
    sendMessage: async () => { throw new Error('useAgent has been removed'); },
  };
}
