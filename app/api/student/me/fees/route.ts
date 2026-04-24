import { withErrorHandler } from "@/lib/utils/routeHandler"
import { studentFeeController } from "@/lib/di"

export const dynamic = "force-dynamic"

export const GET = withErrorHandler(async () => {
  return studentFeeController.getMyFeeProfile()
})
