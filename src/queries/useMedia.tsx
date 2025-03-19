import { mediaApiRequests } from "@/apiRequests/media"
import { useMutation } from "@tanstack/react-query"

export const useUploadMediaMutation = () => {
  return useMutation({
    mutationFn: mediaApiRequests.upload
  })
}