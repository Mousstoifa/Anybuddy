// AgentService removed. Minimal compatibility stub provided so any accidental imports
// don't break the build. For a full removal, replace imports in callers.

export const AgentService = {
  sendMessage: async () => { throw new Error('AgentService removed'); },
  getSuggestions: async () => [] as any[],
  getWelcomeMessage: (_context: any) => 'Agent removed',
};
