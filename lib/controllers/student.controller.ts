import { type NextRequest } from "next/server"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getTenantContext, requireRole } from "@/lib/auth"
import type { StudentService } from "@/lib/services/student.service"
import {
  createStudentSchema,
  updateStudentSchema,
  listStudentsQuerySchema,
} from "@/lib/validators/admin.validators"
import {
  buildCachedFn,
  studentTag,
  revalidateStudents,
  revalidateStudentFee
} from "@/lib/cache"

export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  async getStudents(req: NextRequest) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC", "HOD") // HOD and VC can also view students

    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const query = listStudentsQuerySchema.parse(searchParams)

    const queryKey = JSON.stringify({ tenantId, ...query })

    const getCached = buildCachedFn(
      async (key: string) => {
        const parsed = JSON.parse(key)
        const { tenantId: tid, ...q } = parsed
        return this.studentService.getStudents(tid, q)
      },
      ["students", queryKey],
      [studentTag(tenantId)],
      120,
    )

    const result = await getCached(queryKey)
    return successResponse(result)
  }

  async getStudent(id: string) {
    const { tenantId } = await getTenantContext()
    await requireRole("ADMIN", "VC", "HOD")

    // Students cannot query other students via this endpoint
    const result = await this.studentService.getStudent(tenantId, id)
    return successResponse(result)
  }

  async createStudent(req: NextRequest) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN") // Only Admin creates students

    const body = await req.json()
    const data = createStudentSchema.parse(body)

    const result = await this.studentService.createStudent(tenantId, userId, data)

    revalidateStudents(tenantId)
    revalidateStudentFee(tenantId, result.user.id)

    return successResponse(result, 201)
  }

  async updateStudent(req: NextRequest, id: string) {
    const { tenantId, userId } = await getTenantContext()
    await requireRole("ADMIN")

    const body = await req.json()
    const data = updateStudentSchema.parse(body)

    const result = await this.studentService.updateStudent(tenantId, userId, id, data)

    revalidateStudents(tenantId)
    revalidateStudentFee(tenantId, result.user.id)

    return successResponse(result)
  }
}
