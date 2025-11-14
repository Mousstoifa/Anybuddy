import axiosInstance from '../axios'
import type {
  SharedTask,
  TaskComment,
  TaskContextType,
  TaskStatus,
  TaskPriority,
} from '../../types/contexts'

export const createTask = async (
  contextType: TaskContextType,
  contextId: string,
  createdBy: string,
  title: string,
  description: string | null,
  assignedTo: string | null,
  assignedRole: string | null,
  priority: TaskPriority = 'medium',
  dueDate: string | null = null
): Promise<SharedTask> => {
  const payload = {
    context_type: contextType,
    context_id: contextId,
    title,
    description,
    assigned_to: assignedTo,
    assigned_role: assignedRole,
    created_by: createdBy,
    priority,
    due_date: dueDate,
  }

  const { data } = await axiosInstance.post<SharedTask>('/shared_tasks/', payload)
  return data
}

export const getTasksByContext = async (contextType: TaskContextType, contextId: string) => {
  const { data } = await axiosInstance.get<SharedTask[]>('/shared_tasks/', { params: { context_type: contextType, context_id: contextId, _expand: 'assigned_user,creator' } })
  return data
}

export const getMyTasks = async (userId: string, status?: TaskStatus) => {
  const params: any = { assigned_to: userId }
  if (status) params.status = status
  const { data } = await axiosInstance.get<SharedTask[]>('/shared_tasks/', { params })
  return data
}

export const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
  const updates: any = { status, updated_at: new Date().toISOString() }
  if (status === 'completed') updates.completed_at = new Date().toISOString()
  const { data } = await axiosInstance.put<SharedTask>(`/shared_tasks/${taskId}/`, updates)
  return data
}

export const updateTask = async (taskId: string, updates: Partial<SharedTask>) => {
  const payload = { ...updates, updated_at: new Date().toISOString() }
  const { data } = await axiosInstance.put<SharedTask>(`/shared_tasks/${taskId}/`, payload)
  return data
}

export const deleteTask = async (taskId: string) => {
  await axiosInstance.delete(`/shared_tasks/${taskId}/`)
}

export const addComment = async (taskId: string, userId: string, content: string) => {
  const payload = { task_id: taskId, user_id: userId, content }
  const { data } = await axiosInstance.post<TaskComment>('/task_comments/', payload)
  return data
}

export const getTaskComments = async (taskId: string) => {
  const { data } = await axiosInstance.get<TaskComment[]>('/task_comments/', { params: { task_id: taskId, _expand: 'user' } })
  return data
}

export const getOrganizationTasks = async (organizationId: string, status?: TaskStatus) => {
  const params: any = { context_type: 'organization', context_id: organizationId }
  if (status) params.status = status
  const { data } = await axiosInstance.get<SharedTask[]>('/shared_tasks/', { params })
  return data
}

export const getDelegationTasks = async (delegationId: string, status?: TaskStatus) => {
  const params: any = { context_type: 'delegation', context_id: delegationId }
  if (status) params.status = status
  const { data } = await axiosInstance.get<SharedTask[]>('/shared_tasks/', { params })
  return data
}

export const getTaskById = async (taskId: string) => {
  const { data } = await axiosInstance.get<SharedTask | null>(`/shared_tasks/${taskId}/`)
  return data
}
