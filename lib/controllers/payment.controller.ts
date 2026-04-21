
import type { NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { PaymentService } from "@/lib/services/payment.service"
import { ValidationError } from "@/lib/utils/AppError"
import { createPaymentIntentSchema } from "@/lib/validators/payment.validators"

export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    async createPaymentIntent(req: NextRequest) {
        const { tenantId, userId } = await getTenantContext()
        await requireRole("STUDENT")

        const body = await req.json().catch(() => {
            throw new ValidationError("Request body must be valid JSON")
        })
        const parsed = createPaymentIntentSchema.safeParse(body)
        if (!parsed.success) {
            throw new ValidationError("Invalid request body", {
                feeAssignmentId: ["A valid CUID is required"],
            })
        }

        const result = await this.paymentService.createPaymentIntent({
            feeAssignmentId: parsed.data.feeAssignmentId,
            userId,
            tenantId,
        })

        return successResponse(result, 201)
    }
}
