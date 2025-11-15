import { api } from "@/config/api"

/**
 * Get all notifications
 * GET /v1/resident/notifications
 */
export const getAllNotifications = () => {
  return api.get("/resident/notifications")
}

/**
 * Get unread notifications
 * GET /v1/resident/notifications/unread
 */
export const getUnreadNotifications = () => {
  return api.get("/resident/notifications/unread")
}

/**
 * Get unread count
 * GET /v1/resident/notifications/count
 */
export const getNotificationCount = () => {
  return api.get("/resident/notifications/count")
}

/**
 * Get single notification details
 * GET /v1/resident/notifications/{id}
 */
export const getNotification = (id) => {
  return api.get(`/resident/notifications/${id}`)
}

/**
 * Mark single notification as read
 * PUT /v1/resident/notifications/{id}/read
 */
export const markNotificationRead = (id) => {
  return api.put(`/resident/notifications/${id}/read`)
}

/**
 * Mark all notifications as read
 * PUT /v1/resident/notifications/read-all
 */
export const markAllNotificationsRead = () => {
  return api.put(`/resident/notifications/read-all`)
}

/**
 * Delete single notification
 * DELETE /v1/resident/notifications/{id}
 */
export const deleteNotification = (id) => {
  return api.delete(`/resident/notifications/${id}`)
}

/**
 * Clear all notifications
 * DELETE /v1/resident/notifications
 */
export const clearAllNotifications = () => {
  return api.delete(`/resident/notifications`)
}
