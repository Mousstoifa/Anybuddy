import { useApiCall } from '../hooks/useApiCall'
import * as api from './api-calls'

export function useListConfidences() { return useApiCall(api.listConfidences) }
export function useCreateConfidence() { return useApiCall(api.createConfidence) }
export function useGetConfidence() { return useApiCall(api.getConfidence) }
export function useUpdateConfidence() { return useApiCall(api.updateConfidence) }
export function usePartialUpdateConfidence() { return useApiCall(api.partialUpdateConfidence) }
export function useDeleteConfidence() { return useApiCall(api.deleteConfidence) }

export function useListComments() { return useApiCall(api.listComments) }
export function useCreateComment() { return useApiCall(api.createComment) }
export function useUpdateComment() { return useApiCall(api.updateComment) }
export function usePartialUpdateComment() { return useApiCall(api.partialUpdateComment) }
export function useDeleteComment() { return useApiCall(api.deleteComment) }

export function useLikeConfidence() { return useApiCall(api.likeConfidence) }
export function useUnlikeConfidence() { return useApiCall(api.unlikeConfidence) }
export function useLikeComment() { return useApiCall(api.likeComment) }
export function useUnlikeComment() { return useApiCall(api.unlikeComment) }

export function useGenerateStreamUrl() { return useApiCall(api.generateStreamUrl) }
export function useSaveStreamUrl() { return useApiCall(api.saveStreamUrl) }
