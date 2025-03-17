import authApiRequests from "@/apiRequests/auth"
import { LoginBodyType } from "@/schemaValidations/auth.schema"
import { useMutation } from "@tanstack/react-query"

export const useLoginMutation = () => {
  return useMutation ({
    mutationFn: (body: LoginBodyType) => authApiRequests.login(body)
  })
}