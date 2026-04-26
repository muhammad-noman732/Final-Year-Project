export interface SSEPaymentEvent {
  type: "PaymentSuccess"
  payload: {
    studentName: string
    rollNumber: string
    department: string
    program: string
    semester: string
    amount: number
    paidAt: string
  }
}

export interface SSEInsightsUpdatedEvent {
  type: "InsightsUpdated"
}

export interface SSENotificationEvent {
  type: "NewNotification"
}
