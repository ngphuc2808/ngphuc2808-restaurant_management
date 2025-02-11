"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/form";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { toast } from "@repo/ui/hooks/use-toast";
import { useAccountMe, useUpdateMeMutation } from "@/queries/useAccount";
import { useUploadMediaMutation } from "@/queries/useMedia";
import { handleErrorApi } from "@/lib/utils";

const UpdateProfileForm = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  const { data, refetch } = useAccountMe();
  const updateMeMutation = useUpdateMeMutation();
  const uploadMediaMutation = useUploadMediaMutation();

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: "",
      avatar: undefined,
    },
  });

  const avatar = form.watch("avatar");

  const previewAvatar = React.useMemo(
    () => (file ? URL.createObjectURL(file) : avatar || undefined),
    [file, avatar]
  );

  const reset = () => {
    form.reset();
    if (file && previewAvatar && previewAvatar.startsWith("blob:")) {
      URL.revokeObjectURL(previewAvatar);
    }
    setFile(null);
  };

  const onSubmit = async (values: UpdateMeBodyType) => {
    if (updateMeMutation.isPending) return;

    try {
      let body = values;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadImageResult =
          await uploadMediaMutation.mutateAsync(formData);
        const imageUrl = uploadImageResult.payload.data;
        body = {
          ...values,
          avatar: imageUrl,
        };
      }
      const result = await updateMeMutation.mutateAsync(body);

      if (file && previewAvatar && previewAvatar.startsWith("blob:")) {
        URL.revokeObjectURL(previewAvatar);
      }

      toast({
        description: result.payload.message,
      });
      refetch();
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };

  React.useEffect(() => {
    if (data) {
      const { name, avatar } = data.payload.data;
      form.reset({ name, avatar: avatar ?? undefined });
    }
  }, [data]);

  return (
    <Form {...form}>
      <form
        noValidate
        className="grid auto-rows-max items-start gap-4 md:gap-8"
        onReset={reset}
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error);
        })}
      >
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-start justify-start">
                      <Avatar className="aspect-square w-[100px] h-[100px] rounded-md object-cover">
                        <AvatarImage src={previewAvatar} alt="avatar" />
                        <AvatarFallback className="rounded-none">
                          {data?.payload.data.name ?? ""}
                        </AvatarFallback>
                      </Avatar>
                      <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file);
                            field.onChange(
                              "http://localhost:3000/" + field.name
                            );
                          }
                        }}
                      />
                      <button
                        className="flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed"
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Tên</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className=" items-center gap-2 md:ml-auto flex">
                <Button variant="outline" size="sm" type="reset">
                  Hủy
                </Button>
                <Button size="sm" type="submit">
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
