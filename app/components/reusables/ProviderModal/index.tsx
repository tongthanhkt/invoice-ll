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
import { spinnerService } from "@/services";
import { useCreateProviderMutation } from "@/services/providerService";
import { ProviderRequest } from "@/types/provider";
import { motion } from "framer-motion";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../form-fields/FormInput/FormInput";
import { User, UserPlus2 } from "lucide-react";

interface ModalProps {
  title: string;
  description: string;
  trigger: React.ReactNode;
  angel?: string;
}

export const ProviderModal = ({
  title,
  description,
  trigger,
  angel,
}: ModalProps) => {
  const [open, setOpen] = useState(false);
  const modalForm = useForm<ProviderRequest>();

  const [createProvider] = useCreateProviderMutation();

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = modalForm.getValues();
    const result = await spinnerService.executePromises(createProvider(data));

    if (result?.error) {
      toast({
        description:
          "data" in result.error
            ? (result.error.data as { error: string }).error
            : "message" in result.error
            ? result.error.message || "An error occurred"
            : "An error occurred",
        variant: "destructive",
      });
      return;
    }

    // Close modal after successful submission
    setOpen(false);
    // Reset form after closing
    modalForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[450px] [&>button]:hidden rounded-lg w-[calc(100%-2rem)] sm:w-full">
        <FormProvider {...modalForm}>
          <motion.form
            onSubmit={handleModalSubmit}
            className="flex flex-col gap-2"
          >
            <DialogHeader className="relative">
              <DialogTitle className="flex items-center gap-2 border-0 border-b border-solid border-neutral-200 pb-2 text-base text-neutral-800">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50">
                  <UserPlus2 className="w-5 h-5 text-blue-500" />
                </div>
                {title}
              </DialogTitle>
              <DialogDescription>{description}</DialogDescription>
              <button
                onClick={() => setOpen(false)}
                className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </DialogHeader>
            <div className="grid gap-4">
              <FormInput
                label="Name"
                name="name"
                type="text"
                placeholder={`Enter the ${angel?.toLowerCase() || "provider"}`}
                required
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder={`Enter the ${
                  angel?.toLowerCase() || "provider"
                } email`}
              />
              <FormInput
                label="Phone Number"
                name="phone_number"
                type="tel"
                placeholder={`Enter the ${
                  angel?.toLowerCase() || "provider"
                } phone number`}
              />
              <FormInput
                label="Address"
                name="address"
                type="text"
                placeholder={`Enter the ${
                  angel?.toLowerCase() || "provider"
                } address`}
              />
            </div>
            <DialogFooter className="mt-4 flex flex-row gap-3 justify-end">
              <DialogClose asChild>
                <Button variant="outline" className="w-fit">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-fit bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors text-base"
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
