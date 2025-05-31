import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useCreateUserInfoTemplateMutation } from "@/services/userInfoService";
import { ProfileForm } from "@/types/profile";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../form-fields/FormInput/FormInput";

interface ModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export const UserInfoModal = ({
  title,
  description,
  children,
  trigger,
}: ModalProps) => {
  const modalForm = useForm<ProfileForm>();

  const [createUserInfoTemplate] = useCreateUserInfoTemplateMutation();

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = modalForm.getValues();
    const result = await createUserInfoTemplate(data);

    if (result?.error) {
      toast({
        description:
          "data" in result.error
            ? (result.error.data as { error: string }).error
            : "message" in result.error
            ? result.error.message
            : "An error occurred",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormProvider {...modalForm}>
          <motion.form
            onSubmit={handleModalSubmit}
            className="flex flex-col gap-2"
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormInput
                label="Name"
                name="name"
                type="text"
                placeholder="Enter the name of the payer"
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter the email of the payer"
              />
              <FormInput
                label="Address"
                name="address"
                type="text"
                placeholder="Enter the address of the payer"
              />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors text-base"
              >
                Save
              </Button>
            </DialogFooter>
          </motion.form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
