import * as api from '../api/sharedTasks/api-calls'
import type {
  SharedTask,
  TaskComment,
  TaskContextType,
  TaskStatus,
  TaskPriority,
} from '../types/contexts'

export class SharedTaskService {
  static async createTask(
    contextType: TaskContextType,
    contextId: string,
    createdBy: string,
    title: string,
    description: string | null,
    assignedTo: string | null,
    assignedRole: string | null,
    priority: TaskPriority = 'medium',
    dueDate: string | null = null
  ): Promise<SharedTask> {
    return await api.createTask(contextType, contextId, createdBy, title, description, assignedTo, assignedRole, priority, dueDate)
  }

  static async getTasksByContext(
    contextType: TaskContextType,
    contextId: string
  ): Promise<SharedTask[]> {
    return await api.getTasksByContext(contextType, contextId)
  }

  static async getMyTasks(userId: string, status?: TaskStatus): Promise<SharedTask[]> {
    return await api.getMyTasks(userId, status)
  }

  static async updateTaskStatus(
    taskId: string,
    status: TaskStatus
  ): Promise<SharedTask> {
    return await api.updateTaskStatus(taskId, status)
  }

  static async updateTask(
    taskId: string,
    updates: Partial<SharedTask>
  ): Promise<SharedTask> {
    return await api.updateTask(taskId, updates)
  }

  static async deleteTask(taskId: string): Promise<void> {
    return await api.deleteTask(taskId)
  }

  static async addComment(
    taskId: string,
    userId: string,
    content: string
  ): Promise<TaskComment> {
    return await api.addComment(taskId, userId, content)
  }

  static async getTaskComments(taskId: string): Promise<TaskComment[]> {
    return await api.getTaskComments(taskId)
  }

  static async getOrganizationTasks(organizationId: string, status?: TaskStatus): Promise<SharedTask[]> {
    return await api.getOrganizationTasks(organizationId, status)
  }

  static async getDelegationTasks(delegationId: string, status?: TaskStatus): Promise<SharedTask[]> {
    return await api.getDelegationTasks(delegationId, status)
  }

  static async getTaskStats(contextType: TaskContextType, contextId: string) {
    const tasks = await this.getTasksByContext(contextType, contextId)

    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      in_progress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      cancelled: tasks.filter(t => t.status === 'cancelled').length,
      overdue: tasks.filter(t =>
        t.due_date &&
        new Date(t.due_date) < new Date() &&
        t.status !== 'completed'
      ).length
    }
  }
}
