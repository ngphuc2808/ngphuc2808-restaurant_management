import http from "@/lib/http";
import { UploadImageResType } from "@/schemaValidations/media.schema";

const prefix = "media";

const mediaApiRequest = {
  upload: (formData: FormData) =>
    http.post<UploadImageResType>(`/${prefix}/upload`, formData),
};

export default mediaApiRequest;
