import { toast } from "@/components/ui/toast";
import { isToastType, ToastType } from "./toast-variants";

type ToastAddOptions = Parameters<typeof toast.add>[0];

interface ShowToastProps {
  title: string;
  description?: string;
  type?: ToastType;
  opts?: Omit<ToastAddOptions, "title" | "description" | "type">;
}

export const showToast = ({
  title,
  description,
  type,
  opts,
}: ShowToastProps) => {
  const toastType: ToastType = isToastType(type) ? type : "default";

  toast.add({ title, description, type: toastType, ...opts });
};
